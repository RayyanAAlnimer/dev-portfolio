import { certifications, skillGroups } from '../data/portfolio.js';
import Section from './Section.jsx';
import Reveal from './Reveal.jsx';

function SkillIcon({ icon }) {
  if (icon === 'ultralytics') {
    return <img className="skill-icon skill-icon-monochrome"
      src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/ultralytics.svg"
      alt="" width="20" height="20" />;
  }

  if (icon === 'sql' || icon === 'verilog') {
    return (
      <svg className="skill-icon" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true" focusable="false">
        {icon === 'sql' ? (
          <>
            <ellipse cx="12" cy="5" rx="8" ry="3" />
            <path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" />
          </>
        ) : (
          <>
            <rect x="6" y="6" width="12" height="12" rx="2" />
            <path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4M18 9h4m-4 6h4" />
          </>
        )}
      </svg>
    );
  }

  return <i className={icon} aria-hidden="true" />;
}

function SkillGroup({ group }) {
  return (
    <div className="skill-cat">
      <div className="k">{group.name}</div>
      <div className="chip-row">
        {group.skills.map(skill => (
          <span className="chip" key={skill.name}>
            <SkillIcon icon={skill.icon} /> {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <Section id="skills" eyebrow="04 — Skills & Certifications" title="Toolset">
      <Reveal className="skills-grid">
        {skillGroups.map(group => <SkillGroup key={group.name} group={group} />)}
      </Reveal>
      <Reveal className="certifications">
        <div className="cert-heading">Certifications</div>
        <div className="cert-row">
          {certifications.map(certification => (
            <div className="cert" key={certification.name}>
              <div className="name">{certification.name}</div>
              <div className="org">{certification.organization}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
