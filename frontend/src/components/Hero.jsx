import HeroChip from './HeroChip.jsx';
import InterfaceBorder from './InterfaceBorder.jsx';

export default function Hero() {
  return (
    <header className="hero">
      <div className="wrap">
        <InterfaceBorder />
        <div className="frame">
          <div className="hero-intro">
            <div className="hero-copy">
              <div className="eyebrow">Portfolio / Engineering &amp; Systems</div>
              <h1>Rayyan Agha Alnimer</h1>
              <div className="role">Computer Engineering Graduate</div>
              <p className="description">
                Computer Engineering graduate from the American University of
                Sharjah with experience in cloud systems architecture and software
                engineering.
              </p>
            </div>
            <HeroChip />
          </div>
          <div className="readout">
            <div>
              <div className="k">Location</div>
              <div className="v">Dubai, UAE</div>
            </div>
            <div>
              <div className="k">GPA</div>
              <div className="v">3.6 / 4.0, Cum Laude</div>
            </div>
            <div>
              <div className="k">Status</div>
              <div className="v">Open to opportunities</div>
            </div>
          </div>

          <div className="links">
            <a className="btn" href="mailto:alnimerrayyan@gmail.com">Email me</a>
            <a
              className="btn ghost"
              href="https://github.com/RayyanAAlnimer"
              target="_blank"
              rel="noopener"
            >
              GitHub
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
        </div>
      </div>
    </header>
  );
}
