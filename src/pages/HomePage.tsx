import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';
import { User, Layout, Layers, Cpu } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Experience } from '../components/Experience';
import { Projects } from '../components/Projects';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

const skills = [
  {
    icon: Layout,
    title: 'Clean Architecture',
    description: 'Código mantenible, modular y escalable con patrones sólidos.'
  },
  {
    icon: Layers,
    title: 'Full-Stack',
    description: 'Del frontend al backend con tecnologías modernas y eficientes.'
  },
  {
    icon: Cpu,
    title: 'AI & MCP',
    description: 'Integración de modelos de IA y sistemas multi-agente.'
  }
];

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
          className="text-center"
        >
          {/* Badge */}
          <div
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4',
              isDark
                ? 'bg-night-primary/20 text-night-primary'
                : 'bg-day-primary/15 text-day-primary'
            )}
          >
            <User className="w-4 h-4" />
            Ingeniero de Software
          </div>

          {/* Title */}
          <h2
            className={cn(
              'text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6',
              isDark ? 'text-night-text' : 'text-day-text'
            )}
          >
            Sobre mí
          </h2>

          {/* Description */}
          <p
            className={cn(
              'text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10',
              isDark ? 'text-night-text/80' : 'text-day-text/80'
            )}
          >
            Ingeniero de software apasionado por la arquitectura limpia y las soluciones
            que realmente importan. Me muevo entre el frontend y el backend con la misma
            comodidad, buscando siempre el balance entre lo que funciona hoy y lo que escala mañana.
          </p>

          {/* 3 characteristics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                className={cn(
                  'p-5 rounded-xl border text-left transition-all duration-300',
                  isDark
                    ? 'bg-night-card/60 border-night-border/40 hover:border-night-primary/40'
                    : 'bg-day-card/80 border-day-border/40 hover:border-day-primary/40'
                )}
              >
                <skill.icon
                  className={cn(
                    'w-5 h-5 mb-3',
                    isDark ? 'text-night-primary' : 'text-day-primary'
                  )}
                />
                <h3
                  className={cn(
                    'text-sm font-bold mb-1.5',
                    isDark ? 'text-night-text' : 'text-day-text'
                  )}
                >
                  {skill.title}
                </h3>
                <p
                  className={cn(
                    'text-xs leading-relaxed',
                    isDark ? 'text-night-text/60' : 'text-day-text/60'
                  )}
                >
                  {skill.description}
                </p>
              </motion.div>
            ))}
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
