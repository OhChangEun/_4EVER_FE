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
