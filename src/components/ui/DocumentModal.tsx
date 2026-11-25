import { X, ExternalLink, Download, FileCheck } from 'lucide-react';

export interface DocumentModalData {
  title: string;
  url: string;
  type: 'pdf' | 'image';
  metadata?: { label: string; value: string }[];
}

interface DocumentModalProps {
  document: DocumentModalData | null;
  onClose: () => void;
}

export function DocumentModal({ document, onClose }: DocumentModalProps) {
  if (!document) return null;

  return (
    <div
      className="doc-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="doc-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="doc-modal-header">
          <div className="doc-modal-title-box">
            <FileCheck className="doc-icon" size={20} />
            <h3 className="doc-title">{document.title}</h3>
          </div>

          <div className="doc-modal-actions">
            <a
              href={document.url}
              target="_blank"
              rel="noreferrer"
              className="doc-action-btn"
              title="Open full document in new tab"
            >
              <ExternalLink size={16} />
            </a>
            <a
              href={document.url}
              download
              className="doc-action-btn"
              title="Download Document"
            >
              <Download size={16} />
            </a>
            <button
              onClick={onClose}
              className="doc-close-btn"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Metadata Bar */}
        {document.metadata && document.metadata.length > 0 && (
          <div className="doc-meta-bar">
            {document.metadata.map((item, idx) => (
              <div key={idx} className="doc-meta-item">
                <span className="doc-meta-label">{item.label}:</span>
                <span className="doc-meta-val">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Document Body / Viewer */}
        <div className="doc-body-viewer">
          {document.type === 'pdf' ? (
            <object
              data={document.url}
              type="application/pdf"
              className="doc-pdf-object"
            >
              <div className="doc-fallback">
                <p>Unable to preview PDF directly in this browser viewport.</p>
                <a
                  href={document.url}
                  target="_blank"
                  rel="noreferrer"
                  className="doc-open-link"
                >
                  <ExternalLink size={16} /> View Document Directly
                </a>
              </div>
            </object>
          ) : (
            <img
              src={document.url}
              alt={document.title}
              className="doc-image-preview"
            />
          )}
        </div>
      </div>
    </div>
  );
}
