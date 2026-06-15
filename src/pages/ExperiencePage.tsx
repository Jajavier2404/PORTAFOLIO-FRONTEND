import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  ArrowLeft,
  ChevronDown,
  Award,
  Code2,
  Server,
  Monitor,
  Database,
  Bot,
  Wrench
} from 'lucide-react';
import { Link } from 'react-router-dom';

const experienceData = [
  {
    id: 1,
    role: 'Software Engineer',
    company: 'Freelance',
    location: 'Remoto',
    period: '2023 - Presente',
    type: 'work',
    description:
      'Desarrollo de aplicaciones web modernas utilizando React, Node.js y arquitecturas limpias. Implementación de microservicios e integración con APIs de inteligencia artificial.',
    achievements: [
      'Arquitectura de microservicios con Node.js y Docker',
      'Integración de modelos de IA en aplicaciones web',
      'Desarrollo de APIs RESTful escalables',
      'Implementación de CI/CD con GitHub Actions'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Python', 'Docker', 'PostgreSQL']
  },
  {
    id: 2,
    role: 'Desarrollador Web',
    company: 'Proyectos Personales',
    location: 'Remoto',
    period: '2022 - 2023',
    type: 'work',
    description:
      'Creación de proyectos full-stack explorando tecnologías modernas. Desarrollo de APIs RESTful, integración con bases de datos y despliegue en la nube.',
    achievements: [
      'Desarrollo de plataforma E2E con React + Node',
      'Integración de pasarela de pagos con Stripe',
      'Despliegue en AWS con escalado automático',
      'Optimización de rendimiento y SEO'
    ],
    technologies: ['React', 'Express', 'MongoDB', 'AWS', 'Git', 'TailwindCSS']
  }
];

const educationData = [
  {
    id: 1,
    degree: 'Ingeniería de Software',
    institution: 'Universidad',
    period: '2021 - Presente',
    type: 'education',
    description:
      'Formación en ingeniería de software con enfoque en arquitectura, patrones de diseño y desarrollo ágil.'
  }
];

interface TechSection {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: string[];
}

const techStackData: TechSection[] = [
  { title: 'Languages', icon: Code2, items: ['Python', 'Java', 'C#', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3'] },
  { title: 'Backend & Architecture', icon: Server, items: ['NestJS', 'Node.js', 'Express', 'gRPC'] },
  { title: 'Frontend', icon: Monitor, items: ['React', 'Next.js', 'React Native', 'Tailwind CSS'] },
  { title: 'Data & Infrastructure', icon: Database, items: ['PostgreSQL', 'Redis', 'Prisma', 'MySQL', 'Docker', 'GitHub Actions'] },
  { title: 'AI & MCP', icon: Bot, items: ['OpenAI API', 'Anthropic API', 'MCP Orchestration'] },
  { title: 'Tools & Platforms', icon: Wrench, items: ['Amazon AWS', 'Parrot OS', 'Git', 'Arduino', 'XAMPP'] }
];

const statsData = [
  { label: 'Años de experiencia', value: '3+' },
  { label: 'Proyectos completados', value: '10+' },
  { label: 'Tecnologías dominadas', value: '15+' },
  { label: 'Certificaciones', value: '5' }
];

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 + i * 0.08 }
  })
};

