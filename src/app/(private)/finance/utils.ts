// 전표 유형 텍스트
export const getInvoiceType = (type: string) => {
  switch (type) {
    case 'AR':
      return '매출 전표';
    case 'AP':
      return '매입 전표';
    default:
      return '매출 전표';
  }
};
