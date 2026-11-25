import { useState } from 'react';
import { Mail, FileText, Copy, Check, Send, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { profile } from '../../data/profile';
import { SectionHeader } from '../ui/SectionHeader';
import { GlassPanel } from '../ui/GlassPanel';
import { Button } from '../ui/Button';
import { MotionWrapper } from '../motion/MotionWrapper';
import { fadeUp } from '../motion/variants';
import './ContactSection.css';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.links.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section className="contact-section section" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <SectionHeader
          coordinate="§05"
          label="Contact"
          headline="Let's Build Together"
          subtext="Open for AI engineering roles, technical co-building, and high-impact advisory."
        />

        <MotionWrapper variants={fadeUp} className="contact-section__wrapper">
          <GlassPanel className="contact-panel" accentBorder>
            <div className="contact-panel__grid">
              
              {/* Direct Info & Channels */}
              <div className="contact-panel__info">
                <h3 className="contact-panel__title">Direct Channels</h3>
                <p className="contact-panel__body">
                  Whether you are scaling an AI engineering team, shipping a new product, or looking for technical ownership — feel free to reach out directly.
                </p>

                {/* Email Box with One-click Copy */}
                <div className="contact-panel__email-box">
                  <div className="contact-panel__email-left">
                    <Mail className="contact-panel__email-icon" size={18} />
                    <span className="contact-panel__email-text">{profile.links.email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="contact-panel__copy-btn"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="contact-panel__check-icon" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Social & Resume Links */}
                <div className="contact-panel__links">
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-panel__social-item"
                  >
                    <div className="contact-panel__social-icon">
                      <LinkedinIcon size={16} />
                    </div>
                    <div className="contact-panel__social-meta">
                      <span className="contact-panel__social-label">LinkedIn</span>
                      <span className="contact-panel__social-sub">Connect professionally</span>
                    </div>
                    <ArrowUpRight size={14} className="contact-panel__arrow" />
                  </a>

                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-panel__social-item"
                  >
                    <div className="contact-panel__social-icon">
                      <GithubIcon size={16} />
                    </div>
                    <div className="contact-panel__social-meta">
                      <span className="contact-panel__social-label">GitHub</span>
                      <span className="contact-panel__social-sub">Inspect codebase & projects</span>
                    </div>
                    <ArrowUpRight size={14} className="contact-panel__arrow" />
                  </a>

                  <a
                    href={profile.links.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-panel__social-item"
                  >
                    <div className="contact-panel__social-icon">
                      <FileText size={16} />
                    </div>
                    <div className="contact-panel__social-meta">
                      <span className="contact-panel__social-label">Curriculum Vitae</span>
                      <span className="contact-panel__social-sub">PDF resume download</span>
                    </div>
                    <ArrowUpRight size={14} className="contact-panel__arrow" />
                  </a>
                </div>
              </div>

              {/* Quick Contact Form */}
              <div className="contact-panel__form-col">
                <h3 className="contact-panel__title">Send a Message</h3>
                
                {submitted ? (
                  <div className="contact-panel__success">
                    <div className="contact-panel__success-icon">
                      <Check size={24} />
                    </div>
                    <h4>Message Received</h4>
                    <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="contact-form__field">
                      <label htmlFor="contact-name" className="contact-form__label">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="contact-form__input"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="contact-form__field">
                      <label htmlFor="contact-email" className="contact-form__label">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        className="contact-form__input"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="contact-form__field">
                      <label htmlFor="contact-message" className="contact-form__label">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        placeholder="Tell me about the role, project, or idea..."
                        className="contact-form__textarea"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <Button variant="primary" size="md" icon={<Send size={15} />}>
                      Send Message
                    </Button>
                  </form>
                )}
              </div>

            </div>
          </GlassPanel>
        </MotionWrapper>
      </div>
    </section>
  );
}