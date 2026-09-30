import { useState, useEffect, useRef, useCallback } from 'react';
import { ChatConversation, ChatMessage, ChatUser } from '../types/chat';
import { AuthUser } from '../types/fiverr';

export function useRealtimeChat(currentUser?: AuthUser | null) {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv_hamza');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [onlineUserIds, setOnlineUserIds] = useState<string[]>(['seller-1', 'seller-3', 'support']);
  const [typingUsers, setTypingUsers] = useState<{ [convId: string]: string[] }>({});
  const [isConnected, setIsConnected] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentUserId = currentUser?.id || 'client_me';
  const currentUserName = currentUser?.name || 'You (Client)';
  const currentUserAvatar = currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';

  // 1. Fetch initial conversations from server
  const fetchConversations = useCallback(async () => {
    try {
      const res = await fetch(`/api/chat/conversations?userId=${currentUserId}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.conversations)) {
        setConversations(data.conversations);
        if (!activeConversationId && data.conversations.length > 0) {
          setActiveConversationId(data.conversations[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to load conversations:', err);
    }
  }, [currentUserId, activeConversationId]);

  // 2. Fetch messages for the active conversation
  const fetchMessages = useCallback(async (convId: string) => {
    setIsLoadingMessages(true);
    try {
      const res = await fetch(`/api/chat/messages?conversationId=${convId}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
      }
    } catch (err) {
      console.error('Failed to load messages for conversation:', convId, err);
    } finally {
      setIsLoadingMessages(false);
    }
  }, []);

  // When active conversation changes, fetch its messages and mark as read
  useEffect(() => {
    if (activeConversationId) {
      fetchMessages(activeConversationId);
      // Mark as read on server
      fetch(`/api/chat/conversations/${activeConversationId}/read`, { method: 'PATCH' }).catch(() => {});
      // Optimistically clear unread count in local state
      setConversations((prev) =>
        prev.map((c) => (c.id === activeConversationId ? { ...c, unreadCount: 0 } : c))
      );
    }
  }, [activeConversationId, fetchMessages]);

  // 3. Connect to WebSocket server with auto-reconnection
  const connectWebSocket = useCallback(() => {
    if (socketRef.current && (socketRef.current.readyState === WebSocket.OPEN || socketRef.current.readyState === WebSocket.CONNECTING)) {
      return;
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const wsUrl = `${protocol}//${host}/ws`;

    try {
      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        // Identify client
        ws.send(
          JSON.stringify({
            type: 'init',
            payload: {
              userId: currentUserId,
              userName: currentUserName,
              avatar: currentUserAvatar
            }
          })
        );
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'new_message') {
            const newMsg: ChatMessage = data.payload;

            // Update messages if this belongs to active conversation
            setMessages((prev) => {
              // Idempotency: avoid duplicates
              if (prev.some((m) => m.id === newMsg.id)) return prev;
              if (newMsg.conversationId === activeConversationId) {
                return [...prev, newMsg];
              }
              return prev;
            });

            // Update conversation lastMessage & unread count
            setConversations((prev) => {
              const idx = prev.findIndex((c) => c.id === newMsg.conversationId);
              if (idx !== -1) {
                const updated = [...prev];
                const isCurrentActive = newMsg.conversationId === activeConversationId;
                updated[idx] = {
                  ...updated[idx],
                  lastMessage: {
                    text: newMsg.text,
                    senderId: newMsg.senderId,
                    senderName: newMsg.senderName,
                    timestamp: newMsg.timestamp
                  },
                  updatedAt: newMsg.timestamp,
                  unreadCount: isCurrentActive ? 0 : (updated[idx].unreadCount || 0) + 1
                };
                // Sort by recency
                updated.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
                return updated;
              } else {
                // If new conversation, reload conversations
                fetchConversations();
                return prev;
              }
            });
          } else if (data.type === 'presence') {
            if (data.payload?.onlineUserIds) {
              setOnlineUserIds(data.payload.onlineUserIds);
            }
          } else if (data.type === 'user_typing') {
            const { conversationId, userName, isTyping } = data.payload || {};
            if (conversationId && userName) {
              setTypingUsers((prev) => {
                const current = prev[conversationId] || [];
                if (isTyping) {
                  return { ...prev, [conversationId]: Array.from(new Set([...current, userName])) };
                } else {
                  return { ...prev, [conversationId]: current.filter((u) => u !== userName) };
                }
              });
            }
          } else if (data.type === 'mark_read') {
            const { conversationId } = data.payload || {};
            if (conversationId) {
              setConversations((prev) =>
                prev.map((c) => (c.id === conversationId ? { ...c, unreadCount: 0 } : c))
              );
            }
          } else if (data.type === 'conversation_created') {
            fetchConversations();
          }
        } catch (err) {
          console.error('Error parsing WS message:', err);
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        socketRef.current = null;
        // Exponential reconnect attempt
        if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = setTimeout(() => {
          connectWebSocket();
        }, 3000);
      };

      ws.onerror = () => {
        setIsConnected(false);
      };
    } catch (err) {
      console.error('WS Connection error:', err);
      setIsConnected(false);
    }
  }, [currentUserId, currentUserName, activeConversationId, fetchConversations]);

  useEffect(() => {
    fetchConversations();
    connectWebSocket();

    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [fetchConversations, connectWebSocket]);

  // Send message function (optimistic + WebSocket broadcast + REST fallback)
  const sendMessage = async (
    text: string,
    options?: {
      gigAttachment?: ChatMessage['gigAttachment'];
      customOffer?: ChatMessage['customOffer'];
      recipientId?: string;
      recipientName?: string;
    }
  ) => {
    if (!activeConversationId || !text.trim()) return;

    const currentConv = conversations.find((c) => c.id === activeConversationId);
    const recipient =
      currentConv?.participants.find((p) => p.id !== currentUserId) || {
        id: options?.recipientId || 'seller-1',
        name: options?.recipientName || 'Seller'
      };

    const tempId = 'msg_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const optimisticMsg: ChatMessage = {
      id: tempId,
      conversationId: activeConversationId,
      senderId: currentUserId,
      senderName: currentUserName,
      senderAvatar: currentUserAvatar,
      recipientId: recipient.id,
      recipientName: recipient.name,
      text: text.trim(),
      timestamp: new Date().toISOString(),
      read: false,
      gigAttachment: options?.gigAttachment,
      customOffer: options?.customOffer
    };

    // Optimistic UI update
    setMessages((prev) => [...prev, optimisticMsg]);

    // If WebSocket is open, send via WS
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: 'send_message',
          payload: optimisticMsg
        })
      );
    } else {
      // Fallback to REST API
      try {
        await fetch('/api/chat/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(optimisticMsg)
        });
      } catch (err) {
        console.error('Failed to send message via REST:', err);
      }
    }
  };

  // Start direct conversation with a seller (e.g. from Gig page or Profile)
  const startConversationWithSeller = async (
    seller: { id: string; name: string; avatar?: string; title?: string; level?: string },
    gig?: { id: string; title: string; pricePkr: number; priceUsd: number; tier?: string }
  ) => {
    try {
      const res = await fetch('/api/chat/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUser: seller,
          gig: gig ? { id: gig.id, title: gig.title } : undefined
        })
      });
      const data = await res.json();
      if (data.success && data.conversation) {
        const conv: ChatConversation = data.conversation;
        // Update conversations state
        setConversations((prev) => {
          const exists = prev.some((c) => c.id === conv.id);
          return exists ? prev : [conv, ...prev];
        });
        setActiveConversationId(conv.id);
        setIsChatOpen(true);

        // If a gig was specified and this is a new conversation or user clicked "Contact", optionally auto-send or prefill
        if (gig) {
          // Send brief inquiry message if no prior messages exist
          const msgRes = await fetch(`/api/chat/messages?conversationId=${conv.id}`);
          const msgData = await msgRes.json();
          if (msgData.success && msgData.messages.length === 0) {
            sendMessage(
              `Hi ${seller.name}! I am interested in your gig: "${gig.title}". Can we discuss requirements and delivery timeline?`,
              {
                gigAttachment: {
                  id: gig.id,
                  title: gig.title,
                  pricePkr: gig.pricePkr,
                  priceUsd: gig.priceUsd,
                  tier: gig.tier || 'Standard'
                },
                recipientId: seller.id,
                recipientName: seller.name
              }
            );
          }
        }
      }
    } catch (err) {
      console.error('Failed to initiate conversation:', err);
    }
  };

  // Broadcast typing event
  const sendTyping = (isTyping: boolean) => {
    if (!activeConversationId || !socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      return;
    }

    socketRef.current.send(
      JSON.stringify({
        type: isTyping ? 'typing_start' : 'typing_stop',
        payload: { conversationId: activeConversationId }
      })
    );

    if (isTyping) {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        sendTyping(false);
      }, 3000);
    }
  };

  // Total unread messages count across all conversations
  const totalUnreadCount = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  const activeConversation = conversations.find((c) => c.id === activeConversationId) || conversations[0];
  const activeRecipient: ChatUser | undefined = activeConversation?.participants.find(
    (p) => p.id !== currentUserId
  );

  return {
    conversations,
    activeConversation,
    activeConversationId,
    setActiveConversationId,
    activeRecipient,
    messages,
    onlineUserIds,
    typingUsers: activeConversationId ? typingUsers[activeConversationId] || [] : [],
    isConnected,
    isChatOpen,
    setIsChatOpen,
    totalUnreadCount,
    isLoadingMessages,
    sendMessage,
    startConversationWithSeller,
    sendTyping
  };
}
