import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';
import { Mail, Leaf, Cloud, Sparkles, Circle } from 'lucide-react';

// Icono de GitHub como SVG
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

export function Hero() {
  const { isDark } = useTheme();

  return (
    <section
      id="inicio"
      className={cn(
        'relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-700',
        isDark ? 'bg-night-bg' : 'bg-day-bg'
      )}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
        style={{
          backgroundImage: `url(${isDark ? '/images/bg-night.png' : '/images/bg-day.png'})`,
        }}
      />
      
      {/* Overlay para mejorar legibilidad */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-700',
          isDark ? 'bg-black/30' : 'bg-white/20'
        )}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium',
                isDark
                  ? 'bg-night-primary/20 text-night-primary'
                  : 'bg-day-primary/20 text-day-primary'
              )}
            >
              <Leaf className="w-4 h-4" />
              software engineer
            </motion.div>

            {/* Name */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className={cn(
                  'text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none',
                  isDark ? 'text-night-text' : 'text-day-text'
                )}
              >
                Javier
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className={cn(
                  'text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none',
                  isDark ? 'text-night-primary' : 'text-day-primary'
                )}
              >
                Gomez
              </motion.h1>
            </div>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={cn(
                'w-32 h-1 rounded-full origin-left',
                isDark ? 'bg-night-primary' : 'bg-day-primary'
              )}
            />

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap items-center gap-3 text-sm"
            >
              <span className={cn(
                'flex items-center gap-1',
                isDark ? 'text-night-text' : 'text-day-text'
              )}>
                <Leaf className="w-4 h-4 text-day-primary" />
                Software Engineer
              </span>
              <span className={isDark ? 'text-night-text/50' : 'text-day-text/50'}>|</span>
              <span className={cn(
                'flex items-center gap-1',
                isDark ? 'text-night-text' : 'text-day-text'
              )}>
                <Cloud className="w-4 h-4 text-day-primary" />
                Microservices
              </span>
              <span className={isDark ? 'text-night-text/50' : 'text-day-text/50'}>•</span>
              <span className={cn(
                'flex items-center gap-1',
                isDark ? 'text-night-text' : 'text-day-text'
              )}>
                <Sparkles className="w-4 h-4 text-day-primary" />
                AI
              </span>
              <span className={isDark ? 'text-night-text/50' : 'text-day-text/50'}>•</span>
              <span className={cn(
                'flex items-center gap-1',
                isDark ? 'text-night-text' : 'text-day-text'
              )}>
                <Circle className="w-4 h-4 text-day-primary" />
                MCP
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className={cn(
                'text-lg max-w-md leading-relaxed',
                isDark ? 'text-night-text/80' : 'text-day-text/80'
              )}
            >
              Construyendo soluciones modernas con código limpio
              y sistemas inteligentes.
            </motion.p>

            {/* Contact buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="mailto:javialex2008@gmail.com"
                className={cn(
                  'flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300',
                  isDark
                    ? 'glass-night hover:bg-night-primary/30'
                    : 'glass-day hover:bg-day-primary/30'
                )}
              >
                <div className={cn(
                  'p-2 rounded-lg',
                  isDark ? 'bg-night-primary/20' : 'bg-day-primary/20'
                )}>
                  <Mail className="w-5 h-5 text-day-primary" />
                </div>
                <div className="text-left">
                  <div className={cn(
                    'text-xs uppercase tracking-wide font-semibold',
                    isDark ? 'text-night-text/60' : 'text-day-text/60'
                  )}>Email</div>
                  <div className={cn(
                    'text-sm font-medium',
                    isDark ? 'text-night-text' : 'text-day-text'
                  )}>javialex2008@gmail.com</div>
                </div>
              </a>

              <a
                href="https://github.com/jajavier2404"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300',
                  isDark
                    ? 'glass-night hover:bg-night-primary/30'
                    : 'glass-day hover:bg-day-primary/30'
                )}
              >
                <div className={cn(
                  'p-2 rounded-lg',
                  isDark ? 'bg-night-primary/20' : 'bg-day-primary/20'
                )}>
                  <GitHubIcon className="w-5 h-5 text-day-primary" />
                </div>
                <div className="text-left">
                  <div className={cn(
                    'text-xs uppercase tracking-wide font-semibold',
                    isDark ? 'text-night-text/60' : 'text-day-text/60'
                  )}>GitHub</div>
                  <div className={cn(
                    'text-sm font-medium',
                    isDark ? 'text-night-text' : 'text-day-text'
                  )}>jajavier2404</div>
                </div>
              </a>
            </motion.div>
          </motion.div>

          {/* Right content - Hero image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              <img
                src={isDark ? '/images/hero-night.png' : '/images/hero-day.png'}
                alt="Javier Gomez"
                className="w-full max-w-lg mx-auto drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
