export async function startAuthorization(returnTo?: string) {
  if (typeof window === 'undefined') return;
  if (returnTo) localStorage.setItem('oauth_return_to', returnTo);
  window.location.href = '/login';
}
