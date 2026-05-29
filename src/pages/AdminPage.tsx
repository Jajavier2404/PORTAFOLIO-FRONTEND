import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Clock, 
  Bot, 
  User, 
  Trash2,
  ChevronDown,
  ChevronUp,
  Loader2
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ChatMessage {
  id: string;
  role: string;
  content: string;
  timestamp: string;
  isAiGenerated: boolean;
  processingTime?: number;
  modelUsed?: string;
}

interface Chat {
  id: string;
  sessionId: string;
  title: string;
  messageCount: number;
  lastMessageAt: string | null;
  createdAt: string;
  messages: ChatMessage[];
}

interface ChatStats {
  totalChats: number;
  totalMessages: number;
  todayMessages: number;
  aiGeneratedMessages: number;
  activeChats: number;
}

export function AdminPage() {
  const { isDark } = useTheme();
  const { isAdmin, token } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [stats, setStats] = useState<ChatStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedChat, setExpandedChat] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  // Redirigir si no es admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Obtener chats
      const chatsResponse = await axios.get(`${API_URL}/chat`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (chatsResponse.data.success) {
        setChats(chatsResponse.data.data.chats);
      }
      
      // Obtener estadísticas
      const statsResponse = await axios.get(`${API_URL}/chat/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (statsResponse.data.success) {
        setStats(statsResponse.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteChat = async (chatId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta conversación?')) return;
    
    try {
      await axios.delete(`${API_URL}/chat/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setChats(prev => prev.filter(chat => chat.id !== chatId));
      if (selectedChat?.id === chatId) {
        setSelectedChat(null);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const toggleChatExpansion = (chatId: string) => {
    setExpandedChat(expandedChat === chatId ? null : chatId);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const statCards = stats ? [
    { 
      label: 'Total Chats', 
      value: stats.totalChats.toString(), 
      icon: MessageSquare, 
      change: '+Nuevo' 
    },
    { 
      label: 'Chats Activos', 
      value: stats.activeChats.toString(), 
      icon: Users, 
      change: '24h' 
    },
    { 
      label: 'Mensajes Hoy', 
      value: stats.todayMessages.toString(), 
      icon: TrendingUp, 
      change: 'Hoy' 
    },
    { 
      label: 'Respuestas IA', 
      value: stats.aiGeneratedMessages.toString(), 
      icon: Bot, 
      change: 'Total' 
    },
  ] : [];

  return (
    <div
      className={cn(
        'min-h-screen pt-16 transition-colors duration-500',
        isDark ? 'bg-night-bg' : 'bg-day-bg'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={cn(
            'text-3xl font-bold mb-2',
            isDark ? 'text-night-text' : 'text-day-text'
          )}>
            Panel de Administración
          </h1>
          <p className={cn(
            'text-lg',
            isDark ? 'text-night-text/70' : 'text-day-text/70'
          )}>
            Gestiona las conversaciones del chat con IA
          </p>
        </motion.div>

        {/* Stats */}
        {stats && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'p-6 rounded-2xl',
                  isDark ? 'glass-night' : 'glass-day'
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={cn(
                    'p-3 rounded-xl',
                    isDark ? 'bg-night-primary/20' : 'bg-day-primary/20'
                  )}>
                    <stat.icon className="w-6 h-6 text-day-primary" />
                  </div>
                  <span className={cn(
                    'text-sm font-medium px-2 py-1 rounded-full',
                    isDark ? 'bg-night-primary/10 text-night-primary' : 'bg-day-primary/10 text-day-primary'
                  )}>
                    {stat.change}
                  </span>
                </div>
                <p className={cn(
                  'text-3xl font-bold mb-1',
                  isDark ? 'text-night-text' : 'text-day-text'
                )}>
                  {stat.value}
                </p>
                <p className={cn(
                  'text-sm',
                  isDark ? 'text-night-text/70' : 'text-day-text/70'
                )}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Chats List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={cn(
            'rounded-2xl overflow-hidden',
            isDark ? 'glass-night' : 'glass-day'
          )}
        >
          <div className="p-6 border-b border-current border-opacity-10 flex items-center justify-between">
            <h2 className={cn(
              'text-xl font-bold flex items-center gap-2',
              isDark ? 'text-night-text' : 'text-day-text'
            )}>
              <MessageSquare className="w-5 h-5 text-day-primary" />
              Conversaciones ({chats.length})
            </h2>
            <button
              onClick={fetchData}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                isDark 
                  ? 'bg-night-primary/20 text-night-primary hover:bg-night-primary/30' 
                  : 'bg-day-primary/20 text-day-primary hover:bg-day-primary/30'
              )}
            >
              Actualizar
            </button>
          </div>

          {loading ? (
            <div className="p-8 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-day-primary" />
            </div>
          ) : chats.length === 0 ? (
            <div className="p-8 text-center">
              <Bot className="w-12 h-12 mx-auto mb-4 text-day-primary/50" />
              <p className={cn(
                'text-lg',
                isDark ? 'text-night-text/70' : 'text-day-text/70'
              )}>
                No hay conversaciones aún
              </p>
            </div>
          ) : (
            <div className="divide-y divide-current divide-opacity-10">
              {chats.map((chat) => (
                <div key={chat.id} className="p-4">
                  {/* Chat Header */}
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleChatExpansion(chat.id)}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center',
                        isDark ? 'bg-night-primary/20' : 'bg-day-primary/20'
                      )}>
                        <User className="w-5 h-5 text-day-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className={cn(
                          'text-sm font-semibold',
                          isDark ? 'text-night-text' : 'text-day-text'
                        )}>
                          {chat.title || 'Nueva conversación'}
                        </h3>
                        <p className={cn(
                          'text-xs',
                          isDark ? 'text-night-text/60' : 'text-day-text/60'
                        )}>
                          {chat.messageCount} mensajes • {formatDate(chat.lastMessageAt)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChat(chat.id);
                        }}
                        className={cn(
                          'p-2 rounded-lg transition-colors',
                          isDark 
                            ? 'hover:bg-red-500/20 text-red-400' 
                            : 'hover:bg-red-500/20 text-red-500'
                        )}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      
                      {expandedChat === chat.id ? (
                        <ChevronUp className="w-5 h-5 text-day-primary" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-day-primary" />
                      )}
                    </div>
                  </div>
                  
                  {/* Expanded Messages */}
                  <AnimatePresence>
                    {expandedChat === chat.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 overflow-hidden"
                      >
                        <div className={cn(
                          'rounded-xl p-4 space-y-3 max-h-96 overflow-y-auto',
                          isDark ? 'bg-night-bg/50' : 'bg-day-bg/50'
                        )}>
                          {chat.messages.map((msg) => (
                            <div
                              key={msg.id}
                              className={cn(
                                'flex gap-3',
                                msg.role === 'USER' ? 'justify-end' : 'justify-start'
                              )}
                            >
                              {msg.role === 'ASSISTANT' && (
                                <div className={cn(
                                  'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                                  isDark ? 'bg-night-primary/20' : 'bg-day-primary/20'
                                )}>
                                  <Bot className="w-4 h-4 text-day-primary" />
                                </div>
                              )}
                              
                              <div className={cn(
                                'max-w-[80%] px-3 py-2 rounded-xl text-sm',
                                msg.role === 'USER'
                                  ? isDark
                                    ? 'bg-day-primary text-night-bg'
                                    : 'bg-day-primary text-white'
                                  : isDark
                                    ? 'bg-night-primary/10 text-night-text'
                                    : 'bg-day-primary/10 text-day-text'
                              )}>
                                <p>{msg.content}</p>
                                <div className={cn(
                                  'text-xs mt-1 flex items-center gap-1',
                                  msg.role === 'USER'
                                    ? 'text-white/70'
                                    : isDark
                                      ? 'text-night-text/50'
                                      : 'text-day-text/50'
                                )}>
                                  <span>
                                    {new Date(msg.timestamp).toLocaleTimeString('es-ES', {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </span>
                                  {msg.isAiGenerated && msg.processingTime && (
                                    <span>• {msg.processingTime}ms</span>
                                  )}
                                </div>
                              </div>
                              
                              {msg.role === 'USER' && (
                                <div className={cn(
                                  'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                                  isDark ? 'bg-night-primary/20' : 'bg-day-primary/20'
                                )}>
                                  <User className="w-4 h-4 text-day-primary" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
