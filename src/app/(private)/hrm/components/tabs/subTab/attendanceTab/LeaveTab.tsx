// tabs/LeaveTab.tsx
'use client';
import { useState } from 'react';

export default function LeaveTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const leaveData = [
    {
      employeeId: 'EMP001',
      name: '김민수',
      position: '과장',
      department: '개발팀',
      leaveType: '연차',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      days: 3,
      remaining: 12,
    },
    {
      employeeId: 'EMP004',
      name: '정수진',
      position: '대리',
      department: '인사팀',
      leaveType: '병가',
      startDate: '2024-01-18',
      endDate: '2024-01-18',
      days: 1,
      remaining: 15,
    },
    {
      employeeId: 'EMP002',
      name: '이영희',
      position: '차장',
      department: '마케팅팀',
      leaveType: '연차',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      days: 2,
      remaining: 18,
    },
    {
      employeeId: 'EMP003',
      name: '박철수',
      position: '부장',
      department: '영업팀',
      leaveType: '연차',
      startDate: '2024-01-30',
      endDate: '2024-01-31',
      days: 2,
      remaining: 20,
    },
    {
      employeeId: 'EMP006',
      name: '김영수',
      position: '차장',
      department: '재고팀',
      leaveType: '병가',
      startDate: '2024-02-05',
      endDate: '2024-02-07',
      days: 3,
      remaining: 14,
    },
    {
      employeeId: 'EMP008',
      name: '홍길동',
      position: '대리',
      department: '영업팀',
      leaveType: '연차',
      startDate: '2024-02-10',
      endDate: '2024-02-12',
      days: 3,
      remaining: 16,
    },
  ];

  const totalPages = Math.ceil(leaveData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = leaveData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">휴가 관리</h3>
      </div>

      {/* 결과 요약 */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-600">총 {leaveData.length}건의 휴가 신청</div>
        <div className="text-sm text-gray-600">
          페이지 {currentPage} / {totalPages}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                직원 정보
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                휴가 유형
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                시작 일자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                종료 일자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                일수
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                잔여 연차
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((record, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{record.name}</div>
                    <div className="text-sm text-gray-500">{record.position}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.leaveType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.startDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.endDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.days}일
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.remaining}일
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onApproveLeave(record)}
                      className="text-green-600 hover:text-green-900 cursor-pointer"
                      title="승인"
                    >
                      <i className="ri-check-line"></i>
                    </button>
                    <button
                      onClick={() => onRejectLeave(record)}
                      className="text-red-600 hover:text-red-900 cursor-pointer"
                      title="반려"
                    >
                      <i className="ri-close-line"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <i className="ri-arrow-left-line mr-1"></i>
              이전
            </button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              다음
              <i className="ri-arrow-right-line ml-1"></i>
            </button>
          </div>

          <div className="text-sm text-gray-600">
            {startIndex + 1}-{Math.min(startIndex + itemsPerPage, leaveData.length)} /{' '}
            {leaveData.length}건
          </div>
        </div>
      )}
    </div>
  );
}
