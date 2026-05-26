import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X, LogIn, LogOut, User, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/cn';
import { useState } from 'react';

const navLinks = [
  { href: '/#inicio', label: 'Inicio' },
  { href: '/#experiencia', label: 'Experiencia' },
  { href: '/#proyectos', label: 'Proyectos' },
  { href: '/#contacto', label: 'Contacto' },
  { href: '/chat', label: 'Chat IA', icon: MessageSquare },
];

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isDark ? 'glass-night' : 'glass-day'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className={cn(
              'text-xl font-bold tracking-tight transition-colors',
              isDark ? 'text-night-text' : 'text-day-text'
            )}
          >
            <span className="text-day-primary">J</span>G
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => scrollToSection(link.href)}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                  isDark
                    ? 'text-night-text hover:bg-night-primary/20'
                    : 'text-day-text hover:bg-day-primary/20'
                )}
              >
                <span className="flex items-center gap-2">
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={cn(
                'p-2 rounded-lg transition-all duration-300',
                isDark
                  ? 'text-night-text hover:bg-night-primary/20'
                  : 'text-day-text hover:bg-day-primary/20'
              )}
              aria-label="Cambiar tema"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Auth buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={cn(
                      'hidden md:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                      isDark
                        ? 'text-night-text hover:bg-night-primary/20'
                        : 'text-day-text hover:bg-day-primary/20'
                    )}
                  >
                    <User className="w-4 h-4" />
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                    isDark
                      ? 'text-night-text hover:bg-red-500/20'
                      : 'text-day-text hover:bg-red-500/20'
                  )}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Salir</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  isDark
                    ? 'bg-night-primary text-night-bg hover:bg-night-accent'
                    : 'bg-day-primary text-white hover:bg-day-accent'
                )}
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Iniciar sesión</span>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                'md:hidden p-2 rounded-lg transition-all',
                isDark
                  ? 'text-night-text hover:bg-night-primary/20'
                  : 'text-day-text hover:bg-day-primary/20'
              )}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className={cn(
            'md:hidden border-t transition-colors',
            isDark
              ? 'glass-night border-night-border'
              : 'glass-day border-day-border'
          )}
        >
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => scrollToSection(link.href)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                  isDark
                    ? 'text-night-text hover:bg-night-primary/20'
                    : 'text-day-text hover:bg-day-primary/20'
                )}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                  isDark
                    ? 'text-night-text hover:bg-night-primary/20'
                    : 'text-day-text hover:bg-day-primary/20'
                )}
              >
                <User className="w-4 h-4" />
                Panel Admin
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
