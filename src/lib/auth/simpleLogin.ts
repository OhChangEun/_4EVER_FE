import type { userInfoResponse } from '@/app/(public)/callback/userInfoType';

const LOGIN_ID_KEY = 'demo_login_id';

export function saveLoginId(loginId: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOGIN_ID_KEY, loginId);
}

export function readLoginId() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(LOGIN_ID_KEY);
}

export function clearLoginId() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LOGIN_ID_KEY);
}

export function buildMockUser(loginId?: string): userInfoResponse {
  const normalized = (loginId ?? '').trim() || 'user';

  return {
    id: 1,
    name: normalized,
    email: `${normalized}@everp.local`,
    role: 'ALL_ADMIN',
  };
}
