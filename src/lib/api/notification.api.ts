import { NOTIFICATION_ENDPOINTS } from '@/lib/api/notification.endpoints';
import { NotificationListResponse } from '@/app/components/header/types/NotificatioApiType';
import { ApiResponse } from '@/app/types/api';
import axios from '../axiosInstance';

const makeEmptyPage = (page: number, size: number) => ({
  number: page,
  size,
  totalElements: 0,
  totalPages: 1,
  hasNext: false,
});

// 알림 목록 조회
export const fetchNotifications = async (
  page: number,
  size: number,
): Promise<NotificationListResponse> => {
  try {
    const res = await axios.get<ApiResponse<NotificationListResponse>>(
      `${NOTIFICATION_ENDPOINTS.LIST}?page=${page}&size=${size}`,
    );
    return res.data.data;
  } catch {
    return { content: [], page: makeEmptyPage(page, size) };
  }
};

// 알림 개수 조회
export const fetchNotificationCounts = async () => {
  try {
    const res = await axios.get(NOTIFICATION_ENDPOINTS.COUNT);
    return res.data;
  } catch {
    return { count: 0 };
  }
};

// 특정 알림 읽음 처리
export const readNotification = async (id: string) => {
  await axios.patch(NOTIFICATION_ENDPOINTS.READ_ONE(id));
};

// 전체 알림 읽음 처리
export const readAllNotifications = async () => {
  await axios.patch(NOTIFICATION_ENDPOINTS.READ_ALL);
};
