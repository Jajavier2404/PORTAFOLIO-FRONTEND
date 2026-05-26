import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function Contact() {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulación de envío - en producción conectar con backend
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simular éxito
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section
      id="contacto"
      className={cn(
        'py-24 transition-colors duration-500',
        isDark ? 'bg-night-bg' : 'bg-day-bg'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={cn(
            'text-4xl font-bold mb-4',
            isDark ? 'text-night-text' : 'text-day-text'
          )}>
            Contacto
          </h2>
          <p className={cn(
            'text-lg max-w-2xl mx-auto',
            isDark ? 'text-night-text/70' : 'text-day-text/70'
          )}>
            ¿Tienes un proyecto en mente? ¡Hablemos!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className={cn(
              'p-8 rounded-2xl',
              isDark ? 'glass-night' : 'glass-day'
            )}>
              <h3 className={cn(
                'text-2xl font-bold mb-6',
                isDark ? 'text-night-text' : 'text-day-text'
              )}>
                Información de contacto
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'p-3 rounded-xl',
                    isDark ? 'bg-night-primary/20' : 'bg-day-primary/20'
                  )}>
                    <Mail className="w-6 h-6 text-day-primary" />
                  </div>
                  <div>
                    <p className={cn(
                      'text-sm font-medium',
                      isDark ? 'text-night-text/60' : 'text-day-text/60'
                    )}>Email</p>
                    <a
                      href="mailto:javialex2008@gmail.com"
                      className={cn(
                        'text-lg font-semibold hover:underline',
                        isDark ? 'text-night-text' : 'text-day-text'
                      )}
                    >
                      javialex2008@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={cn(
                    'p-3 rounded-xl',
                    isDark ? 'bg-night-primary/20' : 'bg-day-primary/20'
                  )}>
                    <User className="w-6 h-6 text-day-primary" />
                  </div>
                  <div>
                    <p className={cn(
                      'text-sm font-medium',
                      isDark ? 'text-night-text/60' : 'text-day-text/60'
                    )}>Nombre</p>
                    <p className={cn(
                      'text-lg font-semibold',
                      isDark ? 'text-night-text' : 'text-day-text'
                    )}>
                      Javier Gomez
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={cn(
              'p-8 rounded-2xl',
              isDark ? 'glass-night' : 'glass-day'
            )}>
              <h3 className={cn(
                'text-xl font-bold mb-4',
                isDark ? 'text-night-text' : 'text-day-text'
              )}>
                ¿Por qué trabajar conmigo?
              </h3>
              <ul className={cn(
                'space-y-3',
                isDark ? 'text-night-text/80' : 'text-day-text/80'
              )}>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-day-primary shrink-0 mt-0.5" />
                  Código limpio y bien estructurado
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-day-primary shrink-0 mt-0.5" />
                  Comunicación clara y constante
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-day-primary shrink-0 mt-0.5" />
                  Enfoque en soluciones escalables
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-day-primary shrink-0 mt-0.5" />
                  Pasión por aprender y mejorar
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className={cn(
                'p-8 rounded-2xl space-y-6',
                isDark ? 'glass-night' : 'glass-day'
              )}
            >
              <div>
                <label
                  htmlFor="name"
                  className={cn(
                    'block text-sm font-medium mb-2',
                    isDark ? 'text-night-text' : 'text-day-text'
                  )}
                >
                  Nombre
                </label>
                <div className="relative">
                  <User className={cn(
                    'absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5',
                    isDark ? 'text-night-text/40' : 'text-day-text/40'
                  )} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre"
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@email.com"
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
                  htmlFor="message"
                  className={cn(
                    'block text-sm font-medium mb-2',
                    isDark ? 'text-night-text' : 'text-day-text'
                  )}
                >
                  Mensaje
                </label>
                <div className="relative">
                  <MessageSquare className={cn(
                    'absolute left-3 top-3 w-5 h-5',
                    isDark ? 'text-night-text/40' : 'text-day-text/40'
                  )} />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="¿En qué puedo ayudarte?"
                    className={cn(
                      'w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none resize-none',
                      isDark
                        ? 'bg-night-bg/50 border-night-border text-night-text placeholder:text-night-text/40 focus:border-night-primary'
                        : 'bg-day-bg/50 border-day-border text-day-text placeholder:text-day-text/40 focus:border-day-primary'
                    )}
                  />
                </div>
              </div>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 rounded-xl bg-green-500/20 text-green-600 dark:text-green-400"
                >
                  <CheckCircle className="w-5 h-5" />
                  ¡Mensaje enviado con éxito! Te responderé pronto.
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 rounded-xl bg-red-500/20 text-red-600 dark:text-red-400"
                >
                  <AlertCircle className="w-5 h-5" />
                  Hubo un error al enviar el mensaje. Intenta de nuevo.
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
                  isDark
                    ? 'bg-day-primary text-night-bg hover:bg-night-accent'
                    : 'bg-day-primary text-white hover:bg-day-accent'
                )}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar mensaje
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
