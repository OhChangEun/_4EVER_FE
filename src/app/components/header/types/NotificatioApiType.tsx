// notificationId: 'a1b2c3d4-e5f6-7890-1234-567890abcdef';
// notificationTitle: '생산 오더 PO-2024-003이 승인되었습니다';
// notificationMessage: '생산 오더 PO-2024-003이 승인되었습니다';
// linkType: 'PURCHASE_REQUISITION';
// linkId: 'a1b2c3d4-e5f6-7890-1234-567890abcdef';
// source: 'PR';
// createdAt: '2025-10-22T15:01:23.456';

import { Page } from '@/app/types/Page';

type SourceType = 'PR' | 'SD' | 'IM' | 'FCM' | 'HRM' | 'PP' | 'CUS' | 'SUP';

// isRead: false;
export interface NotificationData {
  notificationId: string;
  notificationTitle: string;
  notificationMessage: string;
  linkType: string;
  linkId: string;
  source: SourceType;
  createdAt: string;
  isRead: boolean;
}

// 알림 목록 조회
export interface NotificationListResponse {
  items: NotificationData;
  page: Page;
}

// 알림 갯수 조회
export interface NotificationCountResponse {
  count: number;
}
