import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Database,
  Github,
  Globe,
  Inbox,
  Linkedin,
  Mail,
  Send,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { PROFILE } from '../data/portfolioData';
import { getAccessToken, sendGmailMessage } from '../lib/gmailAuth';
import {
  GmailConfirmModal,
  GmailWorkspacePanel,
  GoogleSignInButton,
  PendingConfirmation,
} from './GmailWorkspacePanel';
import { MagneticButton } from './MagneticButton';
import { SectionId } from './Navbar';

const TOPIC_PRESETS = [
  'Website Studio · aethelontech.in',
  'Networking & Segment Routing',
  'AI / ML Collaboration',
  'Internship / Software Role',
];

interface ContactSectionProps {
  onNavigate: (id: SectionId) => void;
}

export function ContactSection({ onNavigate }: ContactSectionProps) {
  const {
    user,
    isAdmin,
    hasGmailAccess,
    isLoggingIn,
    login,
    logout,
    invalidateGmailSession,
    inquiries,
    submitFirestoreInquiry,
    markInquiryReviewed,
  } = useFirebase();

  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'error' | 'success';
    text: string;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<'inquiry' | 'gmail' | 'history'>('inquiry');
  const [pendingConfirm, setPendingConfirm] = useState<PendingConfirmation | null>(null);

  // Auto-fill name/email politely when user signs in if fields are still empty
  useEffect(() => {
    if (user) {
      if (!name && user.displayName) setName(user.displayName);
      if (!email && user.email) setEmail(user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  const handleGoogleLogin = async () => {
    setStatusMessage(null);
    try {
      await login();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Google sign-in was cancelled or failed.';
      setStatusMessage({ type: 'error', text: msg });
    }
  };

  const handleAuthExpired = useCallback(() => {
    invalidateGmailSession();
    setStatusMessage({
      type: 'error',
      text: 'Your Gmail OAuth token expired. Please sign in with Google again to use Gmail.',
    });
  }, [invalidateGmailSession]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim().slice(0, 100);
    const trimmedEmail = email.trim().slice(0, 160);
    const trimmedSubject = subject.trim().slice(0, 160);
    const trimmedMsg = message.trim().slice(0, 2000);

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

    const finalSubject = (trimmedSubject || `Portfolio Inquiry from ${trimmedName}`).slice(0, 160);
    const finalBody = `Name: ${trimmedName}\nReply-To: ${trimmedEmail}\n\n${trimmedMsg}`;

    const token = await getAccessToken();
    if (token && user && hasGmailAccess) {
      setPendingConfirm({
        title: 'Send Inquiry via Gmail & Save Record?',
        description: `To: ${PROFILE.email}\nSubject: ${finalSubject}\nFrom: ${user.email ?? 'Your Gmail account'}\n\nSend directly via Gmail and save a persistent copy in Firestore?`,
        confirmLabel: 'Send & Save',
        onConfirm: async () => {
          const activeToken = await getAccessToken();
          if (!activeToken) {
            handleAuthExpired();
            return;
          }
          await sendGmailMessage(activeToken, {
            to: PROFILE.email,
            subject: finalSubject,
            body: finalBody,
          });
          await submitFirestoreInquiry({
            senderName: trimmedName,
            senderEmail: trimmedEmail,
            topic: finalSubject,
            message: trimmedMsg,
            deliveryMethod: 'gmail-and-firestore',
          });
          setStatusMessage({
            type: 'success',
            text: `Sent to ${PROFILE.email} via Gmail and archived in Firestore.`,
          });
          setSubject('');
          setMessage('');
        },
      });
      return;
    }

    if (user && user.emailVerified) {
      setSubmitting(true);
      try {
        await submitFirestoreInquiry({
          senderName: trimmedName,
          senderEmail: trimmedEmail,
          topic: finalSubject,
          message: trimmedMsg,
          deliveryMethod: 'firestore',
        });
        setStatusMessage({
          type: 'success',
          text: 'Inquiry saved to Firestore! View it anytime in the Saved tab.',
        });
        setSubject('');
        setMessage('');
      } catch (err) {
        setStatusMessage({
          type: 'error',
          text: err instanceof Error ? err.message : 'Could not save inquiry.',
        });
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // Fallback when signed out: open user's default mail draft
    const mailtoHref = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      finalSubject
    )}&body=${encodeURIComponent(finalBody)}`;

    const link = document.createElement('a');
    link.href = mailtoHref;
    link.click();

    setStatusMessage({
      type: 'success',
      text: `Email draft prepared for ${PROFILE.email}. Sign in with Google to send via Gmail and save inquiries.`,
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
            <div className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#00D9FF]">
              <span>07 / Final Composition</span>
            </div>

            <h2 className="font-display text-5xl sm:text-7xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-white">
              <span className="text-[#00D9FF]">Let&apos;s Build</span>
              <span className="block text-white">
                Together<span className="text-[#00D9FF]">.</span>
              </span>
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-[#D5DDE8] max-w-lg">
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

          {/* Right Console: Direct Inquiry Form + Gmail Workspace + Firestore Inquiry History */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div
                role="tablist"
                aria-label="Contact, Gmail, and Saved Inquiries console"
                className="inline-flex border border-white/15 bg-[#0C0F15]"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'inquiry'}
                  onClick={() => setActiveTab('inquiry')}
                  className={`px-3.5 py-2 font-mono-tech text-xs uppercase tracking-wider flex items-center gap-2 transition-colors ${
                    activeTab === 'inquiry'
                      ? 'bg-[#00D9FF] text-[#080A0E] font-semibold'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Direct Inquiry</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'gmail'}
                  onClick={() => setActiveTab('gmail')}
                  className={`px-3.5 py-2 font-mono-tech text-xs uppercase tracking-wider flex items-center gap-2 transition-colors ${
                    activeTab === 'gmail'
                      ? 'bg-[#00D9FF] text-[#080A0E] font-semibold'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  <Inbox className="w-3.5 h-3.5" />
                  <span>Gmail</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'history'}
                  onClick={() => setActiveTab('history')}
                  className={`px-3.5 py-2 font-mono-tech text-xs uppercase tracking-wider flex items-center gap-2 transition-colors ${
                    activeTab === 'history'
                      ? 'bg-[#00D9FF] text-[#080A0E] font-semibold'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Saved ({inquiries.length})</span>
                </button>
              </div>

              {user && (
                <span className="font-mono-tech text-[11px] text-[#00D9FF] truncate max-w-[220px]">
                  {hasGmailAccess ? 'Gmail + Cloud Synced' : 'Cloud Synced'}: {user.email}
                </span>
              )}
            </div>

            {activeTab === 'gmail' ? (
              <GmailWorkspacePanel
                user={user}
                needsAuth={!user || !hasGmailAccess}
                isLoggingIn={isLoggingIn}
                onLogin={() => void handleGoogleLogin()}
                onLogout={() => void logout()}
                onAuthExpired={handleAuthExpired}
                onRequestConfirm={setPendingConfirm}
                defaultRecipient={PROFILE.email}
              />
            ) : activeTab === 'history' ? (
              <div className="p-6 sm:p-8 border border-white/15 bg-[#0C0F15]/95 space-y-4 shadow-[0_28px_80px_rgba(0,0,0,0.65)]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div>
                    <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#00D9FF]">
                      Firestore Inquiry Log
                    </p>
                    <h3 className="font-display text-lg font-bold text-white mt-0.5">
                      {isAdmin ? 'All Portfolio Inquiries' : 'Your Submitted Inquiries'}
                    </h3>
                  </div>
                  {user && (
                    <button
                      type="button"
                      onClick={() => void logout()}
                      className="px-3 py-1.5 border border-white/15 bg-[#10131A] hover:border-white/40 font-mono-tech text-[10px] uppercase tracking-wider text-[#94A3B8] hover:text-white"
                    >
                      Sign out
                    </button>
                  )}
                </div>

                {!user ? (
                  <div className="space-y-4 py-4">
                    <p className="text-sm text-[#94A3B8]">
                      Sign in with Google to view your saved portfolio inquiries stored in Firestore.
                    </p>
                    <GoogleSignInButton
                      onClick={() => void handleGoogleLogin()}
                      disabled={isLoggingIn}
                    />
                  </div>
                ) : inquiries.length === 0 ? (
                  <p className="font-mono-tech text-xs text-[#94A3B8] py-6">
                    No inquiries archived yet. Send one from Direct Inquiry to persist it here.
                  </p>
                ) : (
                  <div
                    data-lenis-prevent
                    className="max-h-80 overflow-y-auto space-y-3 pr-1"
                  >
                    {inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="p-4 border border-white/10 bg-[#10131A] space-y-2"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-display text-sm font-bold text-white">
                            {inq.topic || 'Portfolio Inquiry'}
                          </span>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 font-mono-tech text-[10px] uppercase tracking-wider border ${
                                inq.status === 'reviewed'
                                  ? 'border-[#00D9FF] bg-[#0D1E26] text-[#00D9FF]'
                                  : 'border-white/20 bg-[#080A0E] text-[#CBD5E1]'
                              }`}
                            >
                              {inq.status}
                            </span>
                            {isAdmin && inq.status !== 'reviewed' && (
                              <button
                                type="button"
                                onClick={() => void markInquiryReviewed(inq.id)}
                                className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#00D9FF] hover:bg-white text-[#080A0E] font-mono-tech text-[10px] font-semibold uppercase tracking-wider transition-colors"
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Mark Reviewed</span>
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="font-mono-tech text-[11px] text-[#94A3B8]">
                          {inq.senderName} · {inq.senderEmail} · {inq.deliveryMethod}
                        </p>
                        <p className="text-xs text-[#CBD5E1] whitespace-pre-wrap leading-relaxed">
                          {inq.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <form
                onSubmit={(e) => void handleSubmit(e)}
                noValidate
                className="p-7 sm:p-9 border border-white/15 bg-[#0C0F15]/95 text-[#F1F5F9] space-y-5 shadow-[0_28px_80px_rgba(0,0,0,0.65)]"
              >
                {(!user || !hasGmailAccess) && (
                  <div className="p-3.5 border border-white/10 bg-[#10131A] flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-[#CBD5E1]">
                      {user
                        ? 'Reconnect Google to also send directly via Gmail API (Firestore saving is active).'
                        : 'Sign in with Google to send via Gmail API & persist inquiries to Firestore.'}
                    </p>
                    <GoogleSignInButton
                      onClick={() => void handleGoogleLogin()}
                      disabled={isLoggingIn}
                    />
                  </div>
                )}

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
                      maxLength={100}
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
                      maxLength={160}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      required
                      className="w-full px-4 py-3 border border-white/15 bg-[#10131A] text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#00D9FF]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label
                      htmlFor="contact-subject"
                      className="block font-mono-tech text-xs uppercase tracking-wider text-[#CBD5E1] font-semibold"
                    >
                      Topic
                    </label>
                    <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#64748B]">
                      Quick Select
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5" role="group" aria-label="Quick topic presets">
                    {TOPIC_PRESETS.map((preset) => {
                      const isActive = subject === preset;
                      return (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setSubject(isActive ? '' : preset)}
                          aria-pressed={isActive}
                          className={`px-2.5 py-1 border font-mono-tech text-[10px] uppercase tracking-wider transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#00D9FF] ${
                            isActive
                              ? 'border-[#00D9FF] bg-[#00D9FF] text-[#080A0E] font-semibold'
                              : 'border-white/15 bg-[#10131A] text-[#94A3B8] hover:border-[#00D9FF]/60 hover:text-white'
                          }`}
                        >
                          {preset}
                        </button>
                      );
                    })}
                  </div>
                  <input
                    id="contact-subject"
                    type="text"
                    maxLength={160}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Web Development · Networking · AI/ML"
                    className="w-full px-4 py-3 border border-white/15 bg-[#10131A] text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#00D9FF]"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="contact-message"
                      className="block font-mono-tech text-xs uppercase tracking-wider text-[#CBD5E1] font-semibold"
                    >
                      Message
                    </label>
                    <span className="font-mono-tech text-[10px] text-[#94A3B8] tabular-nums">
                      {message.length}/2000
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    rows={4}
                    maxLength={2000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Project brief, technical discussion, or internship opportunity..."
                    required
                    className="w-full px-4 py-3 border border-white/15 bg-[#10131A] text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#00D9FF] resize-y"
                  />
                </div>

                {statusMessage && (
                  <p
                    role={statusMessage.type === 'error' ? 'alert' : 'status'}
                    className={`flex items-start gap-2.5 text-xs sm:text-sm font-mono-tech p-3 border ${
                      statusMessage.type === 'error'
                        ? 'border-white/25 bg-[#161B24] text-[#CBD5E1]'
                        : 'border-[#00D9FF]/60 bg-[#0D1E26] text-[#00D9FF]'
                    }`}
                  >
                    {statusMessage.type === 'error' ? (
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-white" aria-hidden="true" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#00D9FF]" aria-hidden="true" />
                    )}
                    <span>{statusMessage.text}</span>
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <span className="font-mono-tech text-xs text-[#94A3B8]">
                    {hasGmailAccess && user
                      ? `Sends via Gmail API & saves to Firestore`
                      : user
                        ? `Saves directly to Firestore`
                        : `Opens mail draft to ${PROFILE.email}`}
                  </span>

                  <MagneticButton strength={0.18}>
                    <button
                      type="submit"
                      disabled={submitting}
                      data-cursor="SEND"
                      className="px-6 py-3.5 bg-[#00D9FF] hover:bg-white text-[#080A0E] font-mono-tech text-xs font-semibold uppercase tracking-[0.18em] flex items-center gap-2.5 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                    >
                      <span>
                        {submitting
                          ? 'Saving...'
                          : hasGmailAccess && user
                            ? 'Send via Gmail'
                            : user
                              ? 'Save Inquiry'
                              : 'Send Message'}
                      </span>
                      <Send className="w-4 h-4" />
                    </button>
                  </MagneticButton>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Minimal Obsidian Studio Footer */}
        <footer className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-display text-xl font-extrabold tracking-tight text-white">
              {PROFILE.brand}
            </p>
            <p className="font-mono-tech text-xs text-[#7D8CA3] mt-1">
              {PROFILE.footerTagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs font-mono-tech uppercase tracking-wider text-[#9FB0C7]">
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

      <GmailConfirmModal
        confirmation={pendingConfirm}
        onClose={() => setPendingConfirm(null)}
      />
    </section>
  );
}
