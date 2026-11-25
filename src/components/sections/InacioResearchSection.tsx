import { publications, certifications } from '../../data/publications';
import { FileText, Award } from 'lucide-react';
import { playClickSound } from '../../utils/audio';

interface InacioResearchSectionProps {
  onOpenDocument?: (doc: { title: string; url: string; type: 'pdf' | 'image' }) => void;
}

export function InacioResearchSection({ onOpenDocument }: InacioResearchSectionProps) {
  const pub = publications[0];

  return (
    <section className="inacio-section" id="research">
      <div className="inacio-section-head">
        <div>
          <span className="inacio-head-index">04 / DISPATCH</span>
          <h2 className="inacio-head-title">Peer-Reviewed Research &amp; Credentials</h2>
        </div>
        <p className="inacio-head-desc">
          Published academic survey in computer science and verified technical credentials.
        </p>
      </div>

      {/* Primary Spotlight Card */}
      <div className="inacio-inspector-box" style={{ marginBottom: '36px' }}>
        <div className="inacio-corner-cross tl">+</div>
        <div className="inacio-corner-cross tr">+</div>
        <div className="inacio-corner-cross bl">+</div>
        <div className="inacio-corner-cross br">+</div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', fontFamily: 'var(--inacio-font-mono)', fontSize: '12px' }}>
          <span style={{ color: 'var(--inacio-accent)' }}>PEER-REVIEWED JOURNAL</span>
          <span style={{ color: 'var(--inacio-fg-dim)' }}>PUBLISHED · MAY 2026</span>
        </div>

        <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--inacio-fg)', margin: '0 0 12px' }}>
          {pub.title}
        </h3>

        <p style={{ fontSize: '15px', color: 'var(--inacio-fg-dim)', lineHeight: 1.6, margin: '0 0 20px', maxWidth: '880px' }}>
          {pub.abstract}
        </p>

        <div style={{ display: 'flex', gap: '20px', fontFamily: 'var(--inacio-font-mono)', fontSize: '12px', color: 'var(--inacio-fg-subtle)', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div>VENUE: <strong style={{ color: 'var(--inacio-fg)' }}>{pub.venue}</strong></div>
          <div>DOI: <strong style={{ color: 'var(--inacio-accent)' }}>{pub.doi}</strong></div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              playClickSound();
              onOpenDocument?.({
                title: pub.title,
                url: pub.links.pdf!,
                type: 'pdf',
              });
            }}
            className="inacio-btn-primary"
            style={{ fontSize: '13px', padding: '8px 16px' }}
          >
            <FileText size={14} />
            <span>Preview publication PDF</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              onOpenDocument?.({
                title: 'Certificate of Publication — IJARCCE',
                url: pub.links.certificate!,
                type: 'pdf',
              });
            }}
            className="inacio-btn-secondary"
            style={{ fontSize: '13px', padding: '8px 16px' }}
          >
            <Award size={14} />
            <span>View certificate</span>
          </button>
        </div>
      </div>

      {/* Certifications Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {certifications.map((cert) => (
          <div
            key={cert.id}
            style={{
              background: 'var(--inacio-surface)',
              border: '1px solid var(--inacio-border)',
              borderRadius: '8px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--inacio-font-mono)', fontSize: '11px', color: 'var(--inacio-accent)', marginBottom: '8px' }}>
                CERTIFICATE · {cert.date}
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--inacio-fg)', margin: '0 0 8px' }}>
                {cert.title}
              </h4>
              <div style={{ fontSize: '13px', color: 'var(--inacio-fg-dim)', marginBottom: '16px' }}>
                {cert.issuer}
              </div>
            </div>

            {cert.pdfUrl && (
              <button
                onClick={() => {
                  playClickSound();
                  onOpenDocument?.({
                    title: cert.title,
                    url: cert.pdfUrl!,
                    type: 'pdf',
                  });
                }}
                className="inacio-action-link"
                style={{ alignSelf: 'flex-start' }}
              >
                <FileText size={12} />
                <span>Preview Document</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
