import axios from 'axios';

export async function trySilentRefresh() {
  try {
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
    });

    const res = await axios.post('/oauth2/token', body.toString(), {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, expires_in } = res.data;

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('access_token_expires_at', String(Date.now() + expires_in * 1000));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Silent refresh failed:', error.response?.data || error.message);
    } else {
      console.error('Silent refresh failed:', error);
    }
    throw new Error('refresh_failed');
  }
}
