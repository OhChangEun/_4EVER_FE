interface NotificationHeaderProps {
  notificationCount: number;
  onClearAll: () => void;
}

// 헤더 컴포넌트
export default function NotificationHeader({
  notificationCount,
  onClearAll,
}: NotificationHeaderProps) {
  return (
    <div className="px-6 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <i className="ri-notification-3-fill pt-0.5 text-blue-500 text-lg"></i>
          <h3 className="pt-0.5 text-base font-bold text-gray-900">알림</h3>
        </div>
        {notificationCount > 0 && (
          <button
            onClick={onClearAll}
            className="pt-1 text-xs text-gray-500 hover:text-blue-600 transition-colors font-medium cursor-pointer"
          >
            전체 읽음
          </button>
        )}
      </div>
    </div>
  );
}
