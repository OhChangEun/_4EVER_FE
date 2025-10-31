import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import NotificationHeader from './NotificationHeader';
import NotificationPagination from './NotificationPagination';
import { useState } from 'react';
import { NotificationData } from '../types/NotificatioApiType';
import NotificationList from './NotificationList';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchNotifications,
  readAllNotifications,
  readNotification,
} from '@/lib/api/notification.api';

const MOCK_NOTIFICATIONS: NotificationData[] = [
  {
    notificationId: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    notificationTitle: '생산 오더 승인',
    notificationMessage: '생산 오더 PO-2024-003이 승인되었습니다',
    linkType: 'PURCHASE_REQUISITION',
    linkId: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    source: 'PR',
    createdAt: '2025-10-22T15:01:23.456',
    isRead: false,
  },
  {
    notificationId: 'b2c3d4e5-f6g7-8901-2345-678901bcdefg',
    notificationTitle: '판매 주문 생성',
    notificationMessage: '신규 판매 주문 SO-2024-015가 생성되었습니다',
    linkType: 'SALES_ORDER',
    linkId: 'b2c3d4e5-f6g7-8901-2345-678901bcdefg',
    source: 'SD',
    createdAt: '2025-10-23T09:30:00.000',
    isRead: false,
  },
  {
    notificationId: 'c3d4e5f6-g7h8-9012-3456-789012cdefgh',
    notificationTitle: '재고 부족 경고',
    notificationMessage: '강판 재고가 안전 재고 수준 이하입니다 (현재: 50EA)',
    linkType: 'INVENTORY',
    linkId: 'c3d4e5f6-g7h8-9012-3456-789012cdefgh',
    source: 'IM',
    createdAt: '2025-10-24T14:20:00.000',
    isRead: true,
  },
  {
    notificationId: 'd4e5f6g7-h8i9-0123-4567-890123defghi',
    notificationTitle: '시설 점검 알림',
    notificationMessage: 'A동 생산 라인 정기 점검이 예정되어 있습니다',
    linkType: 'FACILITY',
    linkId: 'd4e5f6g7-h8i9-0123-4567-890123defghi',
    source: 'FCM',
    createdAt: '2025-10-25T08:00:00.000',
    isRead: false,
  },
  {
    notificationId: 'e5f6g7h8-i9j0-1234-5678-901234efghij',
    notificationTitle: '근태 승인 요청',
    notificationMessage: '김철수 사원의 연차 신청이 승인 대기중입니다',
    linkType: 'HR',
    linkId: 'e5f6g7h8-i9j0-1234-5678-901234efghij',
    source: 'HRM',
    createdAt: '2025-10-26T10:15:00.000',
    isRead: true,
  },
  {
    notificationId: 'f6g7h8i9-j0k1-2345-6789-012345fghijk',
    notificationTitle: '생산 계획 변경',
    notificationMessage: '11월 생산 계획이 수정되었습니다',
    linkType: 'PRODUCTION',
    linkId: 'f6g7h8i9-j0k1-2345-6789-012345fghijk',
    source: 'PP',
    createdAt: '2025-10-27T16:45:00.000',
    isRead: false,
  },
  {
    notificationId: 'g7h8i9j0-k1l2-3456-7890-123456ghijkl',
    notificationTitle: '고객 문의 접수',
    notificationMessage: '(주)대한상사로부터 신규 견적 요청이 접수되었습니다',
    linkType: 'CUSTOMER',
    linkId: 'g7h8i9j0-k1l2-3456-7890-123456ghijkl',
    source: 'CUS',
    createdAt: '2025-10-28T11:30:00.000',
    isRead: true,
  },
  {
    notificationId: 'h8i9j0k1-l2m3-4567-8901-234567hijklm',
    notificationTitle: '공급업체 납품 지연',
    notificationMessage: '(주)케이엠테크의 자재 납품이 3일 지연될 예정입니다',
    linkType: 'SUPPLIER',
    linkId: 'h8i9j0k1-l2m3-4567-8901-234567hijklm',
    source: 'SUP',
    createdAt: '2025-10-29T13:20:00.000',
    isRead: false,
  },
];

// 메인 컴포넌트
export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationData[]>(MOCK_NOTIFICATIONS);
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 3;

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
    placement: 'bottom-end',
  });

  const {
    data: notificationData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['notificationList'],
    queryFn: fetchNotifications,
  });

  const queryClient = useQueryClient();
  // 알림 전체 읽기
  const { mutate: readAll } = useMutation({
    mutationFn: readAllNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notificationList'] });
    },
  });
  // 알림 하나 읽기
  const { mutate: readOne } = useMutation({
    mutationFn: (id: string) => readNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifiactionList'] });
    },
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  const totalPages = Math.ceil(notifications.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentNotifications = notifications.slice(startIndex, endIndex);

  const handleReadAll = () => {
    readAll();
    // setNotifications([]);
    setCurrentPage(0);
  };

  const handleNotificationClick = (notificationId: string) => {
    readOne(notificationId);
  };

  const 

  const handlePrevPage = () => setCurrentPage((p) => Math.max(0, p - 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="relative w-11 h-11 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors duration-200 cursor-pointer"
        aria-label="알림"
      >
        <i className="ri-notification-3-line text-xl"></i>
        {notifications.length > 0 && (
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></span>
        )}
        {/* {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center font-semibold">
            <span className="pt-0.5 text-white text-xs">{notifications.length}</span>
          </span>
        )} */}
      </button>

      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className="w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden"
            >
              <NotificationHeader
                notificationCount={notifications.length}
                onReadAll={handleReadAll}
              />

              <NotificationList
                notifications={currentNotifications}
                onNotificationClick={handleNotificationClick}
              />

              {notifications.length > ITEMS_PER_PAGE && (
                <NotificationPagination
                  page = 
                />
              )}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
