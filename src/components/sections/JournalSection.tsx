

interface JournalSectionProps {
  openModal: (title: string, documentUrl: string, type: 'image' | 'pdf', details?: { label: string, value: string }[]) => void;
}

export function JournalSection({ openModal }: JournalSectionProps) {
  return (
    <section id="notebook" className="flow-section notebook-section">
      <div className="section-heading reveal fade-up">
        <span className="heading-num">04 / LOGS</span>
        <h2 className="heading-title">Engineering Journal</h2>
      </div>

      {/**/}
      <div className="terminal-logs-container reveal fade-up delay-2">

        <div className="log-entry magnetic-target">
          <div className="log-type">INFO: RESEARCH PUBLICATION</div>
          <div className="log-title" style={{ marginTop: '0.5rem', marginBottom: '1rem', lineHeight: '1.4' }}>
            A Survey on Machine Learning Approach for Momentum Shift Detection and Win Prediction in Cricket Matches
          </div>
          <div className="log-status" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <span>Status: ✓ PUBLISHED</span>
            <button
              className="cmd-input magnetic-target"
              onClick={() => openModal(
                'Research Publication',
                '/research-paper.pdf',
                'pdf',
                [
                  { label: 'Journal', value: 'IJARCCE' },
                  { label: 'Published', value: 'May 2026' },
                  { label: 'DOI', value: '10.17148/IJARCCE.2026.155194' }
                ]
              )}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, textTransform: 'uppercase' }}
            >
              <span className="cmd-prompt">&gt;</span> Preview Publication<span className="cursor-blink">_</span>
            </button>
          </div>
        </div>

        <div className="log-entry magnetic-target">
          <div className="log-type">INFO: CERTIFICATION ACQUIRED</div>
          <div className="log-title" style={{ marginTop: '0.5rem', marginBottom: '1rem', lineHeight: '1.4' }}>
            Certificate of Publication - IJARCCE
          </div>
          <div className="log-status" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <span>Status: ✓ VERIFIED</span>
            <button
              className="cmd-input magnetic-target"
              onClick={() => openModal(
                'Certificate of Publication',
                '/publication-certificate.pdf',
                'pdf',
                [
                  { label: 'Issued By', value: 'IJARCCE' },
                  { label: 'Date', value: 'May 2026' },
                  { label: 'DOI', value: '10.17148/IJARCCE.2026.155194' }
                ]
              )}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, textTransform: 'uppercase' }}
            >
              <span className="cmd-prompt">&gt;</span> Preview Certificate<span className="cursor-blink">_</span>
            </button>
          </div>
        </div>

        <div className="log-entry magnetic-target">
          <div className="log-type">INFO: CERTIFICATION</div>
          <div className="log-title" style={{ marginTop: '0.5rem', marginBottom: '1rem', lineHeight: '1.4' }}>
            IBM SkillsBuild Hackathon-integrated Guided Learning Experience (GLE)
          </div>
          <div className="log-status" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <span>Status: ✓ COMPLETED</span>
            <button
              className="cmd-input magnetic-target"
              onClick={() => openModal(
                'IBM SkillsBuild Certificate',
                '/ibm-skillsbuild-certificate.pdf',
                'pdf',
                [
                  { label: 'Issued By', value: 'Edunet Foundation & IBM SkillsBuild' },
                  { label: 'Status', value: 'COMPLETED' }
                ]
              )}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, textTransform: 'uppercase' }}
            >
              <span className="cmd-prompt">&gt;</span> Preview Certificate<span className="cursor-blink">_</span>
            </button>
          </div>
        </div>

        <div className="log-entry magnetic-target">
          <div className="log-type">INFO: CERTIFICATION</div>
          <div className="log-title" style={{ marginTop: '0.5rem', marginBottom: '1rem', lineHeight: '1.4' }}>
            Explore Machine Learning using Python
          </div>
          <div className="log-status" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <span>Status: ✓ COMPLETED</span>
            <button
              className="cmd-input magnetic-target"
              onClick={() => openModal(
                'Explore Machine Learning using Python',
                '/infosys-ml-certificate.pdf',
                'pdf',
                [
                  { label: 'Issued By', value: 'Infosys Springboard' },
                  { label: 'Issued On', value: 'April 13, 2026' },
                  { label: 'Status', value: 'COMPLETED' }
                ]
              )}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, textTransform: 'uppercase' }}
            >
              <span className="cmd-prompt">&gt;</span> Preview Certificate<span className="cursor-blink">_</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
