

export function CapabilitySection() {
  return (
    <section id="capability-map" className="flow-section capability-section">
      <div className="section-heading reveal fade-up">
        <span className="heading-num">02 / CAPABILITIES</span>
        <h2 className="heading-title">Engineering Systems</h2>
      </div>

      {/**/}
      <div className="network-diagram reveal fade-up delay-2">

        <div className="network-cluster core-node">
          <div className="node-circle magnetic-target">AI / ML</div>
          <div className="branch-nodes">
            <span className="leaf-node">Python</span>
            <span className="leaf-node">Machine Learning</span>
            <span className="leaf-node">Prompt Engineering</span>
          </div>
        </div>

        <div className="network-cluster core-node">
          <div className="node-circle magnetic-target">Full Stack</div>
          <div className="branch-nodes">
            <span className="leaf-node">HTML5</span>
            <span className="leaf-node">CSS3</span>
            <span className="leaf-node">JavaScript</span>
            <span className="leaf-node">React</span>
            <span className="leaf-node">Node.js</span>
            <span className="leaf-node">MySQL</span>
            <span className="leaf-node">Git &amp; GitHub</span>
          </div>
        </div>

        <div className="network-cluster core-node">
          <div className="node-circle magnetic-target">Engineering</div>
          <div className="branch-nodes">
            <span className="leaf-node">Data Structures &amp; Algorithms</span>
            <span className="leaf-node">Object-Oriented Programming</span>
            <span className="leaf-node">DBMS</span>
            <span className="leaf-node">FastAPI</span>
            <span className="leaf-node">Responsive Web Design</span>
            <span className="leaf-node">Problem Solving</span>
          </div>
        </div>

      </div>
    </section>
  );
}
