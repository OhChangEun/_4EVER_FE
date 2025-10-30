'use client';

import { useEffect, useState } from 'react';

interface Alarm {
  id: number;
  message: string;
}

export default function AlarmList() {
  const [alarms, setAlarms] = useState<Alarm[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(
      'http://localhost:8080/api/alarm/notifications/subscribe/019a2581-dd40-7cc8-b450-39df10062ec0',
    );

    eventSource.onmessage = (event) => {
      const alarm: Alarm = JSON.parse(event.data);
      setAlarms((prev) => [alarm, ...prev]);
    };

    eventSource.onerror = (err) => {
      console.error('sse 에러', err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h2>알람</h2>
      <ul>
        {alarms.map((alarm) => (
          <li key={alarm.id}>{alarm.message}</li>
        ))}
      </ul>
    </div>
  );
}
