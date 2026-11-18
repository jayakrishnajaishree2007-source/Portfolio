export interface DirtyDozenCase {
  id: number;
  name: string;
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  expected: 'PERMISSION_DENIED';
  payload?: Record<string, unknown>;
  uid?: string | null;
  emailVerified?: boolean;
}

export const DIRTY_DOZEN_CASES: DirtyDozenCase[] = [
  {
    id: 1,
    name: 'Unauthenticated profile create',
    path: '/users/user123',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    uid: null,
  },
  {
    id: 2,
    name: 'Cross-user profile spoofing',
    path: '/users/victimUid',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    uid: 'attackerUid',
    emailVerified: true,
    payload: { uid: 'victimUid' },
  },
  {
    id: 3,
    name: 'Shadow update ghost field injection (isAdmin)',
    path: '/users/user123',
    operation: 'update',
    expected: 'PERMISSION_DENIED',
    uid: 'user123',
    emailVerified: true,
    payload: { isAdmin: true },
  },
  {
    id: 4,
    name: 'Unverified email inquiry submission',
    path: '/inquiries/inq01',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    uid: 'user123',
    emailVerified: false,
  },
  {
    id: 5,
    name: 'Client-forged createdAt timestamp',
    path: '/users/user123',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    uid: 'user123',
    emailVerified: true,
    payload: { createdAt: '1999-01-01T00:00:00Z' },
  },
  {
    id: 6,
    name: 'Oversized inquiry message (> 2000 chars)',
    path: '/inquiries/inq02',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    uid: 'user123',
    emailVerified: true,
    payload: { message: 'x'.repeat(2005) },
  },
  {
    id: 7,
    name: 'Path variable ID poisoning',
    path: '/inquiries/invalid$id!',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    uid: 'user123',
    emailVerified: true,
  },
  {
    id: 8,
    name: 'Orphaned bookmark without parent user doc',
    path: '/users/userNoDoc/bookmarks/aether-routine',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    uid: 'userNoDoc',
    emailVerified: true,
  },
  {
    id: 9,
    name: 'Disallowed projectId enum in bookmark',
    path: '/users/user123/bookmarks/nonexistent-project',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    uid: 'user123',
    emailVerified: true,
  },
  {
    id: 10,
    name: 'Cross-user inquiry PII read',
    path: '/inquiries/otherUserInquiry',
    operation: 'get',
    expected: 'PERMISSION_DENIED',
    uid: 'user123',
    emailVerified: true,
  },
  {
    id: 11,
    name: 'Non-admin inquiry status shortcutting to reviewed',
    path: '/inquiries/inq01',
    operation: 'update',
    expected: 'PERMISSION_DENIED',
    uid: 'user123',
    emailVerified: true,
    payload: { status: 'reviewed' },
  },
  {
    id: 12,
    name: 'Unfiltered list query across inquiries by non-admin',
    path: '/inquiries',
    operation: 'list',
    expected: 'PERMISSION_DENIED',
    uid: 'user123',
    emailVerified: true,
  },
];
