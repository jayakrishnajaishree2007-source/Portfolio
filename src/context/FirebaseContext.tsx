import { onAuthStateChanged, User } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ProjectItem } from '../data/portfolioData';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import {
  clearCachedGmailToken,
  googleSignIn,
  hasGmailToken,
  logout as signOutGoogle,
  subscribeGmailToken,
} from '../lib/gmailAuth';

export type LightingPreset = 'cyan' | 'tungsten' | 'chrome';
export type CameraMode = 'scroll' | 'orbit' | 'hero';

export interface StudioPreferences {
  preferredLighting: LightingPreset;
  preferredCameraMode: CameraMode;
}

export interface ProjectBookmarkRecord {
  ownerId: string;
  projectId: string;
  projectTitle: string;
  note: string;
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
}

export interface PortfolioInquiryRecord {
  id: string;
  ownerId: string;
  senderName: string;
  senderEmail: string;
  topic: string;
  message: string;
  deliveryMethod: 'firestore' | 'gmail-and-firestore';
  status: 'submitted' | 'reviewed';
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
}

const PORTFOLIO_ADMIN_EMAIL = 'jayakrishnajaishree2007@gmail.com';
const ALLOWED_PROJECT_IDS = new Set([
  'alumni-management-system',
  'student-module',
  'aether-routine',
  'predictive-te-sr',
]);

const DEFAULT_STUDIO_PREFS: StudioPreferences = {
  preferredLighting: 'cyan',
  preferredCameraMode: 'scroll',
};

