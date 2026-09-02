import React, { useEffect, useState } from 'react';
import '../styles/DocumentModal.css';

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  documentUrl: string;
  type?: 'image' | 'pdf';
  details?: { label: string; value: string }[];
}

export const DocumentModal: React.FC<DocumentModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  documentUrl,
  type = 'image',
  details
}) => {
  const [scale, setScale] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let animationFrameId: number;

    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';
      // Small delay to ensure display: block is applied before animating opacity
      animationFrameId = requestAnimationFrame(() => {
        setIsAnimating(true);
      });
      setScale(1);
    } else {
      setIsAnimating(false);
      document.body.style.overflow = 'unset';
      timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // match transition duration
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  const handleReset = () => setScale(1);

  return (
    <div 
      className={`doc-modal-overlay ${isAnimating ? 'open' : ''}`} 
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className={`doc-modal-content ${isAnimating ? 'open' : ''}`} 
        onClick={e => e.stopPropagation()}
      >
        <div className="doc-modal-header">
          <div className="doc-modal-title-area">
            <h3 className="doc-modal-title">{title}</h3>
            {details && details.length > 0 && (
              <div className="doc-modal-details">
                {details.map((detail, idx) => (
                  <span key={idx} className="doc-modal-detail-item">
                    <span className="detail-label">{detail.label}:</span> {detail.value}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="doc-modal-controls">
            {type === 'image' && (
              <>
                <button onClick={handleZoomOut} className="doc-modal-btn" title="Zoom Out" aria-label="Zoom out">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM7 10h6"/></svg>
                </button>
                <button onClick={handleReset} className="doc-modal-btn" title="Reset Zoom" aria-label="Reset zoom">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                </button>
                <button onClick={handleZoomIn} className="doc-modal-btn" title="Zoom In" aria-label="Zoom in">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6M7 10h6"/></svg>
                </button>
              </>
            )}
            <a href={documentUrl} download className="doc-modal-btn" title="Download" aria-label="Download">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            </a>
            <button onClick={onClose} className="doc-modal-btn close-btn" title="Close" aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
        <div className="doc-modal-body">
          {type === 'pdf' ? (
            <iframe 
              src={`${documentUrl}#toolbar=0`} 
              title={title}
              className="doc-modal-iframe"
            />
          ) : (
            <div className="doc-modal-img-container">
              <img 
                src={documentUrl} 
                alt={title} 
                className="doc-modal-img"
                style={{ 
                  transform: `scale(${scale})`, 
                  transition: scale === 1 ? 'transform 0.3s ease' : 'none' 
                }}
                draggable={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
