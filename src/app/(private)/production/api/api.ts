// api.ts
import { API_BASE_URL } from '@/app/types/api';
import axios from 'axios';

export const apisssssssss = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true', // ngrok 대응용 임시 헤더
  },
});
