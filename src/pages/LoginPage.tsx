import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

export function LoginPage() {
  const { isDark } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Credenciales incorrectas. Intenta de nuevo.');
    }

    setIsLoading(false);
  };

  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center transition-colors duration-500',
        isDark ? 'bg-night-bg' : 'bg-day-bg'
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url(${isDark ? '/images/bg-night.png' : '/images/bg-day.png'})`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className={cn(
          'p-8 rounded-2xl',
          isDark ? 'glass-night' : 'glass-day'
        )}>
          <div className="text-center mb-8">
            <div className={cn(
              'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4',
              isDark ? 'bg-night-primary/20' : 'bg-day-primary/20'
            )}>
              <LogIn className="w-8 h-8 text-day-primary" />
            </div>
            <h1 className={cn(
              'text-2xl font-bold',
              isDark ? 'text-night-text' : 'text-day-text'
            )}>
              Iniciar sesión
            </h1>
            <p className={cn(
              'mt-2',
              isDark ? 'text-night-text/70' : 'text-day-text/70'
            )}>
              Accede al panel de administración
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className={cn(
                  'block text-sm font-medium mb-2',
                  isDark ? 'text-night-text' : 'text-day-text'
                )}
              >
                Email
              </label>
              <div className="relative">
                <Mail className={cn(
                  'absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5',
                  isDark ? 'text-night-text/40' : 'text-day-text/40'
                )} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@ejemplo.com"
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none',
                    isDark
                      ? 'bg-night-bg/50 border-night-border text-night-text placeholder:text-night-text/40 focus:border-night-primary'
                      : 'bg-day-bg/50 border-day-border text-day-text placeholder:text-day-text/40 focus:border-day-primary'
                  )}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className={cn(
                  'block text-sm font-medium mb-2',
                  isDark ? 'text-night-text' : 'text-day-text'
                )}
              >
                Contraseña
              </label>
              <div className="relative">
                <Lock className={cn(
                  'absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5',
                  isDark ? 'text-night-text/40' : 'text-day-text/40'
                )} />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none',
                    isDark
                      ? 'bg-night-bg/50 border-night-border text-night-text placeholder:text-night-text/40 focus:border-night-primary'
                      : 'bg-day-bg/50 border-day-border text-day-text placeholder:text-day-text/40 focus:border-day-primary'
                  )}
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 rounded-xl bg-red-500/20 text-red-600 dark:text-red-400"
              >
                <AlertCircle className="w-5 h-5" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                'w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
                isDark
                  ? 'bg-day-primary text-night-bg hover:bg-night-accent'
                  : 'bg-day-primary text-white hover:bg-day-accent'
              )}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Iniciar sesión
                </>
              )}
            </button>
          </form>

          <div className={cn(
            'mt-6 text-center text-sm',
            isDark ? 'text-night-text/60' : 'text-day-text/60'
          )}>
            <p>Credenciales de demo:</p>
            <p>Email: javier@admin.com</p>
            <p>Contraseña: admin123</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
