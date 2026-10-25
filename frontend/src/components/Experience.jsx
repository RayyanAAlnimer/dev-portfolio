import { experience } from '../data/portfolio.js';
import Section from './Section.jsx';
import Reveal from './Reveal.jsx';

function ExperienceItem({ job }) {
  return (
    <div className="tl-item">
      <div className="tl-head">
        <div>
          <div className="tl-role">{job.role}</div>
          <div className="tl-org">{job.organization}</div>
        </div>
        <div className="tl-meta">{job.dates}</div>
      </div>
      <ul>
        {job.details.map(detail => <li key={detail}>{detail}</li>)}
      </ul>
    </div>
  );
}

export default function Experience() {
  return (
    <Section id="experience" eyebrow="02 — Experience" title="Where I've worked"
      intro="A chronological run of internships and programs, most recent first.">
      <Reveal className="timeline">
        {experience.map(job => <ExperienceItem key={job.organization} job={job} />)}
      </Reveal>
    </Section>
  );
}
