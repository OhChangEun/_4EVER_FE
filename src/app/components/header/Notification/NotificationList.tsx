import { NotificationData } from '../types/NotificatioApiType';

interface NotificationListProps {
  notifications: NotificationData[];
  onNotificationClick: (notification: NotificationData) => void;
}

const getSourceConfig = (source: NotificationData['source']) => {
  const configs = {
    PR: { color: 'bg-blue-500', icon: 'ri-file-list-3-line', label: '구매요청' },
    SD: { color: 'bg-green-500', icon: 'ri-shopping-cart-line', label: '판매' },
    IM: { color: 'bg-yellow-500', icon: 'ri-inbox-line', label: '재고' },
    FCM: { color: 'bg-purple-500', icon: 'ri-building-line', label: '시설' },
    HRM: { color: 'bg-pink-500', icon: 'ri-user-line', label: '인사' },
    PP: { color: 'bg-indigo-500', icon: 'ri-factory-line', label: '생산' },
    CUS: { color: 'bg-cyan-500', icon: 'ri-customer-service-2-line', label: '고객' },
    SUP: { color: 'bg-orange-500', icon: 'ri-truck-line', label: '공급업체' },
  };
  return configs[source];
};

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

export default function NotificationList({
  notifications,
  onNotificationClick,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <i className="ri-notification-off-line text-3xl text-gray-400"></i>
        </div>
        <p className="text-sm font-medium text-gray-500">알림이 없습니다</p>
        <p className="text-xs text-gray-400 mt-1">새로운 알림이 오면 여기에 표시됩니다</p>
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      {notifications.map((notfication) => {
        const config = getSourceConfig(notfication.source);
        return (
          <div
            key={notfication.notificationId}
            onClick={() => onNotificationClick(notfication)}
            className={`p-5 border-b border-gray-100 bg-gray-100 cursor-pointer transition-all duration-200 group ${
              !notfication.isRead ? 'bg-blue-100' : 'bg-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              {/* 아이콘 */}
              <div
                className={`${config.color} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
              >
                <i className={`${config.icon} text-white text-lg`}></i>
              </div>

              {/* 알람 내용 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-sm truncate ${
                        !notfication.isRead
                          ? 'font-bold text-gray-900'
                          : 'font-semibold text-gray-700'
                      }`}
                    >
                      {notfication.notificationTitle}
                    </h4>
                  </div>
                </div>
                <p
                  className={`text-xs line-clamp-2 mb ${
                    !notfication.isRead ? 'text-gray-700 font-medium' : 'text-gray-600'
                  }`}
                >
                  {notfication.notificationMessage}
                </p>
                <div className="flex items-center text-xs text-gray-400">
                  <i className="ri-time-line mr-1"></i>
                  {formatDateTime(notfication.createdAt)}
                </div>
              </div>

              <span
                className={`${config.color} text-white text-xs px-2 py-0.5 rounded-full font-medium`}
              >
                {config.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
