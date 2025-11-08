import { useEffect, useRef, useState } from 'react';
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
  enabled?: boolean;
  onAlarm?: (alarm: Alarm) => void;
  onUnreadCountChange?: (count: number) => void;
}

export function useNotificationSSE({
  enabled = true,
  onAlarm,
  onUnreadCountChange,
}: UseNotificationSSEOptions) {
  const eventSourceRef = useRef<EventSource | null>(null);
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null); // 에러 상태 추가

  useEffect(() => {
    if (!enabled) return;

    const url = NOTIFICATION_ENDPOINTS.SUBSCRIBE;
    console.info('[SSE] Connecting to:', url);

    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      console.info('[SSE] Connection opened successfully');
      setError(null); // 연결 성공 시 에러 초기화
    };

    eventSource.addEventListener('keepalive', (event) => {
      console.log('[SSE] Keepalive:', event.data);
    });

    eventSource.addEventListener('alarm', (event) => {
      try {
        const alarm: Alarm = JSON.parse(event.data);
        queryClient.invalidateQueries({ queryKey: ['notificationList'] });
        onAlarm?.(alarm);
      } catch (err) {
        console.error('[SSE] Failed to parse alarm:', err);
        setError('알림 데이터를 처리하는 중 오류가 발생했습니다.');
      }
    });

    eventSource.addEventListener('unreadCount', (event) => {
      try {
        const count = parseInt(event.data, 10);
        onUnreadCountChange?.(count);
      } catch (err) {
        console.error('[SSE] Failed to parse unread count:', err);
        setError('읽지 않은 알림 개수를 불러오는 중 오류가 발생했습니다.');
      }
    });

    eventSource.onerror = (err) => {
      console.error('[SSE] Error:', err);
      setError('알림 서버 연결 중 오류가 발생했습니다.');
    };

    return () => {
      console.info('[SSE] Closing connection');
      eventSource.close();
      eventSourceRef.current = null;
    };
  }, [enabled, queryClient, onAlarm, onUnreadCountChange]);

  return {
    disconnect: () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    },
    error, // 에러 상태 반환
  };
}
