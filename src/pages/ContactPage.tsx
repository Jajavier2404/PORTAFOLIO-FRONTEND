import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';
import { Mail, FileText, ArrowRight, CheckCircle, Loader2, AlertCircle, Clock, MapPin, Briefcase } from 'lucide-react';

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function ContactPage() {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const channels = [
    {
      icon: Mail,
      label: 'Email',
      desc: 'Enviar',
      href: 'mailto:javialex2008@gmail.com',
      external: true,
    },
    {
      icon: GitHubIcon,
      label: 'GitHub',
      desc: 'Seguir',
      href: 'https://github.com/jajavier2404',
      external: true,
    },
    {
      icon: LinkedInIcon,
      label: 'LinkedIn',
      desc: 'Conectar',
      href: '#',
      external: true,
    },
    {
      icon: FileText,
      label: 'CV',
      desc: 'Ver',
      href: '#',
      external: false,
    },
  ];

  return (
    <div
      className={cn(
        'min-h-screen pt-20 transition-colors duration-500 relative overflow-hidden',
        isDark ? 'bg-night-bg' : 'bg-day-bg'
      )}
    >
      {/* Subtle radial gradient overlay */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at center, rgba(59,130,246,0.06) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at center, rgba(59,130,246,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Geometric pattern overlay */}
      <div
        className={cn(
          'fixed inset-0 pointer-events-none opacity-[0.03]',
          isDark ? 'opacity-[0.04]' : ''
        )}
        style={{
          backgroundImage: `
            linear-gradient(30deg, var(--color-day-primary) 12%, transparent 12.5%,
            transparent 87%, var(--color-day-primary) 87.5%),
            linear-gradient(150deg, var(--color-day-primary) 12%, transparent 12.5%,
            transparent 87%, var(--color-day-primary) 87.5%),
            linear-gradient(30deg, var(--color-day-primary) 12%, transparent 12.5%,
            transparent 87%, var(--color-day-primary) 87.5%),
            linear-gradient(150deg, var(--color-day-primary) 12%, transparent 12.5%,
            transparent 87%, var(--color-day-primary) 87.5%),
            linear-gradient(60deg, var(--color-day-primary) 25%, transparent 25.5%,
            transparent 75%, var(--color-day-primary) 75%)
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0'
        }}
      />

      <div className="min-h-[calc(100vh-5rem)] pt-8 lg:pt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1
            className={cn(
              'text-6xl sm:text-7xl font-bold mb-4 tracking-tight',
              isDark ? 'text-night-text' : 'text-day-text'
            )}
          >
            Hablemos
          </h1>

          <p
            className={cn(
              'text-lg sm:text-xl max-w-xl mx-auto mb-8 leading-relaxed',
              isDark ? 'text-night-text/70' : 'text-day-text/70'
            )}
          >
            ¿Tenés un proyecto, idea o simplemente querés charlar? Estoy abierto a
            oportunidades interesantes.
          </p>

          {/* Availability badge */}
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span
              className={cn(
                'text-sm font-medium',
                isDark ? 'text-night-text/60' : 'text-day-text/60'
              )}
            >
              Disponible para proyectos freelance
            </span>
          </div>
        </motion.div>

        {/* Two-column: Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-6"
          >
            <h3 className={cn(
              'text-xl font-semibold text-center lg:text-left',
              isDark ? 'text-night-text' : 'text-day-text'
            )}>
              O escribime directo
            </h3>

            {/* Channels Grid - 2x2 */}
            <div className="grid grid-cols-2 gap-4">
              {channels.map((channel) => (
                <motion.a
                  key={channel.label}
                  href={channel.href}
                  target={channel.external ? '_blank' : undefined}
                  rel={channel.external ? 'noopener noreferrer' : undefined}
                  className={cn(
                    'group flex flex-col items-center gap-2 p-5 rounded-2xl transition-all duration-300',
                    'hover:-translate-y-1 cursor-pointer',
                    isDark
                      ? 'glass-night hover:bg-night-primary/10'
                      : 'glass-day hover:bg-day-primary/5'
                  )}
                >
                  <channel.icon
                    className={cn(
                      'w-8 h-8 transition-colors duration-300',
                      isDark
                        ? 'text-night-text/80 group-hover:text-night-primary'
                        : 'text-day-text/80 group-hover:text-day-primary'
                    )}
                  />
                  <span className={cn(
                    'font-semibold text-sm',
                    isDark ? 'text-night-text' : 'text-day-text'
                  )}>
                    {channel.label}
                  </span>
                  <span className={cn(
                    'text-xs transition-colors duration-300',
                    isDark
                      ? 'text-night-text/50 group-hover:text-night-primary'
                      : 'text-day-text/50 group-hover:text-day-primary'
                  )}>
                    {channel.desc} →
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Info badges */}
            <div className={cn(
              'p-4 rounded-xl border-2',
              isDark
                ? 'bg-night-card border-night-border/60'
                : 'bg-day-card border-day-border/60'
            )}>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-day-primary shrink-0" />
                  <span className={cn('text-sm', isDark ? 'text-night-text/60' : 'text-day-text/60')}>
                    Respondo en menos de 24hs
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-day-primary shrink-0" />
                  <span className={cn('text-sm', isDark ? 'text-night-text/60' : 'text-day-text/60')}>
                    Colombia · GMT-5
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-day-primary shrink-0" />
                  <span className={cn('text-sm', isDark ? 'text-night-text/60' : 'text-day-text/60')}>
                    Freelance · Remoto
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className={cn(
                    'block text-sm font-medium mb-2',
                    isDark ? 'text-night-text/80' : 'text-day-text/80'
                  )}
                >
                  Tu nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="¿Cómo te llamás?"
                  className={cn(
                    'w-full px-4 py-3 rounded-xl border-2 outline-none transition-all duration-300',
                    isDark
                      ? 'bg-night-bg/50 border-night-border text-night-text placeholder:text-night-text/40 focus:border-night-primary'
                      : 'bg-day-bg/50 border-day-border text-day-text placeholder:text-day-text/40 focus:border-day-primary'
                  )}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className={cn(
                    'block text-sm font-medium mb-2',
                    isDark ? 'text-night-text/80' : 'text-day-text/80'
                  )}
                >
                  Tu email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                  className={cn(
                    'w-full px-4 py-3 rounded-xl border-2 outline-none transition-all duration-300',
                    isDark
                      ? 'bg-night-bg/50 border-night-border text-night-text placeholder:text-night-text/40 focus:border-night-primary'
                      : 'bg-day-bg/50 border-day-border text-day-text placeholder:text-day-text/40 focus:border-day-primary'
                  )}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={cn(
                    'block text-sm font-medium mb-2',
                    isDark ? 'text-night-text/80' : 'text-day-text/80'
                  )}
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Contame sobre tu proyecto..."
                  className={cn(
                    'w-full px-4 py-3 rounded-xl border-2 outline-none transition-all duration-300 resize-none',
                    isDark
                      ? 'bg-night-bg/50 border-night-border text-night-text placeholder:text-night-text/40 focus:border-night-primary'
                      : 'bg-day-bg/50 border-day-border text-day-text placeholder:text-day-text/40 focus:border-day-primary'
                  )}
                />
              </div>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 text-sm"
                >
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  ¡Mensaje enviado con éxito! Te responderé pronto.
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 text-sm"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  Hubo un error al enviar el mensaje. Intenta de nuevo.
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-base transition-all duration-300',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  isDark
                    ? 'bg-day-primary text-night-bg hover:bg-night-accent'
                    : 'bg-day-primary text-white hover:bg-day-accent'
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar mensaje
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      </div>
    </div>
  );
}
