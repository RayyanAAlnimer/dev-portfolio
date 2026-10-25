import Reveal from './Reveal.jsx';

export default function Section({ id, eyebrow, title, intro, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <div className="wrap">
        <Reveal className="head">
          <div className="eyebrow">{eyebrow}</div>
          <h2 id={`${id}-heading`}>{title}</h2>
          {intro && <p className="intro">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
