import React, { useEffect, useState } from 'react';
import '../styles/ContactModal.css';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let animationFrameId: number;

    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';
      // Reset form on open
      setStatus('idle');
      setStatusMessage('');
      setFormData({ email: '', subject: '', message: '' });

      animationFrameId = requestAnimationFrame(() => {
        setIsAnimating(true);
      });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setStatus('sending');
    setStatusMessage('Transmitting message...');

    try {
      // Using Web3Forms for silent background sending
      // The user needs to replace YOUR_ACCESS_KEY_HERE with their actual access key from web3forms.com
      const accessKey = 'fd11b1d6-ea74-42e0-9ad9-25371e569836';

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          email: formData.email,
          subject: formData.subject || 'New contact from Portfolio',
          message: formData.message,
          from_name: 'Portfolio Contact Form'
        })
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setStatusMessage('Message transmitted successfully.');
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setStatus('error');
        setStatusMessage(result.message || 'Transmission failed. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage('Network error. Transmission failed.');
    }
  };

  return (
    <div
      className={`contact-modal-overlay ${isAnimating ? 'open' : ''}`}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`contact-modal-content ${isAnimating ? 'open' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="contact-modal-header">
          <div className="contact-modal-title-area">
            <h3 className="contact-modal-title">SECURE COMMUNICATION CHANNEL</h3>
          </div>
          <div className="contact-modal-controls">
            <button onClick={onClose} className="contact-modal-btn close-btn" title="Close" aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        <form className="contact-modal-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="to-email">To</label>
            <input
              type="email"
              id="to-email"
              className="form-input"
              value="pavandr715@gmail.com"
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="from-email">From (Your Email)</label>
            <input
              type="email"
              id="from-email"
              name="email"
              className="form-input"
              placeholder="guest@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={status === 'sending' || status === 'success'}
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="form-input"
              placeholder="Inquiry / Opportunity"
              value={formData.subject}
              onChange={handleInputChange}
              disabled={status === 'sending' || status === 'success'}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              className="form-textarea"
              placeholder="Enter your message here..."
              value={formData.message}
              onChange={handleInputChange}
              required
              disabled={status === 'sending' || status === 'success'}
            ></textarea>
          </div>

          <div className="form-footer">
            {statusMessage && (
              <div className={`status-message ${status}`}>
                {status === 'sending' ? '> ' : ''}{statusMessage}
              </div>
            )}
            <button
              type="submit"
              className="contact-send-btn"
              disabled={status === 'sending' || status === 'success' || !formData.email || !formData.message}
            >
              <span className="cmd-prompt">&gt;</span>
              {status === 'sending' ? 'TRANSMITTING...' : 'SEND MESSAGE'}
              <span className="cursor-blink">_</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
