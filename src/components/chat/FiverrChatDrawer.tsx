import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Paperclip,
  CheckCheck,
  Check,
  Search,
  Minimize2,
  Maximize2,
  ExternalLink,
  ShieldCheck,
  Clock,
  Star,
  Tag,
  FileText,
  User,
  ArrowLeft
} from 'lucide-react';
import { ChatConversation, ChatMessage, ChatUser } from '../../types/chat';
import { Currency } from '../../types/fiverr';

interface FiverrChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: ChatConversation[];
  activeConversation: ChatConversation | undefined;
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  activeRecipient: ChatUser | undefined;
  messages: ChatMessage[];
  onlineUserIds: string[];
  typingUsers: string[];
  isConnected: boolean;
  totalUnreadCount: number;
  isLoadingMessages: boolean;
  currency: Currency;
  onSendMessage: (
    text: string,
    options?: {
      gigAttachment?: ChatMessage['gigAttachment'];
      customOffer?: ChatMessage['customOffer'];
    }
  ) => void;
  onSendTyping: (isTyping: boolean) => void;
  onOpenOrderForGig?: (gigId: string) => void;
}

export const FiverrChatDrawer: React.FC<FiverrChatDrawerProps> = ({
  isOpen,
  onClose,
  conversations,
  activeConversation,
  activeConversationId,
  onSelectConversation,
  activeRecipient,
  messages,
  onlineUserIds,
  typingUsers,
  isConnected,
  totalUnreadCount,
  isLoadingMessages,
  currency,
  onSendMessage,
  onSendTyping,
  onOpenOrderForGig,
}) => {
  const [inputText, setInputText] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [mobileShowList, setMobileShowList] = useState(false);
  const [showCustomOfferModal, setShowCustomOfferModal] = useState(false);

  // Custom offer modal state
  const [offerTitle, setOfferTitle] = useState('');
  const [offerPrice, setOfferPrice] = useState('25000');
  const [offerDelivery, setOfferDelivery] = useState('3 Days');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    onSendTyping(e.target.value.length > 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
    onSendTyping(false);
  };

  const handleSendQuickChip = (text: string) => {
    onSendMessage(text);
  };

  const handleCreateCustomOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerTitle.trim()) return;

    onSendMessage(`Custom Offer: ${offerTitle}`, {
      customOffer: {
        title: offerTitle,
        price: currency === 'PKR' ? `PKR ${Number(offerPrice).toLocaleString()}` : `$${offerPrice}`,
        delivery: offerDelivery,
        status: 'pending'
      }
    });

    setShowCustomOfferModal(false);
    setOfferTitle('');
  };

  const isUserOnline = (userId?: string) => {
    if (!userId) return false;
    return onlineUserIds.includes(userId);
  };

  const formatTime = (isoString?: string) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  const filteredConversations = conversations.filter((c) => {
    const other = c.participants.find((p) => p.id !== 'client_me');
    const nameMatch = other?.name.toLowerCase().includes(searchFilter.toLowerCase());
    const gigMatch = c.relatedGigTitle?.toLowerCase().includes(searchFilter.toLowerCase());
    return nameMatch || gigMatch;
  });

  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-50 transition-all duration-300 shadow-2xl flex flex-col overflow-hidden bg-white border border-gray-300 font-['Plus_Jakarta_Sans',sans-serif] ${
        isExpanded
          ? 'inset-2 sm:inset-6 md:inset-10 rounded-2xl'
          : 'bottom-0 right-0 sm:right-6 w-full sm:w-[740px] h-[92vh] sm:h-[620px] rounded-t-2xl sm:rounded-2xl'
      }`}
    >
      {/* Top Header Bar */}
      <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          {/* Mobile Back to List Button */}
          <button
            onClick={() => setMobileShowList(true)}
            className="md:hidden p-1 rounded-md hover:bg-slate-800 text-slate-300"
            title="All Conversations"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <div className="relative">
              <MessageSquare className="w-5 h-5 text-red-500" />
              {totalUnreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-extrabold flex items-center justify-center">
                  {totalUnreadCount}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base tracking-tight flex items-center gap-1.5">
                <span>Figer Free Direct Chat</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50 font-bold uppercase tracking-wider">
                  Live
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Direct in-app messaging • WebSockets active • No WhatsApp required
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Realtime WebSocket Status Pill */}
          <div
            className={`hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
              isConnected
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/40'
                : 'bg-amber-950/80 text-amber-300 border border-amber-700/40'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span>{isConnected ? 'Realtime Connected' : 'Reconnecting...'}</span>
          </div>

          {/* Expand / Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden sm:block p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title={isExpanded ? 'Restore window size' : 'Expand window'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Close Chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Body (Split into Left Conversations List & Right Chat View) */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT COLUMN: Conversations List (hidden on mobile when in conversation view) */}
        <div
          className={`w-full md:w-72 bg-gray-50 border-r border-gray-200 flex flex-col shrink-0 ${
            mobileShowList ? 'flex z-20 absolute inset-0 bg-white' : 'hidden md:flex'
          }`}
        >
          {/* Search Contacts Bar */}
          <div className="p-3 border-b border-gray-200 bg-white">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search sellers or gigs..."
                className="w-full bg-gray-100 border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:bg-white"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {filteredConversations.length === 0 ? (
              <div className="p-6 text-center text-xs text-gray-500">
                No active chat threads found.
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isSelected = conv.id === activeConversationId;
                const other = conv.participants.find((p) => p.id !== 'client_me') || conv.participants[0];
                const online = isUserOnline(other.id);

                return (
                  <button
                    key={conv.id}
                    onClick={() => {
                      onSelectConversation(conv.id);
                      setMobileShowList(false);
                    }}
                    className={`w-full p-3 text-left transition-colors flex items-start gap-3 relative cursor-pointer ${
                      isSelected
                        ? 'bg-red-50/60 border-l-4 border-red-600'
                        : 'hover:bg-gray-100/80 bg-white'
                    }`}
                  >
                    {/* Avatar with Online Indicator */}
                    <div className="relative shrink-0">
                      <img
                        src={other.avatar}
                        alt={other.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        referrerPolicy="no-referrer"
                      />
                      <span
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          online ? 'bg-emerald-500' : 'bg-gray-300'
                        }`}
                        title={online ? 'Online' : 'Offline'}
                      />
                    </div>

                    {/* Chat Excerpt Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="font-bold text-xs text-slate-900 truncate">
                          {other.name}
                        </span>
                        <span className="text-[10px] text-gray-400 shrink-0">
                          {formatTime(conv.updatedAt)}
                        </span>
                      </div>

                      {other.level && (
                        <div className="text-[10px] text-amber-700 font-semibold mb-1 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-yellow-500" />
                          <span>{other.level}</span>
                        </div>
                      )}

                      <p className="text-xs text-gray-500 truncate">
                        {conv.lastMessage?.text || 'No messages yet'}
                      </p>
                    </div>

                    {/* Unread Counter Badge */}
                    {conv.unreadCount && conv.unreadCount > 0 ? (
                      <span className="shrink-0 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                        {conv.unreadCount}
                      </span>
                    ) : null}
                  </button>
                );
              })
            )}
          </div>

          {/* Quick Notice */}
          <div className="p-2.5 bg-gray-100/90 border-t border-gray-200 text-[11px] text-gray-600 text-center">
            🔒 All communications are recorded & protected by Prime Escrow
          </div>
        </div>

        {/* RIGHT COLUMN: Active Chat Room */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          
          {/* Active Recipient Header */}
          {activeRecipient ? (
            <div className="px-4 py-3 border-b border-gray-200 bg-white flex items-center justify-between shrink-0 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={activeRecipient.avatar}
                    alt={activeRecipient.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    referrerPolicy="no-referrer"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      isUserOnline(activeRecipient.id) ? 'bg-emerald-500' : 'bg-gray-300'
                    }`}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900">
                      {activeRecipient.name}
                    </h4>
                    {activeRecipient.rating && (
                      <span className="flex items-center gap-0.5 text-[11px] font-bold text-yellow-600 bg-yellow-50 px-1.5 py-0.5 rounded border border-yellow-200">
                        <Star className="w-2.5 h-2.5 fill-yellow-500 text-yellow-500" />
                        <span>{activeRecipient.rating.toFixed(1)}</span>
                      </span>
                    )}
                    {activeRecipient.level && (
                      <span className="hidden sm:inline-block text-[10px] font-semibold text-slate-700 bg-gray-100 px-2 py-0.5 rounded-full">
                        {activeRecipient.level}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1 text-emerald-600 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {isUserOnline(activeRecipient.id) ? 'Online Now' : 'Away'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span>{activeRecipient.responseTime || '1 Hour Avg Response'}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCustomOfferModal(true)}
                  className="px-2.5 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  title="Request or Send Custom Project Offer"
                >
                  <Tag className="w-3 h-3" />
                  <span className="hidden sm:inline">Custom Offer</span>
                </button>
              </div>
            </div>
          ) : null}

          {/* Related Gig Notice Bar (if conversation is tied to a specific Gig) */}
          {activeConversation?.relatedGigTitle && (
            <div className="px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100 flex items-center justify-between text-xs text-slate-800 shrink-0">
              <div className="flex items-center gap-2 truncate pr-2">
                <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-extrabold text-[10px] uppercase tracking-wider">
                  Gig Inquiry
                </span>
                <span className="font-semibold text-slate-900 truncate">
                  {activeConversation.relatedGigTitle}
                </span>
              </div>
              {activeConversation.relatedGigId && onOpenOrderForGig && (
                <button
                  onClick={() => onOpenOrderForGig(activeConversation.relatedGigId!)}
                  className="shrink-0 px-2.5 py-1 rounded bg-slate-900 hover:bg-red-600 text-white font-bold text-[11px] transition-colors cursor-pointer"
                >
                  Order Gig
                </button>
              )}
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
            {isLoadingMessages ? (
              <div className="flex items-center justify-center h-full text-xs text-gray-400 gap-2">
                <span className="w-3 h-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                <span>Loading secure conversation...</span>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h5 className="font-bold text-sm text-slate-800">Start Direct Conversation</h5>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Discuss project deliverables, pricing, and deadlines directly with {activeRecipient?.name}.
                </p>
              </div>
            ) : (
              messages.map((msg) => {
                const isMe = msg.senderId === 'client_me';

                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    {/* Left Avatar for Seller */}
                    {!isMe && (
                      <img
                        src={msg.senderAvatar || activeRecipient?.avatar}
                        alt={msg.senderName}
                        className="w-7 h-7 rounded-full object-cover border border-gray-200 shrink-0 mb-1"
                        referrerPolicy="no-referrer"
                      />
                    )}

                    {/* Message Bubble Container */}
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3 shadow-2xs ${
                        isMe
                          ? 'bg-slate-900 text-white rounded-br-xs'
                          : 'bg-white text-slate-800 border border-gray-200 rounded-bl-xs'
                      }`}
                    >
                      {/* Sender Name on Seller Message */}
                      {!isMe && (
                        <div className="text-[11px] font-bold text-red-600 mb-1">
                          {msg.senderName}
                        </div>
                      )}

                      {/* Text content */}
                      <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {msg.text}
                      </p>

                      {/* Attached Gig Card Preview (if any) */}
                      {msg.gigAttachment && (
                        <div className="mt-2.5 p-2.5 rounded-xl border border-red-200/50 bg-red-500/10 text-xs space-y-1">
                          <div className="flex items-center gap-1.5 text-red-400 font-bold text-[10px] uppercase tracking-wider">
                            <Tag className="w-3 h-3" />
                            <span>Referenced Marketplace Gig</span>
                          </div>
                          <div className="font-bold text-xs truncate">
                            {msg.gigAttachment.title}
                          </div>
                          <div className="flex items-center justify-between pt-1 border-t border-red-200/30 text-[11px]">
                            <span className="font-semibold text-yellow-400">
                              {currency === 'PKR'
                                ? `PKR ${msg.gigAttachment.pricePkr.toLocaleString()}`
                                : `$${msg.gigAttachment.priceUsd.toLocaleString()}`}
                            </span>
                            <span className="text-slate-400 font-mono">
                              {msg.gigAttachment.tier || 'Package Tier'}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Custom Offer Card Preview (if any) */}
                      {msg.customOffer && (
                        <div className="mt-2.5 p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-xs space-y-2">
                          <div className="flex items-center justify-between text-emerald-400 font-bold text-[10px] uppercase tracking-wider">
                            <span className="flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              Custom Milestone Offer
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-extrabold text-[9px]">
                              {msg.customOffer.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="font-bold text-sm">{msg.customOffer.title}</div>
                          <div className="flex items-center justify-between text-xs pt-1 border-t border-emerald-500/20">
                            <span className="font-extrabold text-emerald-400 text-sm">
                              {msg.customOffer.price}
                            </span>
                            <span className="text-gray-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {msg.customOffer.delivery}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Timestamp & Read Receipts */}
                      <div
                        className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                          isMe ? 'text-slate-400' : 'text-gray-400'
                        }`}
                      >
                        <span>{formatTime(msg.timestamp)}</span>
                        {isMe && (
                          <span>
                            {msg.read ? (
                              <CheckCheck className="w-3 h-3 text-emerald-400 inline" />
                            ) : (
                              <Check className="w-3 h-3 text-slate-400 inline" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Typing Indicator */}
            {typingUsers.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-gray-500 italic pl-9">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                <span>{typingUsers.join(', ')} is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Response Suggestion Chips */}
          <div className="px-3 py-1.5 bg-gray-100/70 border-t border-gray-200 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 text-xs">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-500" />
              Quick:
            </span>
            <button
              type="button"
              onClick={() => handleSendQuickChip('Salam! Can you deliver this project in 3 days?')}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-gray-200 border border-gray-200 text-slate-700 font-medium whitespace-nowrap cursor-pointer transition-colors"
            >
              Can you deliver in 3 days?
            </button>
            <button
              type="button"
              onClick={() => handleSendQuickChip('Can I see your latest portfolio and live demos?')}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-gray-200 border border-gray-200 text-slate-700 font-medium whitespace-nowrap cursor-pointer transition-colors"
            >
              Share portfolio demo?
            </button>
            <button
              type="button"
              onClick={() => handleSendQuickChip('What is your best discounted rate for this?')}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-gray-200 border border-gray-200 text-slate-700 font-medium whitespace-nowrap cursor-pointer transition-colors"
            >
              Best price quote?
            </button>
          </div>

          {/* Input & Send Area */}
          <div className="p-3 bg-white border-t border-gray-200 shrink-0">
            <div className="flex items-end gap-2">
              <div className="flex-1 relative bg-gray-50 border border-gray-300 rounded-xl focus-within:border-red-600 focus-within:bg-white transition-all">
                <textarea
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={`Message ${activeRecipient?.name || 'freelancer'} (Press Enter to send)...`}
                  rows={2}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-gray-400 bg-transparent focus:outline-none resize-none"
                />
              </div>

              <div className="flex flex-col gap-1 shrink-0">
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className={`p-3 rounded-xl font-bold flex items-center justify-center transition-all cursor-pointer ${
                    inputText.trim()
                      ? 'bg-red-600 hover:bg-red-500 text-white shadow-md'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  title="Send Message (Enter)"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1.5 px-1">
              <span>Press Shift+Enter for new line</span>
              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                End-to-End In-App Chat
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Custom Milestone Offer Modal */}
      {showCustomOfferModal && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-red-600" />
                <h4 className="font-bold text-sm text-slate-900">Create Custom Proposal Offer</h4>
              </div>
              <button
                onClick={() => setShowCustomOfferModal(false)}
                className="p-1 rounded-md text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomOffer} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Deliverables Scope / Offer Title *
                </label>
                <input
                  type="text"
                  required
                  value={offerTitle}
                  onChange={(e) => setOfferTitle(e.target.value)}
                  placeholder="e.g. 5 Custom Video Creatives + Ad Copywriting"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Price ({currency}) *
                  </label>
                  <input
                    type="number"
                    required
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Delivery Time *
                  </label>
                  <select
                    value={offerDelivery}
                    onChange={(e) => setOfferDelivery(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 bg-white"
                  >
                    <option value="1 Day">1 Day (Express)</option>
                    <option value="2 Days">2 Days</option>
                    <option value="3 Days">3 Days</option>
                    <option value="5 Days">5 Days</option>
                    <option value="7 Days">7 Days</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-red-600 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  Send Proposal into Chat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
