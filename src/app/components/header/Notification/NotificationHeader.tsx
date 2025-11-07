interface NotificationHeaderProps {
  notificationCount: number;
  onReadAll: () => void;
}

// 헤더 컴포넌트
export default function NotificationHeader({
  notificationCount,
  onReadAll,
}: NotificationHeaderProps) {
  return (
    <div className="px-5 py-3 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <i className="pt-0.5 ri-notification-3-fill text-blue-300"></i>
          <h3 className="text-sm font-bold text-gray-700">알림</h3>
        </div>
        {notificationCount > 0 && (
          <button
            onClick={onReadAll}
            className="pt-1 text-xs text-gray-500 hover:text-blue-600 transition-colors font-medium cursor-pointer"
          >
            전체 읽음
          </button>
        )}
      </div>
    </div>
  );
}
