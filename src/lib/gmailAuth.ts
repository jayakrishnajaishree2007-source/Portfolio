import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { auth } from './firebase';

export const SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.addons.current.action.compose',
  'https://www.googleapis.com/auth/gmail.addons.current.message.action',
  'https://www.googleapis.com/auth/gmail.addons.current.message.metadata',
  'https://www.googleapis.com/auth/gmail.addons.current.message.readonly',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.insert',
  'https://www.googleapis.com/auth/gmail.labels',
  'https://www.googleapis.com/auth/gmail.metadata',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.settings.basic',
  'https://www.googleapis.com/auth/gmail.settings.sharing',
];

const provider = new GoogleAuthProvider();
SCOPES.forEach((scope) => provider.addScope(scope));

// In-memory access token cache (never persisted to localStorage or sessionStorage)
let isSigningIn = false;
let cachedAccessToken: string | null = null;
const tokenListeners = new Set<(hasToken: boolean) => void>();

function notifyTokenListeners() {
  const active = Boolean(cachedAccessToken);
  tokenListeners.forEach((cb) => cb(active));
}

export const subscribeGmailToken = (cb: (hasToken: boolean) => void) => {
  tokenListeners.add(cb);
  return () => {
    tokenListeners.delete(cb);
  };
};

export const hasGmailToken = () => Boolean(cachedAccessToken);

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        onAuthSuccess?.(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        notifyTokenListeners();
        onAuthFailure?.();
      }
    } else {
      cachedAccessToken = null;
      notifyTokenListeners();
      onAuthFailure?.();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to retrieve OAuth access token from Google sign-in.');
    }
    cachedAccessToken = credential.accessToken;
    notifyTokenListeners();
    return { user: result.user, accessToken: cachedAccessToken };
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const clearCachedGmailToken = () => {
  cachedAccessToken = null;
  notifyTokenListeners();
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
  notifyTokenListeners();
};

export interface GmailMessageSummary {
  id: string;
  threadId: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  snippet: string;
  body: string;
  labelIds: string[];
  isUnread: boolean;
  isStarred: boolean;
}

function toBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(data: string): string {
  const normalized = data.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

interface GmailPayloadPart {
  mimeType?: string;
  body?: { data?: string };
  parts?: GmailPayloadPart[];
}

function extractPlainTextBody(payload?: GmailPayloadPart): string {
  if (!payload) return '';
  if (payload.mimeType === 'text/plain' && payload.body?.data) {
    return fromBase64Url(payload.body.data);
  }
  if (payload.parts) {
    for (const part of payload.parts) {
      const nested = extractPlainTextBody(part);
      if (nested) return nested;
    }
  }
  if (payload.body?.data) {
    return fromBase64Url(payload.body.data).replace(/<[^>]+>/g, ' ');
  }
  return '';
}

function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function encodeRfc2047(value: string): string {
  const cleaned = sanitizeHeader(value);
  if (/^[\x20-\x7E]*$/.test(cleaned)) return cleaned;
  const bytes = new TextEncoder().encode(cleaned);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `=?UTF-8?B?${btoa(binary)}?=`;
}

function buildRawMimeMessage(to: string, subject: string, body: string): string {
  const rawMime = [
    `To: ${sanitizeHeader(to)}`,
    `Subject: ${encodeRfc2047(subject)}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset="UTF-8"',
    '',
    body,
  ].join('\r\n');
  return toBase64Url(rawMime);
}

async function gmailFetch(path: string, accessToken: string, init?: RequestInit) {
  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => res.statusText);
    const error = new Error(`Gmail API error (${res.status}): ${errText}`) as Error & {
      status?: number;
    };
    error.status = res.status;
    throw error;
  }
  return res.json();
}

export async function listGmailMessages(
  accessToken: string,
  options: { labelId?: string; query?: string; maxResults?: number } = {}
): Promise<GmailMessageSummary[]> {
  const params = new URLSearchParams();
  params.set('maxResults', String(options.maxResults ?? 10));
  if (options.labelId && options.labelId !== 'ALL') {
    params.set('labelIds', options.labelId);
  }
  if (options.query?.trim()) {
    params.set('q', options.query.trim());
  }

  const listData = await gmailFetch(`/messages?${params.toString()}`, accessToken);
  const items: { id: string }[] = listData.messages ?? [];
  if (items.length === 0) return [];

  const details = await Promise.all(
    items.map((item) => gmailFetch(`/messages/${item.id}?format=full`, accessToken))
  );

  return details.map((msg) => {
    const headers: { name: string; value: string }[] = msg.payload?.headers ?? [];
    const getHeader = (name: string) =>
      headers.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value ?? '';
    const labelIds: string[] = msg.labelIds ?? [];
    const decodedBody = extractPlainTextBody(msg.payload);

    return {
      id: msg.id,
      threadId: msg.threadId,
      subject: getHeader('Subject') || '(No Subject)',
      from: getHeader('From') || 'Unknown Sender',
      to: getHeader('To') || '',
      date: getHeader('Date') || '',
      snippet: msg.snippet ?? '',
      body: decodedBody || msg.snippet || '',
      labelIds,
      isUnread: labelIds.includes('UNREAD'),
      isStarred: labelIds.includes('STARRED'),
    };
  });
}

export async function sendGmailMessage(
  accessToken: string,
  params: { to: string; subject: string; body: string }
) {
  const raw = buildRawMimeMessage(params.to, params.subject, params.body);
  return gmailFetch('/messages/send', accessToken, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ raw }),
  });
}

export async function createGmailDraft(
  accessToken: string,
  params: { to: string; subject: string; body: string }
) {
  const raw = buildRawMimeMessage(params.to, params.subject, params.body);
  return gmailFetch('/drafts', accessToken, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: { raw } }),
  });
}

export async function trashGmailMessage(accessToken: string, messageId: string) {
  return gmailFetch(`/messages/${messageId}/trash`, accessToken, {
    method: 'POST',
  });
}

export async function toggleGmailStar(
  accessToken: string,
  messageId: string,
  currentlyStarred: boolean
) {
  return gmailFetch(`/messages/${messageId}/modify`, accessToken, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      currentlyStarred ? { removeLabelIds: ['STARRED'] } : { addLabelIds: ['STARRED'] }
    ),
  });
}
