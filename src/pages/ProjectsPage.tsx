import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

const allProjects = [
  {
    id: 1,
    title: 'Sistema de Gestión con IA',
    description: 'Plataforma de gestión empresarial integrada con modelos de lenguaje para automatización de tareas y análisis de datos.',
    image: '/images/bg-day.png',
    technologies: ['React', 'Node.js', 'OpenAI', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/jajavier2404',
    liveUrl: '#',
    category: 'Full Stack',
    year: '2024'
  },
  {
    id: 2,
    title: 'API de Microservicios',
    description: 'Arquitectura de microservicios escalable con comunicación asíncrona, monitoreo en tiempo real y balanceo de carga.',
    image: '/images/bg-night.png',
    technologies: ['Node.js', 'Express', 'Redis', 'RabbitMQ', 'Kubernetes'],
    githubUrl: 'https://github.com/jajavier2404',
    liveUrl: '#',
    category: 'Backend',
    year: '2024'
  },
  {
    id: 3,
    title: 'Chatbot Inteligente',
    description: 'Asistente virtual con procesamiento de lenguaje natural, memoria conversacional y integración multiplataforma.',
    image: '/images/bg-day.png',
    technologies: ['Python', 'FastAPI', 'HuggingFace', 'React', 'WebSocket'],
    githubUrl: 'https://github.com/jajavier2404',
    liveUrl: '#',
    category: 'IA',
    year: '2024'
  },
  {
    id: 4,
    title: 'Dashboard Analytics',
    description: 'Panel de visualización de datos con gráficos interactivos, filtros dinámicos y exportación de reportes.',
    image: '/images/bg-night.png',
    technologies: ['React', 'D3.js', 'TypeScript', 'TailwindCSS', 'Firebase'],
    githubUrl: 'https://github.com/jajavier2404',
    liveUrl: '#',
    category: 'Frontend',
    year: '2023'
  },
  {
    id: 5,
    title: 'E-commerce Platform',
    description: 'Plataforma de comercio electrónico con pasarela de pagos, gestión de inventario y panel de administración.',
    image: '/images/bg-day.png',
    technologies: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL', 'AWS'],
    githubUrl: 'https://github.com/jajavier2404',
    liveUrl: '#',
    category: 'Full Stack',
    year: '2023'
  },
  {
    id: 6,
    title: 'Real-time Chat App',
    description: 'Aplicación de mensajería en tiempo real con WebSockets, cifrado end-to-end y soporte para archivos multimedia.',
    image: '/images/bg-night.png',
    technologies: ['Socket.io', 'Express', 'MongoDB', 'Redis', 'React Native'],
    githubUrl: 'https://github.com/jajavier2404',
    liveUrl: '#',
    category: 'Full Stack',
    year: '2023'
  },
  {
    id: 7,
    title: 'Portfolio Personal',
    description: 'Sitio web personal con tema oscuro/claro, animaciones fluidas y chat con IA integrado.',
    image: '/images/bg-day.png',
    technologies: ['React', 'TailwindCSS', 'Framer Motion', 'HuggingFace'],
    githubUrl: 'https://github.com/jajavier2404',
    liveUrl: '#',
    category: 'Frontend',
    year: '2024'
  },
  {
    id: 8,
    title: 'Task Manager API',
    description: 'API RESTful para gestión de tareas con autenticación JWT, roles de usuario y documentación Swagger.',
    image: '/images/bg-night.png',
    technologies: ['Node.js', 'Express', 'JWT', 'MongoDB', 'Swagger'],
    githubUrl: 'https://github.com/jajavier2404',
    liveUrl: '#',
    category: 'Backend',
    year: '2023'
  }
];

const categories = ['Todos', 'Full Stack', 'Frontend', 'Backend', 'IA'];

export function ProjectsPage() {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredProjects = selectedCategory === 'Todos' 
    ? allProjects 
    : allProjects.filter(p => p.category === selectedCategory);

  return (
    <div className={cn(
      'min-h-screen pt-20 pb-16 overflow-x-hidden',
      isDark ? 'bg-night-bg' : 'bg-day-bg'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link 
            to="/"
            className={cn(
              'inline-flex items-center gap-2 mb-6 text-sm font-medium transition-colors',
              isDark ? 'text-night-text/70 hover:text-night-primary' : 'text-day-text/70 hover:text-day-primary'
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          <h1 className={cn(
            'text-4xl md:text-5xl font-bold mb-4',
            isDark ? 'text-night-text' : 'text-day-text'
          )}>
            Mis <span className="text-day-primary">Proyectos</span>
          </h1>
          
          <p className={cn(
            'text-lg max-w-2xl',
            isDark ? 'text-night-text/70' : 'text-day-text/70'
          )}>
            Una colección de proyectos en los que he trabajado, desde aplicaciones full stack hasta experimentos con inteligencia artificial.
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                selectedCategory === category
                  ? isDark
                    ? 'bg-day-primary text-night-bg'
                    : 'bg-day-primary text-white'
                  : isDark
                    ? 'bg-night-primary/20 text-night-text hover:bg-night-primary/30'
                    : 'bg-day-primary/10 text-day-text hover:bg-day-primary/20'
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Grid de proyectos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  'rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] w-full',
                  isDark ? 'glass-night' : 'glass-day'
                )}
              >
                <div className="relative h-44 sm:h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-t',
                  isDark ? 'from-night-bg' : 'from-day-bg'
                )} />
                
                <div className="absolute top-3 right-3">
                  <span className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium',
                    isDark 
                      ? 'bg-night-primary/30 text-night-primary' 
                      : 'bg-day-primary/20 text-day-primary'
                  )}>
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={cn(
                    'text-base sm:text-lg font-bold',
                    isDark ? 'text-night-text' : 'text-day-text'
                  )}>
                    {project.title}
                  </h3>
                  <span className={cn(
                    'text-xs',
                    isDark ? 'text-night-text/50' : 'text-day-text/50'
                  )}>
                    {project.year}
                  </span>
                </div>
                
                <p className={cn(
                  'text-sm mb-3 sm:mb-4 line-clamp-2',
                  isDark ? 'text-night-text/70' : 'text-day-text/70'
                )}>
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={cn(
                        'px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-medium',
                        isDark
                          ? 'bg-night-primary/20 text-night-primary'
                          : 'bg-day-primary/20 text-day-primary'
                      )}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2 sm:gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex-1 justify-center',
                      isDark
                        ? 'bg-night-primary/20 text-night-text hover:bg-night-primary/30'
                        : 'bg-day-primary/20 text-day-text hover:bg-day-primary/30'
                    )}
                  >
                    <GitHubIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Código
                  </a>
                  <a
                    href={project.liveUrl}
                    className={cn(
                      'flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex-1 justify-center',
                      isDark
                        ? 'bg-day-primary text-night-bg hover:bg-night-accent'
                        : 'bg-day-primary text-white hover:bg-day-accent'
                    )}
                  >
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
