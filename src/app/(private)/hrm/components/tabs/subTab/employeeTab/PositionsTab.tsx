import React from 'react';

// Mock 직급 데이터
const MOCK_POSITIONS = [
  { id: 1, position: '사장/대표이사', count: 1, salary: '협의' },
  { id: 2, position: '임원(이사/상무/전무)', count: 4, salary: '1.2억+' },
  { id: 3, position: '부장', count: 8, salary: '8천만원+' },
  { id: 4, position: '차장', count: 15, salary: '7천만원+' },
  { id: 5, position: '과장', count: 22, salary: '6천만원+' },
  { id: 6, position: '대리', count: 35, salary: '5천만원+' },
  { id: 7, position: '사원', count: 50, salary: '4천만원+' },
];

export default function PositionsTab() {
  // Mock Data를 직접 사용
  const positionData = MOCK_POSITIONS;

  // 더미 핸들러 함수
  const handleViewPosition = (position) => {
    alert(`[${position.position}] 상세 정보 보기 기능 실행`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">직급 관리</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                직급
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                현재 인원
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                연봉 (기준)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {positionData.map((position) => (
              <tr key={position.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  **{position.position}**
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {position.count}명
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {position.salary}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleViewPosition(position)}
                    className="text-blue-600 hover:text-blue-900 cursor-pointer"
                  >
                    상세보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
