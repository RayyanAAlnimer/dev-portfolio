import { useRef, useState } from 'react';
import SoundToggle from './SoundToggle.jsx';

const sections = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

export default function Navigation({ sound }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef(null);

  function handleKeyDown(event) {
    if (event.key === 'Escape' && isOpen) {
      setIsOpen(false);
      toggleRef.current.focus();
    }
  }

  return (
    <nav aria-label="Main navigation" onKeyDown={handleKeyDown}>
      <div className="wrap">
        <SoundToggle
          enabled={sound.enabled}
          unavailable={sound.unavailable}
          onToggle={sound.toggleSound}
        />
        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`nav-links ${isOpen ? 'open' : ''}`} id="primary-navigation">
          {sections.map(section => (
            <li key={section}>
              <a href={`#${section.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                {section}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
