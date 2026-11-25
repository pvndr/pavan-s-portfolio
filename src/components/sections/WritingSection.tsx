import { publications, certifications } from '../../data/publications';
import { BookOpen, Award, FileText, CheckCircle, ExternalLink } from 'lucide-react';

interface WritingSectionProps {
  onOpenDocument?: (doc: {
    title: string;
    url: string;
    type: 'pdf' | 'image';
    metadata?: { label: string; value: string }[];
  }) => void;
}

export function WritingSection({ onOpenDocument }: WritingSectionProps) {
  return (
    <section id="research" className="research-spatial-section">
      <div className="section-meta-heading">
        <span className="meta-tag">04 / DISPATCH</span>
        <h2 className="meta-title">Research Publications & Credentials</h2>
        <p className="meta-desc">
          Peer-reviewed research and verified industry technical certifications.
        </p>
      </div>

      {/* Primary Research Paper Spotlight Card */}
      <div className="research-spotlight-card">
        <div className="spotlight-top-meta">
          <span className="journal-badge">
            <BookOpen size={14} /> PEER-REVIEWED JOURNAL PUBLICATION
          </span>
          <span className="status-verified">
            <CheckCircle size={14} /> STATUS: PUBLISHED & INDEXED
          </span>
        </div>

        {publications.map((pub) => (
          <div key={pub.id} className="pub-card-inner">
            <h3 className="pub-title">{pub.title}</h3>
            <p className="pub-abstract">{pub.abstract}</p>

            <div className="pub-meta-grid">
              <div className="meta-cell">
                <span className="cell-label">JOURNAL</span>
                <span className="cell-val">{pub.venue}</span>
              </div>
              <div className="meta-cell">
                <span className="cell-label">DATE</span>
                <span className="cell-val">{pub.date}</span>
              </div>
              <div className="meta-cell">
                <span className="cell-label">DOI REFERENCE</span>
                <span className="cell-val font-mono">{pub.doi}</span>
              </div>
            </div>

            <div className="pub-actions-row">
              {pub.links.pdf && (
                <button
                  onClick={() =>
                    onOpenDocument?.({
                      title: pub.title,
                      url: pub.links.pdf!,
                      type: 'pdf',
                      metadata: [
                        { label: 'Journal', value: 'IJARCCE' },
                        { label: 'Date', value: pub.date },
                        { label: 'DOI', value: pub.doi || 'N/A' },
                      ],
                    })
                  }
                  className="pub-action-btn primary"
                >
                  <FileText size={16} /> Preview Publication PDF
                </button>
              )}

              {pub.links.certificate && (
                <button
                  onClick={() =>
                    onOpenDocument?.({
                      title: 'Certificate of Publication — IJARCCE',
                      url: pub.links.certificate!,
                      type: 'pdf',
                      metadata: [
                        { label: 'Issued By', value: 'IJARCCE' },
                        { label: 'DOI', value: pub.doi || 'N/A' },
                      ],
                    })
                  }
                  className="pub-action-btn secondary"
                >
                  <Award size={16} /> View Publication Certificate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Certifications Grid */}
      <div className="certifications-heading-sub">
        <Award size={18} />
        <span>Verified Technical Credentials</span>
      </div>

      <div className="certifications-grid">
        {certifications.map((cert) => (
          <div key={cert.id} className="cert-card">
            <div className="cert-type-tag">CERTIFICATE</div>
            <h4 className="cert-title">{cert.title}</h4>
            <div className="cert-issuer-row">
              <span className="cert-issuer">{cert.issuer}</span>
              <span className="cert-date">{cert.date}</span>
            </div>

            <div className="cert-footer-row">
              <span className="cert-status-pill">
                <CheckCircle size={12} /> VERIFIED
              </span>

              {cert.pdfUrl && (
                <button
                  onClick={() =>
                    onOpenDocument?.({
                      title: cert.title,
                      url: cert.pdfUrl!,
                      type: 'pdf',
                      metadata: [
                        { label: 'Issuer', value: cert.issuer },
                        { label: 'Date', value: cert.date },
                      ],
                    })
                  }
                  className="cert-preview-btn"
                >
                  <ExternalLink size={13} /> Preview
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
