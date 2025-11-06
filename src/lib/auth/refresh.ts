import axios from 'axios';
import { startAuthorization } from './startAuthorization';

export async function trySilentRefresh() {
  const token = localStorage.getItem('access_token');
  try {
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: 'everp',
    });

    const res = await axios.post('https://auth.everp.co.kr/oauth2/token', body.toString(), {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        access_token: token,
      },
    });

    const { access_token, expires_in } = res.data;

    alert(res.data.accessToken);

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('access_token_expires_at', String(Date.now() + expires_in * 1000));
  } catch (error) {
    startAuthorization('/');
    if (axios.isAxiosError(error)) {
      console.error('Silent refresh failed:', error.response?.data || error.message);
    } else {
      console.error('Silent refresh failed:', error);
    }
    throw new Error('refresh_failed');
  }
}
