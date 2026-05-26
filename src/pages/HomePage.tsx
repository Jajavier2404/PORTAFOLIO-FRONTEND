import { Hero } from '../components/Hero';
import { Experience } from '../components/Experience';
import { Projects } from '../components/Projects';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export function HomePage() {
  return (
    <>
      <Hero />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
