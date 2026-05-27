import { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

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
    description: 'Plataforma de gestión empresarial integrada con modelos de lenguaje para automatización de tareas.',
    image: '/images/bg-day.png',
    technologies: ['React', 'Node.js', 'OpenAI', 'PostgreSQL'],
    githubUrl: 'https://github.com/jajavier2404',
    liveUrl: '#',
  },
  {
    title: 'API de Microservicios',
    description: 'Arquitectura de microservicios escalable con comunicación asíncrona y monitoreo en tiempo real.',
    image: '/images/bg-night.png',
    technologies: ['Node.js', 'Express', 'Redis', 'RabbitMQ'],
    githubUrl: 'https://github.com/jajavier2404',
    liveUrl: '#',
  },
  {
    title: 'Chatbot Inteligente',
    description: 'Asistente virtual con procesamiento de lenguaje natural y memoria conversacional.',
    image: '/images/bg-day.png',
    technologies: ['Python', 'FastAPI', 'HuggingFace', 'React'],
    githubUrl: 'https://github.com/jajavier2404',
    liveUrl: '#',
  },
  {
    title: 'Dashboard Analytics',
    description: 'Panel de visualización de datos con gráficos interactivos y filtros dinámicos.',
    image: '/images/bg-night.png',
    technologies: ['React', 'D3.js', 'TypeScript', 'TailwindCSS'],
    githubUrl: 'https://github.com/jajavier2404',
    liveUrl: '#',
  },
  {
    title: 'E-commerce Platform',
    description: 'Plataforma de comercio electrónico con pasarela de pagos y gestión de inventario.',
    image: '/images/bg-day.png',
    technologies: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
    githubUrl: 'https://github.com/jajavier2404',
    liveUrl: '#',
  },
  {
    title: 'Real-time Chat App',
    description: 'Aplicación de mensajería en tiempo real con WebSockets y cifrado end-to-end.',
    image: '/images/bg-night.png',
    technologies: ['Socket.io', 'Express', 'MongoDB', 'Redis'],
    githubUrl: 'https://github.com/jajavier2404',
    liveUrl: '#',
  }
];

// Triplicar para loop infinito suave
const tripleProjects = [...projects, ...projects, ...projects];

const AUTOPLAY_INTERVAL = 8000;

