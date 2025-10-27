'use client';

import { useState } from 'react';
import { QuotationPreviewData } from '@/app/(private)/production/types/QuotationPreviewApiType';
import Pagination from '@/app/components/common/Pagination'; // Pagination 경로 맞춰서 import

interface MpsPreviewModalProps {
  previewResults: QuotationPreviewData[]; // 배열 형태
  onClose: () => void;
  onConfirm: () => void;
}

export default function MpsPreviewModal({
  previewResults,
  onClose,
  onConfirm,
}: MpsPreviewModalProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = previewResults.length;
  const currentPreview = previewResults[currentPage - 1]; // 현재 페이지 데이터

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">MPS 생성 Preview</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {currentPreview ? (
          <>
            <div className="border border-gray-200 rounded-lg p-4 mb-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {currentPreview.productName} - {currentPreview.customerCompanyName}
              </h4>
              <p className="text-sm text-gray-700 mb-4">
                견적 번호: {currentPreview.quotationNumber} | 확정 납기:{' '}
                {currentPreview.confirmedDueDate}
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-900">
                        구분
                      </th>
                      {currentPreview.weeks.map((week, index) => (
                        <th
                          key={index}
                          className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-900"
                        >
                          {week.week}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">
                        수요
                      </td>
                      {currentPreview.weeks.map((week, index) => (
                        <td
                          key={index}
                          className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900"
                        >
                          {week.demand}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">
                        재고 필요량
                      </td>
                      {currentPreview.weeks.map((week, index) => (
                        <td
                          key={index}
                          className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900"
                        >
                          {week.requiredQuantity}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">
                        생산 소요량
                      </td>
                      {currentPreview.weeks.map((week, index) => (
                        <td
                          key={index}
                          className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900"
                        >
                          {week.productionQuantity}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 bg-blue-50">
                        계획 생산 (MPS)
                      </td>
                      {currentPreview.weeks.map((week, index) => (
                        <td
                          key={index}
                          className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-blue-700 bg-blue-50"
                        >
                          {week.mps}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalElements={previewResults.length}
              onPageChange={setCurrentPage}
              maxVisible={5}
            />

            <div className="flex gap-3 pt-4">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
              >
                취소
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium cursor-pointer"
              >
                MPS 확정
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">미리보기 데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
