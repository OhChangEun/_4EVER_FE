'use client';

import { useState, useRef, useEffect } from 'react';
import { NotificationProps } from '@/app/components/header/types/NotificationType';

const MOCK_NOTIFICATIONS: NotificationProps[] = [
  { id: 1, type: 'warning', message: '강판 재고가 부족합니다 (현재: 50EA)', time: '5분 전' },
  { id: 2, type: 'info', message: 'PO-2024-001 발주서가 승인되었습니다', time: '1시간 전' },
  { id: 3, type: 'success', message: 'SO-2024-015 주문이 출하 완료되었습니다', time: '2시간 전' },
];

const getNotificationColor = (type: NotificationProps['type']) => {
  const colors = {
    warning: 'bg-yellow-500',
    success: 'bg-green-500',
    info: 'bg-blue-500',
  };
  return colors[type];
};

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-11 h-11 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full cursor-pointer transition-colors duration-200"
        aria-label="알림"
      >
        {/* 알림  */}
        <i className="ri-notification-3-line text-xl"></i>
        {MOCK_NOTIFICATIONS.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-red-400 text-white text-xs rounded-full flex items-center justify-center font-medium">
            {MOCK_NOTIFICATIONS.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-fade-in">
          {/* 헤더 */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900">알림</h3>
          </div>

          {/* 알림 목록 */}
          <div className="max-h-80 overflow-y-auto">
            {MOCK_NOTIFICATIONS.length > 0 ? (
              MOCK_NOTIFICATIONS.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${getNotificationColor(notification.type)}`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <i className="ri-notification-off-line text-3xl mb-2"></i>
                <p className="text-sm">알림이 없습니다</p>
              </div>
            )}
          </div>

          {/* 푸터 */}
          {MOCK_NOTIFICATIONS.length > 0 && (
            <div className="p-3 border-t border-gray-200">
              <button
                className="w-full text-center text-sm text-blue-600 hover:text-blue-500 cursor-pointer transition-colors"
                onClick={() => {
                  // 모든 알림 보기 로직
                  console.log('모든 알림 보기');
                }}
              >
                모든 알림 보기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
