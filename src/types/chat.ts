export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  role: 'seller' | 'buyer' | 'admin' | 'support';
  title?: string;
  online?: boolean;
  responseTime?: string;
  rating?: number;
  level?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  recipientId: string;
  recipientName?: string;
  text: string;
  timestamp: string;
  read?: boolean;
  gigAttachment?: {
    id: string;
    title: string;
    pricePkr: number;
    priceUsd: number;
    tier?: string;
    image?: string;
  };
  customOffer?: {
    title: string;
    price: string;
    delivery: string;
    status: 'pending' | 'accepted' | 'declined';
  };
}

export interface ChatConversation {
  id: string;
  participantIds: string[];
  participants: ChatUser[];
  lastMessage?: {
    text: string;
    senderId: string;
    senderName: string;
    timestamp: string;
  };
  updatedAt: string;
  unreadCount?: number;
  relatedGigId?: string;
  relatedGigTitle?: string;
}

export interface WebSocketEvent {
  type: 'init' | 'join_conversation' | 'send_message' | 'new_message' | 'typing_start' | 'typing_stop' | 'user_typing' | 'mark_read' | 'presence' | 'error';
  payload: any;
}
