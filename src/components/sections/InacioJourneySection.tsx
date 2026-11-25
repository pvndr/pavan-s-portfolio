import { educationTimeline } from '../../data/experience';

export function InacioJourneySection() {
  return (
    <section className="inacio-section" id="journey">
      <div className="inacio-section-head">
        <div>
          <span className="inacio-head-index">03 / PIPELINE</span>
          <h2 className="inacio-head-title">Academic &amp; Systems History</h2>
        </div>
        <p className="inacio-head-desc">
          Chronological progression from core scientific foundations to advanced computer science and machine learning.
        </p>
      </div>

      <div className="inacio-journey-list">
        {educationTimeline.map((item) => (
          <div key={item.id} className="inacio-journey-node">
            <span className="inacio-node-dot" />

            <div className="inacio-journey-meta">
              <span>{item.branch}</span>
              <span>·</span>
              <span>{item.period}</span>
              {item.badge && (
                <>
                  <span>·</span>
                  <span style={{ color: 'var(--inacio-accent)' }}>[{item.badge}]</span>
                </>
              )}
            </div>

            <h3 className="inacio-journey-title">{item.title}</h3>
            <div className="inacio-journey-org">{item.organization}</div>
            <p className="inacio-journey-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
