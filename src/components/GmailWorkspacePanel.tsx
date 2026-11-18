import { User } from 'firebase/auth';
import {
  FileText,
  Inbox,
  LogOut,
  RefreshCw,
  Search,
  Send,
  Star,
  Trash2,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import {
  createGmailDraft,
  getAccessToken,
  GmailMessageSummary,
  listGmailMessages,
  sendGmailMessage,
  toggleGmailStar,
  trashGmailMessage,
} from '../lib/gmailAuth';

export function GoogleSignInButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="gsi-material-button"
    >
      <div className="gsi-material-button-state" />
      <div className="gsi-material-button-content-wrapper">
        <div className="gsi-material-button-icon">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            style={{ display: 'block' }}
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
        </div>
        <span className="gsi-material-button-contents">
          {disabled ? 'Connecting...' : 'Sign in with Google'}
        </span>
      </div>
    </button>
  );
}

export interface PendingConfirmation {
  title: string;
  description: string;
  confirmLabel: string;
  destructive?: boolean;
  onConfirm: () => Promise<void>;
}

export function GmailConfirmModal({
  confirmation,
  onClose,
}: {
  confirmation: PendingConfirmation | null;
  onClose: () => void;
}) {
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!confirmation) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !busy) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [confirmation, busy, onClose]);

  if (!confirmation) return null;

  const handleConfirm = async () => {
    setBusy(true);
    try {
      await confirmation.onConfirm();
      onClose();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gmail-confirm-title"
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      onClick={() => !busy && onClose()}
    >
      <div
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md border border-white/20 bg-[#0C0F15] p-6 space-y-5 shadow-[0_24px_75px_rgba(0,0,0,0.85)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
          <div>
            <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#00D9FF]">
              Gmail Action Confirmation
            </p>
            <h4 id="gmail-confirm-title" className="font-display text-xl font-bold text-white mt-1">
              {confirmation.title}
            </h4>
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={onClose}
            aria-label="Close confirmation dialog"
            className="p-1.5 border border-white/15 bg-[#10131A] text-[#94A3B8] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm leading-relaxed text-[#CBD5E1] whitespace-pre-line">
          {confirmation.description}
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            disabled={busy}
            onClick={onClose}
            className="px-4 py-2 border border-white/20 bg-[#10131A] hover:border-white/40 text-xs font-mono-tech uppercase tracking-wider text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={handleConfirm}
            className={`px-4 py-2 text-xs font-mono-tech font-semibold uppercase tracking-wider transition-colors ${
              confirmation.destructive
                ? 'bg-red-500 hover:bg-red-400 text-white'
                : 'bg-[#00D9FF] hover:bg-white text-[#080A0E]'
            }`}
          >
            {busy ? 'Processing...' : confirmation.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

interface GmailWorkspacePanelProps {
  user: User | null;
  needsAuth: boolean;
  isLoggingIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onAuthExpired: () => void;
  onRequestConfirm: (conf: PendingConfirmation) => void;
  defaultRecipient: string;
}

const LABELS = [
  { id: 'INBOX', label: 'Inbox' },
  { id: 'SENT', label: 'Sent' },
  { id: 'STARRED', label: 'Starred' },
  { id: 'DRAFT', label: 'Drafts' },
];

export function GmailWorkspacePanel({
  user,
  needsAuth,
  isLoggingIn,
  onLogin,
  onLogout,
  onAuthExpired,
  onRequestConfirm,
  defaultRecipient,
}: GmailWorkspacePanelProps) {
  const [activeLabel, setActiveLabel] = useState('INBOX');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<GmailMessageSummary[]>([]);
  const [selectedMsg, setSelectedMsg] = useState<GmailMessageSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [composeOpen, setComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState(defaultRecipient);
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');

  const loadMessages = useCallback(
    async (label = activeLabel, query = searchQuery) => {
      const token = await getAccessToken();
      if (!token) {
        onAuthExpired();
        return;
      }
      setLoading(true);
      setFeedback(null);
      try {
        const list = await listGmailMessages(token, {
          labelId: label,
          query,
          maxResults: 8,
        });
        setMessages(list);
        setSelectedMsg((prev) =>
          prev ? list.find((m) => m.id === prev.id) ?? list[0] ?? null : list[0] ?? null
        );
      } catch (err) {
        const apiErr = err as Error & { status?: number };
        if (apiErr.status === 401) {
          onAuthExpired();
        } else {
          setFeedback(apiErr.message || 'Failed to load Gmail messages.');
        }
      } finally {
        setLoading(false);
      }
    },
    [activeLabel, searchQuery, onAuthExpired]
  );

  useEffect(() => {
    if (!needsAuth && user) {
      loadMessages(activeLabel, '');
    }
    // Load on sign-in or label change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needsAuth, user, activeLabel]);

  if (needsAuth || !user) {
    return (
      <div className="p-7 sm:p-9 border border-white/15 bg-[#0C0F15]/95 space-y-5">
        <div className="space-y-2">
          <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#00D9FF]">
            Gmail Workspace Integration
          </p>
          <h3 className="font-display text-2xl font-bold text-white">
            Connect Your Gmail Account
          </h3>
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            Sign in with Google to browse your inbox, search messages, save drafts, or send emails directly from this workspace.
          </p>
        </div>

        <GoogleSignInButton onClick={onLogin} disabled={isLoggingIn} />
      </div>
    );
  }

  const handleRequestSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo.trim() || !composeSubject.trim() || !composeBody.trim()) {
      setFeedback('Please enter recipient, subject, and message body.');
      return;
    }

    onRequestConfirm({
      title: 'Send Email via Gmail?',
      description: `To: ${composeTo.trim()}\nSubject: ${composeSubject.trim()}\n\nThis will immediately send the email from ${user.email ?? 'your Gmail account'}.`,
      confirmLabel: 'Send Email',
      onConfirm: async () => {
        const token = await getAccessToken();
        if (!token) {
          onAuthExpired();
          return;
        }
        await sendGmailMessage(token, {
          to: composeTo.trim(),
          subject: composeSubject.trim(),
          body: composeBody.trim(),
        });
        setFeedback(`Email sent to ${composeTo.trim()}.`);
        setComposeOpen(false);
        setComposeSubject('');
        setComposeBody('');
        await loadMessages(activeLabel, searchQuery);
      },
    });
  };

  const handleRequestDraft = () => {
    if (!composeTo.trim() && !composeSubject.trim() && !composeBody.trim()) {
      setFeedback('Enter recipient, subject, or message body to save a draft.');
      return;
    }

    onRequestConfirm({
      title: 'Save Draft in Gmail?',
      description: `Save draft addressed to "${composeTo.trim() || '(no recipient)'}" with subject "${composeSubject.trim() || '(no subject)'}" in your Gmail Drafts?`,
      confirmLabel: 'Save Draft',
      onConfirm: async () => {
        const token = await getAccessToken();
        if (!token) {
          onAuthExpired();
          return;
        }
        await createGmailDraft(token, {
          to: composeTo.trim(),
          subject: composeSubject.trim(),
          body: composeBody.trim(),
        });
        setFeedback('Draft saved to Gmail.');
        setComposeOpen(false);
        await loadMessages(activeLabel, searchQuery);
      },
    });
  };

  const handleRequestStar = (msg: GmailMessageSummary) => {
    onRequestConfirm({
      title: msg.isStarred ? 'Remove Star from Email?' : 'Star Email?',
      description: `${msg.isStarred ? 'Remove STARRED label from' : 'Add STARRED label to'} "${msg.subject}"?`,
      confirmLabel: msg.isStarred ? 'Remove Star' : 'Add Star',
      onConfirm: async () => {
        const token = await getAccessToken();
        if (!token) {
          onAuthExpired();
          return;
        }
        await toggleGmailStar(token, msg.id, msg.isStarred);
        await loadMessages(activeLabel, searchQuery);
      },
    });
  };

  const handleRequestTrash = (msg: GmailMessageSummary) => {
    onRequestConfirm({
      title: 'Move Email to Trash?',
      description: `Subject: ${msg.subject}\nFrom: ${msg.from}\n\nThis will move the selected message into your Gmail Trash.`,
      confirmLabel: 'Move to Trash',
      destructive: true,
      onConfirm: async () => {
        const token = await getAccessToken();
        if (!token) {
          onAuthExpired();
          return;
        }
        await trashGmailMessage(token, msg.id);
        setFeedback(`Moved "${msg.subject}" to Trash.`);
        setSelectedMsg(null);
        await loadMessages(activeLabel, searchQuery);
      },
    });
  };

  return (
    <div className="border border-white/15 bg-[#0C0F15]/95 p-5 sm:p-6 space-y-5 shadow-[0_28px_80px_rgba(0,0,0,0.65)]">
      {/* Connected Account Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <Inbox className="w-4 h-4 text-[#00D9FF] shrink-0" />
          <div className="min-w-0">
            <p className="font-mono-tech text-[10px] uppercase tracking-wider text-[#00D9FF]">
              Connected Gmail
            </p>
            <p className="font-mono-tech text-xs text-white truncate">
              {user.email ?? user.displayName ?? 'Authenticated Account'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setComposeOpen((prev) => !prev)}
            className="px-3 py-1.5 bg-[#00D9FF] hover:bg-white text-[#080A0E] font-mono-tech text-[11px] font-semibold uppercase tracking-wider transition-colors"
          >
            {composeOpen ? 'Close Compose' : 'Compose'}
          </button>
          <button
            type="button"
            onClick={() => loadMessages(activeLabel, searchQuery)}
            aria-label="Refresh Gmail messages"
            className="p-1.5 border border-white/15 bg-[#10131A] hover:border-[#00D9FF] text-[#CBD5E1] hover:text-[#00D9FF] transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            type="button"
            onClick={onLogout}
            aria-label="Sign out of Google"
            className="px-2.5 py-1.5 border border-white/15 bg-[#10131A] hover:border-white/40 text-[#94A3B8] hover:text-white font-mono-tech text-[10px] uppercase tracking-wider flex items-center gap-1 transition-colors"
          >
            <LogOut className="w-3 h-3" />
            <span>Sign out</span>
          </button>
        </div>
      </div>

      {feedback && (
        <p className="text-xs font-mono-tech p-2.5 border border-[#00D9FF]/40 bg-[#0D1E26] text-[#00D9FF]">
          {feedback}
        </p>
      )}

      {/* Compose Panel */}
      {composeOpen && (
        <form onSubmit={handleRequestSend} className="p-4 border border-[#00D9FF]/35 bg-[#10131A] space-y-3">
          <p className="font-mono-tech text-[10px] uppercase tracking-wider text-[#00D9FF]">
            New Gmail Message
          </p>
          <input
            type="email"
            value={composeTo}
            onChange={(e) => setComposeTo(e.target.value)}
            placeholder="Recipient email"
            className="w-full px-3 py-2 border border-white/15 bg-[#080A0E] text-xs text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#00D9FF]"
          />
          <input
            type="text"
            value={composeSubject}
            onChange={(e) => setComposeSubject(e.target.value)}
            placeholder="Subject"
            className="w-full px-3 py-2 border border-white/15 bg-[#080A0E] text-xs text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#00D9FF]"
          />
          <textarea
            rows={3}
            value={composeBody}
            onChange={(e) => setComposeBody(e.target.value)}
            placeholder="Write your email..."
            className="w-full px-3 py-2 border border-white/15 bg-[#080A0E] text-xs text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#00D9FF]"
          />
          <div className="flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleRequestDraft}
              className="px-3 py-2 border border-white/20 bg-[#080A0E] hover:border-[#00D9FF] text-white font-mono-tech text-[11px] uppercase tracking-wider flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Save Draft</span>
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#00D9FF] hover:bg-white text-[#080A0E] font-mono-tech text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </div>
        </form>
      )}

      {/* Label Filter & Search */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="flex flex-wrap gap-1.5">
          {LABELS.map((lbl) => (
            <button
              key={lbl.id}
              type="button"
              onClick={() => setActiveLabel(lbl.id)}
              className={`px-2.5 py-1.5 border font-mono-tech text-[10px] uppercase tracking-wider transition-colors ${
                activeLabel === lbl.id
                  ? 'border-[#00D9FF] bg-[#00D9FF] text-[#080A0E] font-semibold'
                  : 'border-white/15 bg-[#10131A] text-[#94A3B8] hover:text-white'
              }`}
            >
              {lbl.label}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            loadMessages(activeLabel, searchQuery);
          }}
          className="flex-1 flex gap-1.5"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mail..."
            className="flex-1 px-3 py-1.5 border border-white/15 bg-[#10131A] text-xs text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#00D9FF]"
          />
          <button
            type="submit"
            aria-label="Search Gmail"
            className="px-2.5 border border-white/15 bg-[#10131A] hover:border-[#00D9FF] text-[#CBD5E1] hover:text-[#00D9FF]"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Message List & Reader */}
      <div className="space-y-3">
        <div
          data-lenis-prevent
          className="max-h-52 overflow-y-auto border border-white/10 divide-y divide-white/10 bg-[#080A0E]"
        >
          {loading && messages.length === 0 ? (
            <p className="p-4 text-xs font-mono-tech text-[#94A3B8]">Loading messages...</p>
          ) : messages.length === 0 ? (
            <p className="p-4 text-xs font-mono-tech text-[#94A3B8]">
              No messages found in {activeLabel}.
            </p>
          ) : (
            messages.map((msg) => {
              const active = selectedMsg?.id === msg.id;
              return (
                <button
                  key={msg.id}
                  type="button"
                  onClick={() => setSelectedMsg(msg)}
                  className={`w-full text-left p-3 transition-colors flex items-start justify-between gap-2 ${
                    active ? 'bg-[#10131A] ring-1 ring-inset ring-[#00D9FF]/60' : 'hover:bg-[#0D1016]'
                  }`}
                >
                  <div className="min-w-0">
                    <p
                      className={`text-xs truncate ${
                        msg.isUnread ? 'font-bold text-white' : 'font-medium text-[#CBD5E1]'
                      }`}
                    >
                      {msg.subject}
                    </p>
                    <p className="font-mono-tech text-[10px] text-[#94A3B8] truncate mt-0.5">
                      {msg.from}
                    </p>
                  </div>
                  {msg.isStarred && <Star className="w-3.5 h-3.5 text-[#00D9FF] shrink-0 mt-0.5" />}
                </button>
              );
            })
          )}
        </div>

        {selectedMsg && (
          <div className="p-4 border border-white/10 bg-[#10131A] space-y-3">
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2.5">
              <div className="min-w-0">
                <h4 className="font-display text-sm font-bold text-white break-words">
                  {selectedMsg.subject}
                </h4>
                <p className="font-mono-tech text-[10px] text-[#94A3B8] mt-1 break-all">
                  From: {selectedMsg.from}
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleRequestStar(selectedMsg)}
                  aria-label={selectedMsg.isStarred ? 'Unstar message' : 'Star message'}
                  className={`p-1.5 border border-white/15 bg-[#080A0E] transition-colors ${
                    selectedMsg.isStarred
                      ? 'text-[#00D9FF] border-[#00D9FF]/50'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  <Star className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRequestTrash(selectedMsg)}
                  aria-label="Move message to Trash"
                  className="p-1.5 border border-white/15 bg-[#080A0E] text-[#94A3B8] hover:text-red-400 hover:border-red-400/50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div
              data-lenis-prevent
              className="max-h-36 overflow-y-auto text-xs text-[#CBD5E1] leading-relaxed whitespace-pre-wrap"
            >
              {selectedMsg.body}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
