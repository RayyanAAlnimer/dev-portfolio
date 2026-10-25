import Section from './Section.jsx';
import Reveal from './Reveal.jsx';

export default function About() {
  return (
    <Section id="about" eyebrow="01 — About" title="Systems-minded, built for the edge.">
      <Reveal className="about-grid">
        <div>
          <p>
            I am a recent graduate with a B.S. in Computer Engineering from
            the American University of Sharjah, where coursework in cloud
            computing, machine learning, and embedded systems shapes how I
            think of and develop functional end-to-end pipelines and durable
            systems.
          </p>
          <p>
            That thread runs through my work, from my senior design project to
            my internship experiences in software engineering and IT
            solutions.
          </p>
        </div>
        <div className="honors">
          <div className="k">Recognitions</div>
          <ul>
            <li><b>Tau Beta Pi</b> — Engineering Honor Society</li>
            <li><b>Dean's List (x4)</b></li>
            <li><b>Chancellor's List (x1)</b></li>
            <li><b>AWS Certified Solutions Architect – Associate</b></li>
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
