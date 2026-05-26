import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';
import { MessageSquare, Users, TrendingUp, Clock, Bot, User } from 'lucide-react';

// Datos de ejemplo para el panel de admin
const mockChats = [
  {
    id: '1',
    userName: 'Usuario Anónimo',
    messages: 12,
    lastMessage: '¿Qué tecnologías usa Javier?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    status: 'active'
  },
  {
    id: '2',
    userName: 'Usuario Anónimo',
    messages: 8,
    lastMessage: 'Gracias por la información',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: 'completed'
  },
  {
    id: '3',
    userName: 'Usuario Anónimo',
    messages: 15,
    lastMessage: '¿Cómo puedo contactar a Javier?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    status: 'completed'
  }
];

const stats = [
  { label: 'Total Chats', value: '24', icon: MessageSquare, change: '+12%' },
  { label: 'Usuarios Activos', value: '3', icon: Users, change: '+5%' },
  { label: 'Mensajes Hoy', value: '156', icon: TrendingUp, change: '+23%' },
  { label: 'Tiempo Promedio', value: '4m', icon: Clock, change: '-8%' },
];

export function AdminPage() {
  const { isDark } = useTheme();
  const { isAdmin } = useAuth();

  // Redirigir si no es admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

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
            Gestiona los chats y visualiza estadísticas
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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
                  'text-sm font-medium',
                  stat.change.startsWith('+')
                    ? 'text-green-500'
                    : 'text-red-500'
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

        {/* Chats table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={cn(
            'rounded-2xl overflow-hidden',
            isDark ? 'glass-night' : 'glass-day'
          )}
        >
          <div className="p-6 border-b border-current border-opacity-10">
            <h2 className={cn(
              'text-xl font-bold flex items-center gap-2',
              isDark ? 'text-night-text' : 'text-day-text'
            )}>
              <MessageSquare className="w-5 h-5 text-day-primary" />
              Chats Recientes
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={cn(
                  'border-b',
                  isDark ? 'border-night-border' : 'border-day-border'
                )}>
                  <th className={cn(
                    'text-left px-6 py-4 text-sm font-semibold',
                    isDark ? 'text-night-text/70' : 'text-day-text/70'
                  )}>Usuario</th>
                  <th className={cn(
                    'text-left px-6 py-4 text-sm font-semibold',
                    isDark ? 'text-night-text/70' : 'text-day-text/70'
                  )}>Mensajes</th>
                  <th className={cn(
                    'text-left px-6 py-4 text-sm font-semibold',
                    isDark ? 'text-night-text/70' : 'text-day-text/70'
                  )}>Último mensaje</th>
                  <th className={cn(
                    'text-left px-6 py-4 text-sm font-semibold',
                    isDark ? 'text-night-text/70' : 'text-day-text/70'
                  )}>Hora</th>
                  <th className={cn(
                    'text-left px-6 py-4 text-sm font-semibold',
                    isDark ? 'text-night-text/70' : 'text-day-text/70'
                  )}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {mockChats.map((chat) => (
                  <tr
                    key={chat.id}
                    className={cn(
                      'border-b transition-colors',
                      isDark
                        ? 'border-night-border/50 hover:bg-night-primary/5'
                        : 'border-day-border/50 hover:bg-day-primary/5'
                    )}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center',
                          isDark ? 'bg-night-primary/20' : 'bg-day-primary/20'
                        )}>
                          <User className="w-4 h-4 text-day-primary" />
                        </div>
                        <span className={cn(
                          'text-sm font-medium',
                          isDark ? 'text-night-text' : 'text-day-text'
                        )}>
                          {chat.userName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        'text-sm',
                        isDark ? 'text-night-text' : 'text-day-text'
                      )}>
                        {chat.messages}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-day-primary" />
                        <span className={cn(
                          'text-sm truncate max-w-xs',
                          isDark ? 'text-night-text/80' : 'text-day-text/80'
                        )}>
                          {chat.lastMessage}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        'text-sm',
                        isDark ? 'text-night-text/70' : 'text-day-text/70'
                      )}>
                        {chat.timestamp.toLocaleTimeString('es-ES', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        'px-3 py-1 rounded-full text-xs font-medium',
                        chat.status === 'active'
                          ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                          : 'bg-gray-500/20 text-gray-600 dark:text-gray-400'
                      )}>
                        {chat.status === 'active' ? 'Activo' : 'Completado'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
