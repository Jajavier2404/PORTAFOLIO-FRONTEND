import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';
import { ExternalLink, Folder } from 'lucide-react';

// Icono de GitHub como SVG
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

const projects = [
  {
    title: 'Sistema de Gestión con IA',
    description: 'Plataforma de gestión empresarial integrada con modelos de lenguaje para automatización de tareas y análisis de datos.',
    image: '/images/bg-day.png',
    technologies: ['React', 'Node.js', 'OpenAI', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/jajavier2404',
    liveUrl: '#',
    featured: true
  },
  {
    title: 'API de Microservicios',
    description: 'Arquitectura de microservicios escalable con comunicación asíncrona, balanceo de carga y monitoreo en tiempo real.',
    image: '/images/bg-night.png',
    technologies: ['Node.js', 'Express', 'Redis', 'RabbitMQ', 'Kubernetes'],
    githubUrl: 'https://github.com/jajavier2404',
    liveUrl: '#',
    featured: true
  },
  {
    title: 'Chatbot Inteligente',
    description: 'Asistente virtual con procesamiento de lenguaje natural, memoria conversacional y personalización de respuestas.',
    image: '/images/bg-day.png',
    technologies: ['Python', 'FastAPI', 'HuggingFace', 'MongoDB', 'React'],
    githubUrl: 'https://github.com/jajavier2404',
    liveUrl: '#',
    featured: false
  },
  {
    title: 'Dashboard Analytics',
    description: 'Panel de visualización de datos con gráficos interactivos, filtros dinámicos y exportación de reportes.',
    image: '/images/bg-night.png',
    technologies: ['React', 'D3.js', 'TypeScript', 'TailwindCSS'],
    githubUrl: 'https://github.com/jajavier2404',
    liveUrl: '#',
    featured: false
  }
];

export function Projects() {
  const { isDark } = useTheme();

  return (
    <section
      id="proyectos"
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
            Mis <span className="text-day-primary">Proyectos</span>
          </h2>
          <p className={cn(
            'text-lg max-w-2xl mx-auto',
            isDark ? 'text-night-text/70' : 'text-day-text/70'
          )}>
            Algunos de los proyectos en los que he trabajado
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn(
                'group relative rounded-2xl overflow-hidden transition-all duration-300',
                isDark ? 'glass-night' : 'glass-day'
              )}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={cn(
                  'absolute inset-0 transition-opacity duration-300',
                  isDark ? 'bg-gradient-to-t from-night-bg to-transparent' : 'bg-gradient-to-t from-day-bg to-transparent'
                )} />
                
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <span className={cn(
                      'px-3 py-1 rounded-full text-xs font-bold',
                      isDark
                        ? 'bg-day-primary text-night-bg'
                        : 'bg-day-primary text-white'
                    )}>
                      Destacado
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Folder className="w-5 h-5 text-day-primary" />
                    <h3 className={cn(
                      'text-xl font-bold',
                      isDark ? 'text-night-text' : 'text-day-text'
                    )}>
                      {project.title}
                    </h3>
                  </div>
                </div>

                <p className={cn(
                  'mb-4 leading-relaxed',
                  isDark ? 'text-night-text/80' : 'text-day-text/80'
                )}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
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

                <div className="flex gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      isDark
                        ? 'bg-night-primary/20 text-night-text hover:bg-night-primary/30'
                        : 'bg-day-primary/20 text-day-text hover:bg-day-primary/30'
                    )}
                  >
                    <GitHubIcon className="w-4 h-4" />
                    Código
                  </a>
                  <a
                    href={project.liveUrl}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      isDark
                        ? 'bg-day-primary text-night-bg hover:bg-night-accent'
                        : 'bg-day-primary text-white hover:bg-day-accent'
                    )}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Ver demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
