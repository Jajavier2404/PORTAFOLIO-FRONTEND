import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    type: 'work',
    title: 'Software Engineer',
    company: 'Freelance',
    location: 'Remoto',
    period: '2023 - Presente',
    description: 'Desarrollo de aplicaciones web modernas utilizando React, Node.js y arquitecturas limpias. Implementación de microservicios y integración con APIs de inteligencia artificial.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Python', 'Docker']
  },
  {
    type: 'education',
    title: 'Ingeniería de Software',
    company: 'Universidad',
    location: 'Colombia',
    period: '2021 - Presente',
    description: 'Formación en ingeniería de software con enfoque en arquitectura de software, patrones de diseño, desarrollo ágil y sistemas distribuidos.',
    technologies: ['Java', 'Python', 'SQL', 'UML', 'Scrum']
  },
  {
    type: 'work',
    title: 'Desarrollador Web',
    company: 'Proyectos Personales',
    location: 'Remoto',
    period: '2022 - 2023',
    description: 'Creación de proyectos full-stack explorando tecnologías modernas. Desarrollo de APIs RESTful, integración con bases de datos y despliegue en la nube.',
    technologies: ['React', 'Express', 'MongoDB', 'AWS', 'Git']
  }
];

export function Experience() {
  const { isDark } = useTheme();

  return (
    <section
      id="experiencia"
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
            Experiencia <span className="text-day-primary">&amp; Educación</span>
          </h2>
          <p className={cn(
            'text-lg max-w-2xl mx-auto',
            isDark ? 'text-night-text/70' : 'text-day-text/70'
          )}>
            Mi trayectoria en el mundo del desarrollo de software
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className={cn(
            'absolute left-8 top-0 bottom-0 w-0.5 hidden md:block',
            isDark ? 'bg-night-primary/30' : 'bg-day-primary/30'
          )} />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative md:pl-20"
              >
                {/* Timeline dot */}
                <div className={cn(
                  'absolute left-6 top-6 w-4 h-4 rounded-full border-4 hidden md:block',
                  isDark
                    ? 'bg-night-bg border-night-primary'
                    : 'bg-day-bg border-day-primary'
                )} />

                <div className={cn(
                  'p-6 rounded-2xl transition-all duration-300',
                  isDark ? 'glass-night' : 'glass-day'
                )}>
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'p-3 rounded-xl shrink-0',
                      isDark ? 'bg-night-primary/20' : 'bg-day-primary/20'
                    )}>
                      {exp.type === 'work' ? (
                        <Briefcase className="w-6 h-6 text-day-primary" />
                      ) : (
                        <GraduationCap className="w-6 h-6 text-day-primary" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className={cn(
                          'text-xl font-bold',
                          isDark ? 'text-night-text' : 'text-day-text'
                        )}>
                          {exp.title}
                        </h3>
                        <span className={cn(
                          'px-3 py-1 rounded-full text-xs font-medium',
                          exp.type === 'work'
                            ? isDark
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-blue-500/10 text-blue-600'
                            : isDark
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-green-500/10 text-green-600'
                        )}>
                          {exp.type === 'work' ? 'Trabajo' : 'Educación'}
                        </span>
                      </div>

                      <div className={cn(
                        'flex flex-wrap items-center gap-4 mb-3 text-sm',
                        isDark ? 'text-night-text/70' : 'text-day-text/70'
                      )}>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {exp.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </span>
                      </div>

                      <p className={cn(
                        'mb-4 leading-relaxed',
                        isDark ? 'text-night-text/80' : 'text-day-text/80'
                      )}>
                        {exp.description}
                      </p>

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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
