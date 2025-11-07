import { useEffect, useRef } from 'react';
import { NOTIFICATION_ENDPOINTS } from '@/lib/api/notification.endpoints';
import { useQueryClient } from '@tanstack/react-query';

interface Alarm {
  alarmId: string;
  alarmType: string;
  targetId: string;
  title: string;
  message: string;
  linkId: string;
  linkType: string;
}

interface UseNotificationSSEOptions {
  userId: string;
  enabled?: boolean;
  onAlarm?: (alarm: Alarm) => void;
  onUnreadCountChange?: (count: number) => void;
}

export function useNotificationSSE({
  userId,
  enabled = true,
  onAlarm,
  onUnreadCountChange,
}: UseNotificationSSEOptions) {
  const eventSourceRef = useRef<EventSource | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled || !userId) return;

    const url = NOTIFICATION_ENDPOINTS.SUBSCRIBE(userId);
    console.info('[SSE] Connecting to:', url);

    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      console.info('[SSE] Connection opened successfully');
    };

    // keepalive 이벤트: 연결 유지
    eventSource.addEventListener('keepalive', (event) => {
      console.log('[SSE] Keepalive:', event.data);
    });

    // alarm 이벤트: 새 알림 수신
    eventSource.addEventListener('alarm', (event) => {
      try {
        const alarm: Alarm = JSON.parse(event.data);
        console.log('[SSE] New alarm received:', alarm);

        // 알림 목록 갱신
        queryClient.invalidateQueries({ queryKey: ['notificationList'] });

        // 콜백 실행
        onAlarm?.(alarm);
      } catch (error) {
        console.error('[SSE] Failed to parse alarm:', error);
      }
    });

    // unreadCount 이벤트: 읽지 않은 알림 개수
    eventSource.addEventListener('unreadCount', (event) => {
      try {
        const count = parseInt(event.data, 10);
        console.log('[SSE] Unread count:', count);
        onUnreadCountChange?.(count);
      } catch (error) {
        console.error('[SSE] Failed to parse unread count:', error);
      }
    });

    // 기본 메시지 (디버깅용)
    eventSource.onmessage = (event) => {
      console.log('[SSE] Default message:', event.data);
    };

    // 에러 처리
    eventSource.onerror = (error) => {
      const readyState = eventSource.readyState;
      const readyStateLabels = ['CONNECTING', 'OPEN', 'CLOSED'];

      console.error('[SSE] Error occurred:', {
        readyState,
        readyStateLabel: readyStateLabels[readyState],
        error,
      });
    };

    // 클린업
    return () => {
      console.info('[SSE] Closing connection');
      eventSource.close();
      eventSourceRef.current = null;
    };
  }, [userId, enabled, queryClient, onAlarm, onUnreadCountChange]);

  return {
    disconnect: () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    },
  };
}
