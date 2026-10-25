import Reveal from './Reveal.jsx';
import InterfaceBorder from './InterfaceBorder.jsx';
import VisitorCount from './VisitorCount.jsx';

export default function Contact() {
  return (
    <footer id="contact">
      <div className="wrap">
        <InterfaceBorder />
        <Reveal>
          <div className="eyebrow">05 — Contact</div>
          <h2>Let's talk.</h2>
          <p className="intro">
            Open to new-grad positions in software engineering, cloud roles, or
            AI roles, and always glad to talk through my capstone project in
            more detail.
          </p>
          <div className="contact-row">
            <a className="btn" href="mailto:alnimerrayyan@gmail.com">
              alnimerrayyan@gmail.com
            </a>
            <a className="btn ghost" href="tel:+971568053607">+971 56 805 3607</a>
            <a
              className="btn ghost"
              href="https://github.com/RayyanAAlnimer"
              target="_blank"
              rel="noopener"
            >
              github.com/RayyanAAlnimer
            </a>
            <a
              className="btn ghost"
              href="https://linkedin.com/in/rayyan-agha-alnimer"
              target="_blank"
              rel="noopener"
            >
              LinkedIn
            </a>
          </div>
        </Reveal>
        <div className="foot-bottom">
          <span>
            Rayyan Agha Alnimer — American University of Sharjah, Class of 2026
          </span>
          <span>Visitors: <VisitorCount /></span>
          <span>Portfolio v2.0 · Oct 2026</span>
        </div>
      </div>
    </footer>
  );
}