interface FirebaseContextValue {
  user: User | null;
  authReady: boolean;
  isAdmin: boolean;
  hasGmailAccess: boolean;
  isLoggingIn: boolean;
  studioPrefs: StudioPreferences;
  bookmarks: Record<string, ProjectBookmarkRecord>;
  inquiries: PortfolioInquiryRecord[];
  login: () => Promise<User | null>;
  logout: () => Promise<void>;
  invalidateGmailSession: () => void;
  updateStudioPrefs: (partial: Partial<StudioPreferences>) => Promise<void>;
  toggleBookmark: (project: ProjectItem) => Promise<boolean>;
  saveBookmarkNote: (project: ProjectItem, note: string) => Promise<void>;
  submitFirestoreInquiry: (payload: {
    senderName: string;
    senderEmail: string;
    topic: string;
    message: string;
    deliveryMethod: 'firestore' | 'gmail-and-firestore';
  }) => Promise<string>;
  markInquiryReviewed: (inquiryId: string) => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextValue | null>(null);

async function ensureUserProfileDoc(currentUser: User) {
  const userPath = `users/${currentUser.uid}`;
  const userRef = doc(db, 'users', currentUser.uid);
  try {
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      const displayName = (currentUser.displayName || 'Portfolio Visitor').trim().slice(0, 120) || 'Portfolio Visitor';
      const email = (currentUser.email || '').trim().slice(0, 160);
      await setDoc(userRef, {
        uid: currentUser.uid,
        displayName,
        email,
        preferredLighting: DEFAULT_STUDIO_PREFS.preferredLighting,
        preferredCameraMode: DEFAULT_STUDIO_PREFS.preferredCameraMode,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, userPath);
  }
}

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [hasGmailAccess, setHasGmailAccess] = useState(() => hasGmailToken());
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [studioPrefs, setStudioPrefs] = useState<StudioPreferences>(DEFAULT_STUDIO_PREFS);
  const [bookmarks, setBookmarks] = useState<Record<string, ProjectBookmarkRecord>>({});
  const [inquiries, setInquiries] = useState<PortfolioInquiryRecord[]>([]);

  useEffect(() => {
    const unsubToken = subscribeGmailToken((active) => {
      setHasGmailAccess(active);
    });
    const unsubAuth = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setAuthReady(true);
      setHasGmailAccess(Boolean(nextUser && hasGmailToken()));
      if (!nextUser) {
        setBookmarks({});
        setInquiries([]);
      }
    });
    return () => {
      unsubToken();
      unsubAuth();
    };
  }, []);

  const isAdmin = Boolean(
    user?.emailVerified && user.email?.toLowerCase() === PORTFOLIO_ADMIN_EMAIL
  );

  // Sync user profile, bookmarks, and inquiries ONLY when authReady && user (and emailVerified per security rules)
  useEffect(() => {
    if (!authReady || !user || !user.emailVerified) return;

    let cancelled = false;
    let unsubProfile: (() => void) | null = null;
    let unsubBookmarks: (() => void) | null = null;
    let unsubInquiries: (() => void) | null = null;

    const attachListeners = async () => {
      await ensureUserProfileDoc(user);
      if (cancelled) return;

      const userPath = `users/${user.uid}`;
      unsubProfile = onSnapshot(
        doc(db, 'users', user.uid),
        (snapshot) => {
          if (!snapshot.exists()) return;
          const data = snapshot.data();
          const lighting =
            data.preferredLighting === 'tungsten' || data.preferredLighting === 'chrome'
              ? data.preferredLighting
              : 'cyan';
          const cameraMode =
            data.preferredCameraMode === 'orbit' || data.preferredCameraMode === 'hero'
              ? data.preferredCameraMode
              : 'scroll';
          setStudioPrefs({
            preferredLighting: lighting,
            preferredCameraMode: cameraMode,
          });
        },
        (error) => handleFirestoreError(error, OperationType.GET, userPath)
      );

      const bookmarksPath = `users/${user.uid}/bookmarks`;
      const bookmarksQuery = query(
        collection(db, 'users', user.uid, 'bookmarks'),
        where('ownerId', '==', user.uid)
      );
      unsubBookmarks = onSnapshot(
        bookmarksQuery,
        (snapshot) => {
          const next: Record<string, ProjectBookmarkRecord> = {};
          snapshot.forEach((docSnap) => {
            const d = docSnap.data();
            next[docSnap.id] = {
              ownerId: String(d.ownerId ?? user.uid),
              projectId: String(d.projectId ?? docSnap.id),
              projectTitle: String(d.projectTitle ?? ''),
              note: String(d.note ?? ''),
              createdAt: d.createdAt ?? null,
              updatedAt: d.updatedAt ?? null,
            };
          });
          setBookmarks(next);
        },
        (error) => handleFirestoreError(error, OperationType.LIST, bookmarksPath)
      );

      const inquiriesPath = 'inquiries';
      const inquiriesQuery = isAdmin
        ? query(collection(db, 'inquiries'))
        : query(collection(db, 'inquiries'), where('ownerId', '==', user.uid));

      unsubInquiries = onSnapshot(
        inquiriesQuery,
        (snapshot) => {
          const items: PortfolioInquiryRecord[] = [];
          snapshot.forEach((docSnap) => {
            const d = docSnap.data();
            items.push({
              id: docSnap.id,
              ownerId: String(d.ownerId ?? ''),
              senderName: String(d.senderName ?? ''),
              senderEmail: String(d.senderEmail ?? ''),
              topic: String(d.topic ?? ''),
              message: String(d.message ?? ''),
              deliveryMethod:
                d.deliveryMethod === 'gmail-and-firestore' ? 'gmail-and-firestore' : 'firestore',
              status: d.status === 'reviewed' ? 'reviewed' : 'submitted',
              createdAt: d.createdAt ?? null,
              updatedAt: d.updatedAt ?? null,
            });
          });
          items.sort((a, b) => {
            const ams = a.createdAt?.toMillis?.() ?? 0;
            const bms = b.createdAt?.toMillis?.() ?? 0;
            return bms - ams;
          });
          setInquiries(items);
        },
        (error) => handleFirestoreError(error, OperationType.LIST, inquiriesPath)
      );
    };

    void attachListeners();

    return () => {
      cancelled = true;
      unsubProfile?.();
      unsubBookmarks?.();
      unsubInquiries?.();
    };
  }, [authReady, user, isAdmin]);

  const login = useCallback(async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      setHasGmailAccess(true);
      return result.user;
    } finally {
      setIsLoggingIn(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await signOutGoogle();
    setHasGmailAccess(false);
  }, []);

  const invalidateGmailSession = useCallback(() => {
    clearCachedGmailToken();
    setHasGmailAccess(false);
  }, []);

  const updateStudioPrefs = useCallback(
    async (partial: Partial<StudioPreferences>) => {
      const next: StudioPreferences = {
        preferredLighting: partial.preferredLighting ?? studioPrefs.preferredLighting,
        preferredCameraMode: partial.preferredCameraMode ?? studioPrefs.preferredCameraMode,
      };
      setStudioPrefs(next);

      if (!user || !user.emailVerified) return;

      const userPath = `users/${user.uid}`;
      try {
        await ensureUserProfileDoc(user);
        await updateDoc(doc(db, 'users', user.uid), {
          preferredLighting: next.preferredLighting,
          preferredCameraMode: next.preferredCameraMode,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, userPath);
      }
    },
    [user, studioPrefs]
  );

  const toggleBookmark = useCallback(
    async (project: ProjectItem): Promise<boolean> => {
      if (!user || !user.emailVerified) {
        throw new Error('Please sign in with Google to save project bookmarks.');
      }
      if (!ALLOWED_PROJECT_IDS.has(project.id)) {
        throw new Error('Unsupported project identifier.');
      }
      const docPath = `users/${user.uid}/bookmarks/${project.id}`;
      const ref = doc(db, 'users', user.uid, 'bookmarks', project.id);
      const exists = Boolean(bookmarks[project.id]);
      try {
        if (exists) {
          await deleteDoc(ref);
          return false;
        }
        await ensureUserProfileDoc(user);
        const safeTitle = project.title.trim().slice(0, 160) || project.id;
        await setDoc(ref, {
          ownerId: user.uid,
          projectId: project.id,
          projectTitle: safeTitle,
          note: '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        return true;
      } catch (err) {
        handleFirestoreError(err, exists ? OperationType.DELETE : OperationType.CREATE, docPath);
      }
    },
    [user, bookmarks]
  );

  const saveBookmarkNote = useCallback(
    async (project: ProjectItem, rawNote: string) => {
      if (!user || !user.emailVerified) {
        throw new Error('Please sign in with Google to save review notes.');
      }
      if (!ALLOWED_PROJECT_IDS.has(project.id)) {
        throw new Error('Unsupported project identifier.');
      }
      const safeTitle = project.title.trim().slice(0, 160) || project.id;
      const safeNote = rawNote.trim().slice(0, 500);
      const docPath = `users/${user.uid}/bookmarks/${project.id}`;
      const ref = doc(db, 'users', user.uid, 'bookmarks', project.id);
      try {
        await ensureUserProfileDoc(user);
        if (bookmarks[project.id]) {
          await updateDoc(ref, {
            projectTitle: safeTitle,
            note: safeNote,
            updatedAt: serverTimestamp(),
          });
        } else {
          await setDoc(ref, {
            ownerId: user.uid,
            projectId: project.id,
            projectTitle: safeTitle,
            note: safeNote,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, docPath);
      }
    },
    [user, bookmarks]
  );

  const submitFirestoreInquiry = useCallback(
    async (payload: {
      senderName: string;
      senderEmail: string;
      topic: string;
      message: string;
      deliveryMethod: 'firestore' | 'gmail-and-firestore';
    }): Promise<string> => {
      if (!user || !user.emailVerified) {
        throw new Error('Please sign in with Google to persist inquiries.');
      }
      const safeName = payload.senderName.trim().slice(0, 100);
      const safeEmail = payload.senderEmail.trim().slice(0, 160);
      const safeTopic = payload.topic.trim().slice(0, 160);
      const safeMessage = payload.message.trim().slice(0, 2000);

      if (safeName.length < 1 || safeEmail.length < 3 || safeMessage.length < 1) {
        throw new Error('Name, email, and message are required.');
      }

      const newRef = doc(collection(db, 'inquiries'));
      const docPath = `inquiries/${newRef.id}`;
      try {
        await setDoc(newRef, {
          ownerId: user.uid,
          senderName: safeName,
          senderEmail: safeEmail,
          topic: safeTopic,
          message: safeMessage,
          deliveryMethod: payload.deliveryMethod,
          status: 'submitted',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        return newRef.id;
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, docPath);
      }
    },
    [user]
  );

  const markInquiryReviewed = useCallback(
    async (inquiryId: string) => {
      if (!isAdmin) {
        throw new Error('Only the portfolio owner can mark inquiries as reviewed.');
      }
      const docPath = `inquiries/${inquiryId}`;
      try {
        await updateDoc(doc(db, 'inquiries', inquiryId), {
          status: 'reviewed',
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, docPath);
      }
    },
    [isAdmin]
  );

  const value = useMemo<FirebaseContextValue>(
    () => ({
      user,
      authReady,
      isAdmin,
      hasGmailAccess,
      isLoggingIn,
      studioPrefs,
      bookmarks,
      inquiries,
      login,
      logout,
      invalidateGmailSession,
      updateStudioPrefs,
      toggleBookmark,
      saveBookmarkNote,
      submitFirestoreInquiry,
      markInquiryReviewed,
    }),
    [
      user,
      authReady,
      isAdmin,
      hasGmailAccess,
      isLoggingIn,
      studioPrefs,
      bookmarks,
      inquiries,
      login,
      logout,
      invalidateGmailSession,
      updateStudioPrefs,
      toggleBookmark,
      saveBookmarkNote,
      submitFirestoreInquiry,
      markInquiryReviewed,
    ]
  );

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
}

export function useFirebase() {
  const ctx = useContext(FirebaseContext);
  if (!ctx) {
    throw new Error('useFirebase must be used inside a FirebaseProvider');
  }
  return ctx;
}
