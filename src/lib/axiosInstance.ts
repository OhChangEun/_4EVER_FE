import axios from 'axios';
import { readStoredToken } from '@/lib/auth/tokenStorage';

async function resolveAccessToken(): Promise<string | null> {
  if (typeof window !== 'undefined') {
    const { token } = readStoredToken();
    return token;
  }

  return null;
}

axios.interceptors.request.use(
  async (config) => {
    const token = await resolveAccessToken();

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axios;
