import { ArrowUpRight, Check, Copy, Github, Globe, Linkedin, Mail, Send } from 'lucide-react';
import { useState } from 'react';
import { PROFILE } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';
import { SectionId } from './Navbar';

interface ContactSectionProps {
  onNavigate: (id: SectionId) => void;
}

export function ContactSection({ onNavigate }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState<{
    type: 'error' | 'success';
    text: string;
  } | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMsg = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMsg) {
      setStatusMessage({
        type: 'error',
        text: 'Please fill in your name, email address, and message.',
      });
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    if (!emailValid) {
      setStatusMessage({
        type: 'error',
        text: 'Please enter a valid email address.',
      });
      return;
    }

    const mailSubject = encodeURIComponent(
      subject.trim() || `Portfolio Inquiry from ${trimmedName}`
    );
    const mailBody = encodeURIComponent(
      `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\n${trimmedMsg}`
    );
    const mailtoHref = `mailto:${PROFILE.email}?subject=${mailSubject}&body=${mailBody}`;

    const link = document.createElement('a');
    link.href = mailtoHref;
    link.click();

    setStatusMessage({
      type: 'success',
      text: `Email draft prepared for ${PROFILE.email}. If your mail client did not open, copy the address directly.`,
    });
  };

  return (
    <section
      id="contact"
      className="contact-finale relative pt-36 sm:pt-44 pb-12 text-[#F1F5F9]"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Bold Obsidian Final Composition (Negative Space Above Reveals Converging 3D JK. Particles) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-white/15">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.22em] text-[#00D9FF]">
              <span className="w-2 h-2 bg-[#00D9FF] inline-block" aria-hidden="true" />
              <span>07 / Final Composition</span>
            </div>

            <h2 className="font-display text-5xl sm:text-7xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-white">
              <span className="chrome-text">Let&apos;s Build</span>
              <span className="block text-white">
                Together<span className="text-[#00D9FF]">.</span>
              </span>
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8] max-w-lg">
              Looking for custom website development, or collaborating on computer networking and applied AI/ML systems? Visit my official website building studio at{' '}
              <a
                href={PROFILE.servicesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-tech text-[#00D9FF] underline underline-offset-4 hover:text-white transition-colors"
              >
                {PROFILE.servicesDomain}
              </a>
              .
            </p>

            {/* Direct Obsidian Contact Matrix */}
            <div className="space-y-3 pt-2 max-w-lg">
              <div className="p-4 border border-white/15 bg-[#0C0F15]/95 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Mail className="w-4 h-4 text-[#00D9FF] shrink-0" />
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="text-sm font-mono-tech text-white hover:text-[#00D9FF] transition-colors truncate"
                  >
                    {PROFILE.email}
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  data-cursor="COPY"
                  className="px-3 py-1.5 bg-[#00D9FF] hover:bg-white text-[#080A0E] font-mono-tech text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="LINKEDIN"
                  className="p-4 border border-white/15 bg-[#0C0F15]/95 hover:border-[#00D9FF] flex items-center justify-between gap-2 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-[#00D9FF]" />
                    <span className="font-mono-tech text-xs uppercase tracking-wider text-white">
                      LinkedIn
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#00D9FF]" />
                </a>

                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="GITHUB"
                  className="p-4 border border-white/15 bg-[#0C0F15]/95 hover:border-[#00D9FF] flex items-center justify-between gap-2 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-[#CBD5E1]" />
                    <span className="font-mono-tech text-xs uppercase tracking-wider text-white">
                      GitHub
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#00D9FF]" />
                </a>
              </div>

              <a
                href={PROFILE.servicesUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="AETHELON"
                className="p-4 border border-[#00D9FF]/35 bg-[#10131A]/95 hover:border-[#00D9FF] flex items-center justify-between gap-3 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Globe className="w-4 h-4 text-[#00D9FF] shrink-0" />
                  <div className="min-w-0">
                    <p className="font-mono-tech text-[10px] uppercase tracking-widest text-[#00D9FF]">
                      Official Website Building Studio
                    </p>
                    <p className="font-mono-tech text-xs text-white truncate">
                      {PROFILE.servicesDomain}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#00D9FF] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Dark Graphite Studio Form */}
          <div className="lg:col-span-6">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-7 sm:p-9 border border-white/15 bg-[#0C0F15]/95 text-[#F1F5F9] space-y-5 shadow-[0_28px_80px_rgba(0,0,0,0.65)]"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="block font-mono-tech text-xs uppercase tracking-wider text-[#CBD5E1] font-semibold"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Mercer"
                    required
                    className="w-full px-4 py-3 border border-white/15 bg-[#10131A] text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#00D9FF]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="block font-mono-tech text-xs uppercase tracking-wider text-[#CBD5E1] font-semibold"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    required
                    className="w-full px-4 py-3 border border-white/15 bg-[#10131A] text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#00D9FF]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-subject"
                  className="block font-mono-tech text-xs uppercase tracking-wider text-[#CBD5E1] font-semibold"
                >
                  Topic
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Web Development · Networking · AI/ML"
                  className="w-full px-4 py-3 border border-white/15 bg-[#10131A] text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#00D9FF]"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block font-mono-tech text-xs uppercase tracking-wider text-[#CBD5E1] font-semibold"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Project brief, technical discussion, or internship opportunity..."
                  required
                  className="w-full px-4 py-3 border border-white/15 bg-[#10131A] text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#00D9FF] resize-y"
                />
              </div>

              {statusMessage && (
                <p
                  role="status"
                  className={`text-xs sm:text-sm font-mono-tech p-3 border ${
                    statusMessage.type === 'error'
                      ? 'border-white/25 bg-[#161B24] text-[#CBD5E1]'
                      : 'border-[#00D9FF]/60 bg-[#0D1E26] text-[#00D9FF]'
                  }`}
                >
                  {statusMessage.text}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <span className="font-mono-tech text-xs text-[#94A3B8]">
                  Opens mail draft to {PROFILE.email}
                </span>

                <MagneticButton strength={0.18}>
                  <button
                    type="submit"
                    data-cursor="SEND"
                    className="px-6 py-3.5 bg-[#00D9FF] hover:bg-white text-[#080A0E] font-mono-tech text-xs font-semibold uppercase tracking-[0.18em] flex items-center gap-2.5 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </MagneticButton>
              </div>
            </form>
          </div>
        </div>

        {/* Minimal Obsidian Studio Footer */}
        <footer className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-display text-xl font-extrabold tracking-tight text-white">
              {PROFILE.brand}
            </p>
            <p className="font-mono-tech text-xs text-[#94A3B8] mt-1">
              {PROFILE.footerTagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs font-mono-tech uppercase tracking-wider text-[#94A3B8]">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="hover:text-[#00D9FF] transition-colors"
            >
              Top
            </button>
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="hover:text-[#00D9FF] transition-colors"
            >
              Projects
            </button>
            <a
              href={PROFILE.servicesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00D9FF] transition-colors"
            >
              {PROFILE.servicesDomain}
            </a>
            <span>© 2026 {PROFILE.fullName}</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