export function ExperiencePage() {
  const { isDark } = useTheme();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPageLoaded(true), 100);
    return () => {
      clearTimeout(t1);
    };
  }, []);

  const toggleCard = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className={cn(
        'min-h-screen pt-20 pb-16 transition-colors duration-500',
        isDark ? 'bg-night-bg' : 'bg-day-bg'
      )}
    >
      {/* Subtle geometric overlay */}
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16">
        {/* ── Volver al inicio ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/"
            className={cn(
              'inline-flex items-center gap-2 text-sm font-medium transition-colors',
              isDark
                ? 'text-night-text/70 hover:text-night-primary'
                : 'text-day-text/70 hover:text-day-primary'
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </motion.div>

        {/* ── HEADER: Name + Stats ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          {/* Left – name / title / description */}
          <motion.div
            custom={0}
            variants={staggerItem}
            initial="hidden"
            animate={pageLoaded ? 'visible' : 'hidden'}
            className="lg:col-span-3"
          >
            <h1
              className={cn(
                'text-6xl sm:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-4',
                isDark ? 'text-night-text' : 'text-day-text'
              )}
            >
              JAVIER
              <br />
              <span className="text-day-primary">GOMEZ</span>
            </h1>
            <h2
              className={cn(
                'text-xl sm:text-2xl font-semibold mb-4',
                isDark ? 'text-night-text/80' : 'text-day-text/80'
              )}
            >
              Software Engineer
            </h2>
            <p
              className={cn(
                'text-base leading-relaxed max-w-xl',
                isDark ? 'text-night-text/60' : 'text-day-text/60'
              )}
            >
              Ingeniero de software apasionado por la arquitectura limpia, el
              desarrollo full-stack y la creación de experiencias digitales
              excepcionales. Enfocado en escribir código mantenible y escalable.
            </p>
          </motion.div>

          {/* Right – stat cards 2×2 */}
          <motion.div
            custom={1}
            variants={staggerItem}
            initial="hidden"
            animate={pageLoaded ? 'visible' : 'hidden'}
            className="lg:col-span-2 grid grid-cols-2 gap-3 self-center"
          >
            {statsData.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className={cn(
                  'p-4 rounded-xl text-center transition-colors',
                  isDark ? 'glass-night' : 'glass-day'
                )}
              >
                <div className="text-3xl sm:text-4xl font-bold text-day-primary mb-1">
                  {stat.value}
                </div>
                <div
                  className={cn(
                    'text-xs sm:text-sm font-medium',
                    isDark ? 'text-night-text/60' : 'text-day-text/60'
                  )}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── EXPERIENCE (accordion) ── */}
        <motion.div
          custom={2}
          variants={staggerItem}
          initial="hidden"
          animate={pageLoaded ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <h3
            className={cn(
              'text-sm uppercase tracking-widest font-semibold mb-6',
              isDark ? 'text-night-text/50' : 'text-day-text/50'
            )}
          >
            Experiencia
          </h3>

          <div className="space-y-4">
            {experienceData.map((exp) => (
              <motion.div
                key={exp.id}
                layout
                className={cn(
                  'rounded-2xl overflow-hidden transition-colors cursor-pointer',
                  isDark ? 'glass-night' : 'glass-day'
                )}
                onClick={() => toggleCard(exp.id)}
              >
                {/* Collapsed header – always visible */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div
                        className={cn(
                          'p-3 rounded-xl shrink-0',
                          isDark ? 'bg-night-primary/20' : 'bg-day-primary/20'
                        )}
                      >
                        <Briefcase className="w-5 h-5 text-day-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className={cn(
                            'text-lg font-bold truncate',
                            isDark ? 'text-night-text' : 'text-day-text'
                          )}
                        >
                          {exp.role}
                        </h4>
                        <div
                          className={cn(
                            'flex flex-wrap items-center gap-x-4 gap-y-1 text-sm mt-1',
                            isDark ? 'text-night-text/60' : 'text-day-text/60'
                          )}
                        >
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-3.5 h-3.5" />
                            {exp.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {exp.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {exp.period}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Chevron – rotates on expand */}
                    <motion.div
                      animate={{ rotate: expandedId === exp.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        'p-1.5 rounded-lg shrink-0 self-start',
                        isDark
                          ? 'bg-night-primary/10 text-night-primary'
                          : 'bg-day-primary/10 text-day-primary'
                      )}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </div>

                  <p
                    className={cn(
                      'mt-3 text-sm leading-relaxed',
                      isDark ? 'text-night-text/70' : 'text-day-text/70'
                    )}
                  >
                    {exp.description}
                  </p>

                  {expandedId !== exp.id && (
                    <div className="mt-3">
                      <span
                        className={cn(
                          'text-xs font-medium',
                          isDark ? 'text-night-primary' : 'text-day-primary'
                        )}
                      >
                        Ver más →
                      </span>
                    </div>
                  )}
                </div>

                {/* Expanded content – animated reveal */}
                <AnimatePresence initial={false}>
                  {expandedId === exp.id && (
                    <motion.div
                      key="expanded"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div
                        className={cn(
                          'px-6 pb-6 pt-0 border-t',
                          isDark ? 'border-night-border' : 'border-day-border'
                        )}
                      >
                        {/* Achievements */}
                        <div className="mt-4">
                          <h5
                            className={cn(
                              'text-xs uppercase tracking-wider font-semibold mb-3',
                              isDark ? 'text-night-text/50' : 'text-day-text/50'
                            )}
                          >
                            <span className="flex items-center gap-1.5">
                              <Award className="w-3.5 h-3.5 text-day-primary" />
                              Logros
                            </span>
                          </h5>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={cn(
                                  'flex items-start gap-2 text-sm',
                                  isDark
                                    ? 'text-night-text/70'
                                    : 'text-day-text/70'
                                )}
                              >
                                <span className="text-day-primary mt-0.5 shrink-0">
                                  ▸
                                </span>
                                {achievement}
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div className="mt-4">
                          <h5
                            className={cn(
                              'text-xs uppercase tracking-wider font-semibold mb-3',
                              isDark ? 'text-night-text/50' : 'text-day-text/50'
                            )}
                          >
                            Tecnologías
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className={cn(
                                  'px-3 py-1 rounded-lg text-xs font-medium',
                                  isDark
                                    ? 'bg-night-primary/20 text-night-primary'
                                    : 'bg-day-primary/20 text-day-primary'
                                )}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── SKILLS + EDUCATION (2 columns) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ── SKILLS — icon grid ── */}
          <motion.div
            custom={3}
            variants={staggerItem}
            initial="hidden"
            animate={pageLoaded ? 'visible' : 'hidden'}
            className="lg:col-span-3"
          >
            <h3
              className={cn(
                'text-sm uppercase tracking-widest font-semibold mb-6',
                isDark ? 'text-night-text/50' : 'text-day-text/50'
              )}
            >
              Habilidades
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {techStackData.map((section, sectionIndex) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + sectionIndex * 0.06 }}
                    className={cn(
                      'p-5 rounded-xl border transition-all duration-300',
                      isDark
                        ? 'bg-night-card/60 border-night-border/40 hover:border-night-primary/30'
                        : 'bg-day-card/70 border-day-border/40 hover:border-day-primary/30'
                    )}
                  >
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className={cn(
                        'p-1.5 rounded-lg',
                        isDark ? 'bg-night-primary/10' : 'bg-day-primary/10'
                      )}>
                        <Icon className="w-4 h-4 text-day-primary" />
                      </div>
                      <h5 className={cn(
                        'text-xs uppercase tracking-[0.18em] font-bold',
                        isDark ? 'text-night-text/70' : 'text-day-text/70'
                      )}>
                        {section.title}
                      </h5>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {section.items.map((item) => (
                        <span
                          key={item}
                          className={cn(
                            'px-3 py-1.5 rounded-lg text-sm font-medium',
                            isDark
                              ? 'bg-night-primary/8 text-night-text/85'
                              : 'bg-day-primary/8 text-day-text/85'
                          )}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Education — right column */}
          <motion.div
            custom={4}
            variants={staggerItem}
            initial="hidden"
            animate={pageLoaded ? 'visible' : 'hidden'}
            className="lg:col-span-2"
          >
            <h3
              className={cn(
                'text-sm uppercase tracking-widest font-semibold mb-6',
                isDark ? 'text-night-text/50' : 'text-day-text/50'
              )}
            >
              Educación
            </h3>

            {educationData.map((edu) => (
              <div
                key={edu.id}
                className={cn(
                  'p-6 rounded-2xl transition-colors',
                  isDark ? 'glass-night' : 'glass-day'
                )}
              >
                <div
                  className={cn(
                    'p-3 rounded-xl inline-flex mb-4',
                    isDark ? 'bg-night-primary/20' : 'bg-day-primary/20'
                  )}
                >
                  <GraduationCap className="w-6 h-6 text-day-primary" />
                </div>
                <h4
                  className={cn(
                    'text-lg font-bold mb-1',
                    isDark ? 'text-night-text' : 'text-day-text'
                  )}
                >
                  {edu.degree}
                </h4>
                <div
                  className={cn(
                    'flex items-center gap-2 text-sm mb-3',
                    isDark ? 'text-night-text/60' : 'text-day-text/60'
                  )}
                >
                  <span>{edu.institution}</span>
                  <span className="text-day-primary">•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {edu.period}
                  </span>
                </div>
                <p
                  className={cn(
                    'text-sm leading-relaxed',
                    isDark ? 'text-night-text/70' : 'text-day-text/70'
                  )}
                >
                  {edu.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