function ProjectCard({ project, isDark }: { project: typeof projects[0]; isDark: boolean }) {
  return (
    <div className={cn(
      'w-[380px] flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300',
      isDark ? 'glass-night' : 'glass-day'
    )}>
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <div className={cn(
          'absolute inset-0 bg-gradient-to-t',
          isDark ? 'from-night-bg' : 'from-day-bg'
        )} />
      </div>
      
      <div className="p-5">
        <h3 className={cn(
          'text-xl font-bold mb-2',
          isDark ? 'text-night-text' : 'text-day-text'
        )}>
          {project.title}
        </h3>
        
        <p className={cn(
          'text-sm mb-4 line-clamp-2',
          isDark ? 'text-night-text/70' : 'text-day-text/70'
        )}>
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className={cn(
                'px-2.5 py-1 rounded-lg text-xs font-medium',
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
            Demo
          </a>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const { isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const progressRef = useRef<number>(0);
  const animationRef = useRef<number>();

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setProgress(0);
    progressRef.current = 0;
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setProgress(0);
    progressRef.current = 0;
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgress(0);
    progressRef.current = 0;
  }, []);

  // Animación del progreso
  useEffect(() => {
    if (isPaused) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / AUTOPLAY_INTERVAL) * 100, 100);
      
      setProgress(newProgress);
      progressRef.current = newProgress;

      if (newProgress >= 100) {
        goToNext();
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [currentIndex, isPaused, goToNext]);

  // Touch handlers para mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      goToNext();
    }
    if (touchStart - touchEnd < -75) {
      goToPrev();
    }
  };

  return (
    <section
      id="proyectos"
      className={cn(
        'py-24 transition-colors duration-500 overflow-hidden',
        isDark ? 'bg-night-bg' : 'bg-day-bg'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
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
      </div>

      {/* Desktop - Dos filas infinitas */}
      <div 
        className="hidden lg:block relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradiente izquierdo */}
        <div className={cn(
          'absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none',
          isDark 
            ? 'bg-gradient-to-r from-night-bg to-transparent' 
            : 'bg-gradient-to-r from-day-bg to-transparent'
        )} />

        {/* Gradiente derecho */}
        <div className={cn(
          'absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none',
          isDark 
            ? 'bg-gradient-to-l from-night-bg to-transparent' 
            : 'bg-gradient-to-l from-day-bg to-transparent'
        )} />

        {/* Primera fila - izquierda */}
        <div className="flex gap-6 mb-6 animate-scroll-left">
          {tripleProjects.map((project, index) => (
            <ProjectCard key={`row1-${index}`} project={project} isDark={isDark} />
          ))}
        </div>

        {/* Segunda fila - derecha */}
        <div className="flex gap-6 animate-scroll-right">
          {[...tripleProjects].reverse().map((project, index) => (
            <ProjectCard key={`row2-${index}`} project={project} isDark={isDark} />
          ))}
        </div>
      </div>

      {/* Mobile y Tablet - Carrusel 3D con cards laterales visibles */}
      <div 
        className="lg:hidden relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative flex items-center justify-center h-[500px] sm:h-[550px] overflow-hidden">
          {projects.map((project, index) => {
            // Calcular posición relativa al índice actual
            let diff = index - currentIndex;
            
            // Ajustar para loop infinito
            if (diff > projects.length / 2) diff -= projects.length;
            if (diff < -projects.length / 2) diff += projects.length;
            
            const isActive = diff === 0;
            const isPrev = diff === -1 || diff === projects.length - 1;
            const isNext = diff === 1 || diff === -(projects.length - 1);
            const isVisible = isActive || isPrev || isNext;
            
            if (!isVisible) return null;
            
            return (
              <motion.div
                key={`${project.title}-${index}`}
                initial={false}
                animate={{
                  x: diff * 280,
                  scale: isActive ? 1 : 0.85,
                  opacity: isActive ? 1 : 0.5,
                  zIndex: isActive ? 10 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                className={cn(
                  'absolute w-[260px] sm:w-[300px] rounded-xl overflow-hidden cursor-pointer',
                  isDark ? 'glass-night' : 'glass-day'
                )}
                onClick={() => {
                  if (!isActive) {
                    if (isPrev) goToPrev();
                    if (isNext) goToNext();
                  }
                }}
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={cn(
                    'absolute inset-0 bg-gradient-to-t',
                    isDark ? 'from-night-bg' : 'from-day-bg'
                  )} />
                </div>
                
                <div className="p-4">
                  <h3 className={cn(
                    'text-base sm:text-lg font-bold mb-1',
                    isDark ? 'text-night-text' : 'text-day-text'
                  )}>
                    {project.title}
                  </h3>
                  
                  <p className={cn(
                    'text-xs sm:text-sm mb-2 line-clamp-2',
                    isDark ? 'text-night-text/70' : 'text-day-text/70'
                  )}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className={cn(
                          'px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium',
                          isDark
                            ? 'bg-night-primary/20 text-night-primary'
                            : 'bg-day-primary/20 text-day-primary'
                        )}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {isActive && (
                    <div className="flex gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                          isDark
                            ? 'bg-night-primary/20 text-night-text hover:bg-night-primary/30'
                            : 'bg-day-primary/20 text-day-text hover:bg-day-primary/30'
                        )}
                      >
                        <GitHubIcon className="w-3.5 h-3.5" />
                        Código
                      </a>
                      <a
                        href={project.liveUrl}
                        className={cn(
                          'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                          isDark
                            ? 'bg-day-primary text-night-bg hover:bg-night-accent'
                            : 'bg-day-primary text-white hover:bg-day-accent'
                        )}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Demo
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Indicadores tipo barras con relleno progresivo */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative rounded-full overflow-hidden"
              style={{
                width: index === currentIndex ? '32px' : '8px',
                height: '6px'
              }}
            >
              {/* Fondo gris */}
              <div className={cn(
                'absolute inset-0 rounded-full',
                isDark ? 'bg-gray-600' : 'bg-gray-300'
              )} />
              
              {/* Relleno verde que crece */}
              {index === currentIndex && (
                <div 
                  className="absolute inset-0 bg-day-primary rounded-full"
                  style={{ 
                    width: `${progress}%`,
                    transition: 'width 0.1s linear'
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Botón Ver más proyectos */}
      <div className="flex justify-center mt-12 px-4">
        <motion.a
          href="https://github.com/jajavier2404"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'group flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300',
            isDark
              ? 'bg-day-primary/20 text-day-primary border-2 border-day-primary/50 hover:bg-day-primary hover:text-night-bg'
              : 'bg-day-primary/10 text-day-primary border-2 border-day-primary/30 hover:bg-day-primary hover:text-white'
          )}
        >
          <span>Ver más proyectos</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </motion.a>
      </div>
    </section>
  );
}
