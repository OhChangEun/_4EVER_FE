'use client';

const ACCESS_TOKEN_KEY = 'access_token';
const ACCESS_TOKEN_EXP_KEY = 'access_token_expires_at';

export function persistAccessToken(accessToken: string, expiresInSeconds: number) {
  const expiresAt = Date.now() + expiresInSeconds * 1000;
  if (typeof window !== 'undefined') {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(ACCESS_TOKEN_EXP_KEY, String(expiresAt));
  }

  return expiresAt;
}

export function clearAccessToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_EXP_KEY);
  }
}

export function readStoredToken() {
  if (typeof document === 'undefined') {
    return { token: null, expiresAt: null };
  }

  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  const expiresAtRaw = localStorage.getItem(ACCESS_TOKEN_EXP_KEY);
  const expiresAt = expiresAtRaw ? Number(expiresAtRaw) : null;

  return { token: token ?? null, expiresAt };
}
