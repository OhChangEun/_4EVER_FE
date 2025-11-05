export const getTabCodeText = (tabCode: string | undefined) => {
  switch (tabCode) {
    case 'PO':
      return '발주 프로세스';
    case 'AP':
      return '매입 프로세스';
    case 'AR':
      return '매출 프로세스';
    case 'SO':
      return '주문 프로세스';
    case 'PR':
      return '구매 프로세스';
    case 'ATT':
      return '근태 프로세스';
    case 'LV':
      return '휴가 프로세스';
    case 'QT':
      return '견적 프로세스';
    case 'MES':
      return '생산 프로세스';
    default:
      return '알 수 없는 프로세스';
  }
};

export const getColorClasses = (color: string) => {
  const colorMap = {
    blue: { bg: 'bg-blue-100', icon: 'text-blue-600' },
    indigo: { bg: 'bg-indigo-100', icon: 'text-indigo-600' },
    green: { bg: 'bg-green-100', icon: 'text-green-600' },
    purple: { bg: 'bg-purple-100', icon: 'text-purple-600' },
    orange: { bg: 'bg-orange-100', icon: 'text-orange-600' },
  };
  return colorMap[color as keyof typeof colorMap] || colorMap.blue;
};
