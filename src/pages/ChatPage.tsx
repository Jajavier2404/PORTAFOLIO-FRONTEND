import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { chatApiService } from '../services/chatApi';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Generar sessionId único para el usuario
const getSessionId = () => {
  let sessionId = localStorage.getItem('chat_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('chat_session_id', sessionId);
  }
  return sessionId;
};

export function ChatPage() {
  const { isDark } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '¡Hola! Soy Javier. ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre mis proyectos, tecnologías, o simplemente charlar sobre desarrollo de software.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(getSessionId()).current;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cargar historial al montar el componente
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await chatApiService.getChatHistory(sessionId);
        if (history.length > 0) {
          const formattedMessages = history.map((msg, index) => ({
            id: `hist_${index}`,
            role: msg.role,
            content: msg.content,
            timestamp: new Date()
          }));
          setMessages(prev => [...prev, ...formattedMessages]);
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    };

    loadHistory();
  }, [sessionId]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Llamar al backend
      const response = await chatApiService.sendMessage(
        sessionId,
        userMessage.content
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, estoy teniendo problemas técnicos en este momento. ¿Podrías intentar de nuevo en unos segundos?',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className={cn(
        'min-h-screen pt-16 flex flex-col transition-colors duration-500',
        isDark ? 'bg-night-bg' : 'bg-day-bg'
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url(${isDark ? '/images/bg-night.png' : '/images/bg-day.png'})`,
        }}
      />

      <div className="relative z-10 flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4',
            isDark ? 'bg-night-primary/20' : 'bg-day-primary/20'
          )}>
            <Sparkles className="w-5 h-5 text-day-primary" />
            <span className={cn(
              'text-sm font-medium',
              isDark ? 'text-night-primary' : 'text-day-primary'
            )}>
              Chat con IA
            </span>
          </div>
          <h1 className={cn(
            'text-3xl font-bold',
            isDark ? 'text-night-text' : 'text-day-text'
          )}>
            Habla conmigo
          </h1>
          <p className={cn(
            'mt-2 text-sm',
            isDark ? 'text-night-text/70' : 'text-day-text/70'
          )}>
            Soy Javier, ingeniero de software. ¿En qué puedo ayudarte?
          </p>
        </motion.div>

        {/* Messages */}
        <div className={cn(
          'flex-1 overflow-y-auto rounded-2xl p-6 mb-4 space-y-4 min-h-[400px] max-h-[600px]',
          isDark ? 'glass-night' : 'glass-day'
        )}>
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={cn(
                  'flex gap-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                    isDark ? 'bg-night-primary/20' : 'bg-day-primary/20'
                  )}>
                    <Bot className="w-5 h-5 text-day-primary" />
                  </div>
                )}

                <div
                  className={cn(
                    'max-w-[80%] px-4 py-3 rounded-2xl',
                    message.role === 'user'
                      ? isDark
                        ? 'bg-day-primary text-night-bg'
                        : 'bg-day-primary text-white'
                      : isDark
                        ? 'bg-night-primary/10 text-night-text'
                        : 'bg-day-primary/10 text-day-text'
                  )}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <span className={cn(
                    'text-xs mt-1 block',
                    message.role === 'user'
                      ? 'text-white/70'
                      : isDark
                        ? 'text-night-text/50'
                        : 'text-day-text/50'
                  )}>
                    {message.timestamp.toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                {message.role === 'user' && (
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                    isDark ? 'bg-night-primary/20' : 'bg-day-primary/20'
                  )}>
                    <User className="w-5 h-5 text-day-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center',
                isDark ? 'bg-night-primary/20' : 'bg-day-primary/20'
              )}>
                <Bot className="w-5 h-5 text-day-primary" />
              </div>
              <div className={cn(
                'px-4 py-3 rounded-2xl flex items-center gap-2',
                isDark ? 'bg-night-primary/10' : 'bg-day-primary/10'
              )}>
                <Loader2 className="w-4 h-4 animate-spin text-day-primary" />
                <span className={cn(
                  'text-sm',
                  isDark ? 'text-night-text/70' : 'text-day-text/70'
                )}>
                  Pensando...
                </span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className={cn(
          'p-4 rounded-2xl',
          isDark ? 'glass-night' : 'glass-day'
        )}>
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu mensaje..."
              className={cn(
                'flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none',
                isDark
                  ? 'bg-night-bg/50 border-night-border text-night-text placeholder:text-night-text/40 focus:border-night-primary'
                  : 'bg-day-bg/50 border-day-border text-day-text placeholder:text-day-text/40 focus:border-day-primary'
              )}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className={cn(
                'px-4 py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
                isDark
                  ? 'bg-day-primary text-night-bg hover:bg-night-accent'
                  : 'bg-day-primary text-white hover:bg-day-accent'
              )}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
