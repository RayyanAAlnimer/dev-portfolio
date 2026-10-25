import { projects } from '../data/portfolio.js';
import Section from './Section.jsx';
import Reveal from './Reveal.jsx';

function ProjectCard({ project }) {
  return (
    <div className="proj-card">
      <div className="proj-num">{project.label}</div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="tags">
        {project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
      </div>
      {project.links.map(link => (
        <a key={link.href} className="proj-link" href={link.href}
          target={link.newTab ? '_blank' : undefined}
          rel={link.newTab ? 'noopener noreferrer' : undefined}
          aria-label={link.ariaLabel}>
          {link.label} <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}

export default function Projects() {
  return (
    <Section id="projects" eyebrow="03 — My Projects" title="Things I've built"
      intro="A selection of personal and academic projects, showcasing my skills in software development, cloud architecture, and systems design.">
      <Reveal className="proj-grid">
        {projects.map(project => <ProjectCard key={project.label} project={project} />)}
      </Reveal>
    </Section>
  );
}
