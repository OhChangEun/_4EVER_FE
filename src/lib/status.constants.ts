export const STATUS_TEXT_MAP: Record<string, string> = {
  APPROVED: '승인',
  APPROVAL: '승인',
  PENDING: '대기',
  REJECTED: '반려',
  ACTIVE: '활성',
  INACTIVE: '비활성',
  IN_PROGRESS: '진행중',
  COMPLETED: '완료',
  COMPLETE: '완료',
  PLANNED: '계획',
  REVIEW: '검토중',
  NORMAL: '정상',
  LATE: '지각',
  CAUTION: '주의',
  URGENT: '긴급',

  MATERIAL_PREPARATION: '자재 준비 중',
  IN_PRODUCTION: '생산중',
  READY_FOR_SHIPMENT: '출고 준비 완료',
  DELIVERING: '배송중',
  DELIVERED: '배송완료',
  RECEIVING: '입고대기',
  RECEIVED: '입고완료',
  INSUFFICIENT: '부족',
  SUFFICIENT: '충족',

  PAID: '완납',
  UNPAID: '미납',
  RECRUITING: '모집중',
  BASIC: '기본교육',
  TECHNOLOGY: '기술교육',
  IN_PROCESS: '진행중',
  RESPONSE_PENDING: '확인 대기',
  CHECKED: '확인',
  UNCHECKED: '미확인',

  NEW: '신규',
  CONFIRMED: '확정',

  MATERIAL: '원자재',
  ITEM: '부품',
};

// 상태 색상 매핑
export const STATUS_COLOR_MAP: Record<string, string> = {
  APPROVED: 'bg-green-100 text-green-700 border-green-300',
  APPROVAL: 'bg-green-100 text-green-700 border-green-300',
  ACTIVE: 'bg-green-100 text-green-700 border-green-300',
  SUFFICIENT: 'bg-green-100 text-green-700 border-green-300',

  PENDING: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  IN_PROCESS: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  RESPONSE_PENDING: 'bg-yellow-100 text-yellow-700 border-yellow-300',

  REJECTED: 'bg-red-100 text-red-700 border-red-300',
  DEACTIVE: 'bg-gray-100 text-gray-700 border-gray-300',
  INSUFFICIENT: 'bg-red-100 text-red-700 border-red-300',

  COMPLETED: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  COMPLETE: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  READY_FOR_SHIPMENT: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  DELIVERED: 'bg-green-100 text-green-700 border-green-300',
  RECEIVED: 'bg-emerald-100 text-emerald-700 border-emerald-300',

  DELIVERING: 'bg-blue-100 text-blue-700 border-blue-300',
  IN_PRODUCTION: 'bg-orange-100 text-orange-700 border-orange-300',
  MATERIAL_PREPARATION: 'bg-yellow-100 text-yellow-700 border-yellow-300',

  CAUTION: 'bg-orange-100 text-orange-700 border-orange-300',
  URGENT: 'bg-orange-100 text-orange-700 border-orange-300',
  LATE: 'bg-orange-100 text-orange-700 border-orange-300',

  NEW: 'bg-indigo-100 text-indigo-700 border-indigo-300',
  PLANNED: 'bg-indigo-100 text-indigo-700 border-indigo-300',
  RECRUITING: 'bg-indigo-100 text-indigo-700 border-indigo-300',

  CHECKED: 'bg-sky-100 text-sky-700 border-sky-300',
  UNCHECKED: 'bg-gray-100 text-gray-600 border-gray-300',

  PAID: 'bg-green-100 text-green-700 border-green-300',
  UNPAID: 'bg-red-100 text-red-700 border-red-300',

  DEFAULT: 'bg-gray-100 text-gray-600 border-gray-300',
};

export const getStatusText = (status: string): string =>
  STATUS_TEXT_MAP[status ?? ''] ?? '알 수 없음';

export const getStatusColor = (status: string): string =>
  STATUS_COLOR_MAP[status ?? ''] ?? STATUS_COLOR_MAP.DEFAULT;
