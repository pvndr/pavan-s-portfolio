

export function TimelineSection() {
  return (
    <section id="engineering-journey" className="flow-section journey-section">
      <div className="section-heading reveal fade-up">
        <span className="heading-num">03 / PIPELINE</span>
        <h2 className="heading-title">Commit History</h2>
      </div>

      {/**/}
      <div className="git-timeline">
        <svg className="git-branch-line reveal" viewBox="0 0 100 800" preserveAspectRatio="none" data-reveal-once="true" data-threshold-half="true">
          <path className="draw-path" d="M 50 0 L 50 800" />
          <path className="draw-path branch" d="M 50 200 C 80 250, 80 350, 50 400" />
        </svg>

        <div className="commit-node reveal fade-up" data-reveal-once="true" data-threshold-half="true">
          <div className="commit-dot edu-dot"></div>
          <div className="commit-content">
            <span className="commit-hash">init repository</span>
            <span className="commit-date">Class of 2021</span>
            <h3 className="commit-title">High School Education</h3>
            <span className="commit-org">Jain Vidyalaya</span>
            <p className="commit-desc">Early academic years focusing on core subjects, building discipline, and developing a foundational curiosity for science and technology.</p>
          </div>
        </div>

        <div className="commit-node reveal fade-up delay-2" data-reveal-once="true" data-threshold-half="true">
          <div className="commit-dot"></div>
          <div className="commit-content">
            <span className="commit-hash">branch feature/science</span>
            <span className="commit-date">[2021] — [2023]</span>
            <h3 className="commit-title">Science Student</h3>
            <span className="commit-org">Anubhava Mantapa</span>
            <p className="commit-desc">Developed core problem-solving skills through comprehensive study of fundamental sciences, bridging the gap to applied technology.
            </p>
          </div>
        </div>

        <div className="commit-node reveal fade-up delay-3" data-reveal-once="true" data-threshold-half="true">
          <div className="commit-dot"></div>
          <div className="commit-content">
            <span className="commit-hash">merge branch 'bachelors/cse'</span>
            <span className="commit-date">[2023] — Present</span>
            <h3 className="commit-title">Bachelor of Engineering [B.E] in CSE</h3>
            <span className="commit-org">K.S.School of Engineering and Management</span>
            <p className="commit-desc">Exploring core computing principles alongside emerging technologies like artificial intelligence and distributed systems.</p>
          </div>
        </div>

        <div className="commit-node reveal fade-up delay-4" data-reveal-once="true" data-threshold-half="true">
          <div className="commit-dot"></div>
          <div className="commit-content">
            <span className="commit-hash">commit HEAD</span>
            <span className="commit-date">Present</span>
            <h3 className="commit-title">Aspiring AI Software Engineer</h3>
            <span className="status-indicator">● Available for Full-Time Opportunities</span>
            <p className="commit-desc">Actively building AI-powered applications, Retrieval-Augmented Generation (RAG) systems, machine learning solutions, and modern full-stack web applications through personal projects and continuous learning. Passionate about solving real-world problems with intelligent software while preparing for a full-time software engineering career.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
