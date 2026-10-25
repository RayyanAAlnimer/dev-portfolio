import Navigation from './components/Navigation.jsx';
import useInterfaceSound from './hooks/useInterfaceSound.js';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';

export default function App() {
  const sound = useInterfaceSound();

  return (
    <>
      <Navigation sound={sound} />
      <Hero />
      <main>
        <About />
        <Experience />
        <Projects />
        <Skills />
      </main>
      <Contact />
    </>
  );
}
