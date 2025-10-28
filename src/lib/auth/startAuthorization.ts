import { generateRandomBase64Url, createCodeChallenge } from './pkce';

export async function startAuthorization(returnTo?: string) {
  const codeVerifier = generateRandomBase64Url(32);
  const codeChallenge = await createCodeChallenge(codeVerifier);
  const state = generateRandomBase64Url(16);

  sessionStorage.setItem('pkce_verifier', codeVerifier);
  sessionStorage.setItem('oauth_state', state);
  if (returnTo) sessionStorage.setItem('oauth_return_to', returnTo);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
    scope: 'erp.user.profile offline_access',
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  window.location.href = `${process.env.NEXT_PUBLIC_AUTH_URL}/oauth2/authorize?${params.toString()}`;
}
