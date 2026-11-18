# Firestore Security Specification (Phase 0 — Payload-First TDD)

## 1. Data Invariants
1. **User Identity Isolation**: A `UserProfile` at `/users/{userId}` can only be read, created, or updated by the verified authenticated user whose `request.auth.uid == userId`, with `data.uid == userId` immutable after creation.
2. **Bookmark Master Gate**: A `ProjectBookmark` at `/users/{userId}/bookmarks/{projectId}` cannot exist unless parent `/users/{userId}` exists, `projectId` matches an allowlisted portfolio project ID, and `ownerId == userId == request.auth.uid`.
3. **Inquiry Ownership & Terminal State**: A `PortfolioInquiry` at `/inquiries/{inquiryId}` must be created with `ownerId == request.auth.uid`, `status == 'submitted'`, verified email (`email_verified == true`), and server timestamps (`request.time`). Non-admin users cannot list or read other users' inquiries or transition `status` to `'reviewed'`.
4. **No Blanket List / No Ghost Fields**: Every `create` validates exact `hasAll` + `hasOnly` keys and every `update` validates `isValid[Entity](incoming())` plus `affectedKeys().hasOnly(...)`.

## 2. The Dirty Dozen Adversarial Payloads
1. **Unauthenticated Create** on `/users/u1`: Missing `request.auth` -> `PERMISSION_DENIED`.
2. **Identity Spoofing** on `/users/u2` by `u1`: Path UID != `request.auth.uid` -> `PERMISSION_DENIED`.
3. **Ghost Field Injection (Shadow Update)** on `/users/u1`: Extra `{ isAdmin: true }` field -> `PERMISSION_DENIED`.
4. **Unverified Email Write** on `/inquiries/inq1`: `email_verified: false` -> `PERMISSION_DENIED`.
5. **Fake Client Timestamp** on `/users/u1`: `createdAt` != `request.time` -> `PERMISSION_DENIED`.
6. **Oversized String DoS** on `/inquiries/inq1`: `message.size() > 2000` -> `PERMISSION_DENIED`.
7. **ID Poisoning** on `/inquiries/bad$id`: Path ID fails `^[a-zA-Z0-9_-]+$` -> `PERMISSION_DENIED`.
8. **Orphaned Bookmark** on `/users/u1/bookmarks/aether-routine`: Missing parent `/users/u1` -> `PERMISSION_DENIED`.
9. **Invalid Project Enum** on `/users/u1/bookmarks/fake-proj`: `projectId` not in allowlist -> `PERMISSION_DENIED`.
10. **PII Cross-User Read** on `/inquiries/inq2` owned by `u2`, read by `u1` -> `PERMISSION_DENIED`.
11. **Terminal State Tampering** on `/inquiries/inq1`: Non-admin attempts `status: 'reviewed'` -> `PERMISSION_DENIED`.
12. **Blanket List Query** on `/inquiries` without `ownerId == request.auth.uid` filter by non-admin -> `PERMISSION_DENIED`.
