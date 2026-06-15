import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';
import { Code2, Sparkles } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Experience } from '../components/Experience';
import { Projects } from '../components/Projects';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

function AboutMe() {
  const { isDark } = useTheme();

  return (
    <section
      className={cn(
        'py-16 md:py-20 transition-colors duration-500',
        isDark ? 'bg-night-bg' : 'bg-day-bg'
      )}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className={cn(
            'relative p-8 md:p-10 rounded-2xl overflow-hidden',
            isDark ? 'glass-night' : 'glass-day'
          )}
        >
          {/* decorative accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-day-primary/60 via-day-primary to-day-primary/60" />

          <div className="flex items-start gap-4 md:gap-6">
            <div className={cn(
              'p-3 rounded-xl shrink-0 hidden sm:block',
              isDark ? 'bg-night-primary/15' : 'bg-day-primary/15'
            )}>
              <Code2 className="w-6 h-6 text-day-primary" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h2 className={cn(
                  'text-xl md:text-2xl font-bold',
                  isDark ? 'text-night-text' : 'text-day-text'
                )}>
                  Sobre mí
                </h2>
                <Sparkles className="w-4 h-4 text-day-primary" />
              </div>
              <p className={cn(
                'text-sm md:text-base leading-relaxed max-w-2xl',
                isDark ? 'text-night-text/75' : 'text-day-text/75'
              )}>
                Ingeniero de software apasionado por la arquitectura limpia, el código mantenible
                y las soluciones que realmente importan. Me muevo entre el frontend y el backend
                con la misma comodidad, siempre buscando el balance entre lo que funciona hoy
                y lo que escala mañana.
              </p>
              <p className={cn(
                'text-sm md:text-base leading-relaxed',
                isDark ? 'text-night-text/60' : 'text-day-text/60'
              )}>
                Actualmente explorando el ecosistema MCP, microservicios con Node.js y
                sistemas multi-idioma. Creo firmemente que el buen software se construye
                con fundamentos sólidos, no con atajos.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <AboutMe />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
