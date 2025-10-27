import {
  QuoteDetailModalProps,
  QuoteDetail,
} from '@/app/(private)/sales/types/QuoteDetailModalType';
import { useQuery } from '@tanstack/react-query';
import { getQuoteDetail } from '../../sales.api';
import { useEffect, useState } from 'react';
import ModalStatusBox from '@/app/components/common/ModalStatusBox';
import { QUOTE_DETAIL_TABLE_HEADERS } from '../../constant';
import StatusLabel from '@/app/components/common/StatusLabel';

const QuoteDetailModal = ({ $onClose, $selectedQuotationId }: QuoteDetailModalProps) => {
  const { data, isLoading, isError } = useQuery<QuoteDetail>({
    queryKey: ['quoteDetail', $selectedQuotationId],
    queryFn: () => getQuoteDetail($selectedQuotationId),
    enabled: !!$selectedQuotationId,
  });

  useEffect(() => {
    setErrorModal(isError);
  }, [isError]);

  const [errorModal, setErrorModal] = useState(false);

  if (isLoading) return <ModalStatusBox $type="loading" $message="견적서를 불러오는 중입니다..." />;

  if (errorModal)
    return (
      <ModalStatusBox
        $type="error"
        $message="견적서를 불러오는 중 오류가 발생했습니다."
        $onClose={() => setErrorModal(false)}
      />
    );
  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              견적서 상세보기 - {data!.quotationNumber}
            </h3>
            <button onClick={$onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>

          <div className="space-y-6">
            {/* 견적서 헤더 */}
            <div className="bg-white rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">견적 정보</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">견적번호:</span>
                      <span className="font-medium">{data!.quotationNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">견적일자:</span>
                      <span className="font-medium">{data!.quotationDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">납기일:</span>
                      <span className="font-medium">{data!.dueDate}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">고객 정보</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">고객명:</span>
                      <span className="font-medium">{data!.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">담당자:</span>
                      <span className="font-medium">{data!.ceoName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">상태:</span>
                      <StatusLabel $statusCode={data!.statusCode} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 견적 품목 */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">견적 품목</h4>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      {QUOTE_DETAIL_TABLE_HEADERS.map((header) => (
                        <th
                          key={header}
                          className="px-4 py-3 text-sm font-medium text-gray-700 border-b text-center"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 text-sm">{data!.items[0].itemName}</td>
                      <td className="px-4 py-3 text-sm text-center">{data!.items[0].quantity}</td>
                      <td className="px-4 py-3 text-sm text-center">{data!.items[0].uomName}</td>
                      <td className="px-4 py-3 text-sm text-right">
                        ₩{data!.items[0].unitPrice.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-right">
                        ₩{data!.items[0].amount.toLocaleString()}
                      </td>
                    </tr>
                    {/* <tr className="border-b">
                        <td className="px-4 py-3 text-sm">제품 B</td>
                        <td className="px-4 py-3 text-sm text-center">5</td>
                        <td className="px-4 py-3 text-sm text-right">₩200,000</td>
                        <td className="px-4 py-3 text-sm text-right">₩1,000,000</td>
                      </tr> */}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={4} className="px-4 py-3 text-right font-medium text-gray-900">
                        총 견적금액
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-lg text-blue-600">
                        ₩{data!.totalAmount.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={$onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuoteDetailModal;
