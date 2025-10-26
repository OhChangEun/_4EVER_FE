// tabs/AttendanceTab.tsx
'use client';
import { useState, useMemo } from 'react';

export default function AttendanceTab() {
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const attendanceData = [
    {
      employeeId: 'EMP001',
      name: '김민수',
      position: '과장',
      department: '개발팀',
      date: '2024-01-15',
      checkIn: '09:00',
      checkOut: '18:30',
      workHours: '8시간 30분',
      overtime: '30분',
      status: '정상',
    },
    {
      employeeId: 'EMP002',
      name: '이영희',
      position: '차장',
      department: '마케팅팀',
      date: '2024-01-15',
      checkIn: '08:45',
      checkOut: '17:45',
      workHours: '8시간',
      overtime: '0분',
      status: '정상',
    },
    {
      employeeId: 'EMP003',
      name: '박철수',
      position: '부장',
      department: '영업팀',
      date: '2024-01-15',
      checkIn: '09:15',
      checkOut: '19:00',
      workHours: '8시간 45분',
      overtime: '1시간',
      status: '지각',
    },
    {
      employeeId: 'EMP004',
      name: '정수진',
      position: '대리',
      department: '인사팀',
      date: '2024-01-15',
      checkIn: '09:00',
      checkOut: '18:00',
      workHours: '8시간',
      overtime: '0분',
      status: '정상',
    },
    {
      employeeId: 'EMP005',
      name: '최동훈',
      position: '과장',
      department: '재무팀',
      date: '2024-01-15',
      checkIn: '09:10',
      checkOut: '18:15',
      workHours: '8시간 5분',
      overtime: '15분',
      status: '지각',
    },
    {
      employeeId: 'EMP006',
      name: '김영수',
      position: '차장',
      department: '재고팀',
      date: '2024-01-15',
      checkIn: '-',
      checkOut: '-',
      workHours: '0시간',
      overtime: '0분',
      status: '휴가',
    },
    {
      employeeId: 'EMP007',
      name: '이미영',
      position: '사원',
      department: '구매팀',
      date: '2024-01-15',
      checkIn: '-',
      checkOut: '-',
      workHours: '0시간',
      overtime: '0분',
      status: '결근',
    },
    {
      employeeId: 'EMP008',
      name: '홍길동',
      position: '대리',
      department: '영업팀',
      date: '2024-01-15',
      checkIn: '09:05',
      checkOut: '18:10',
      workHours: '8시간 5분',
      overtime: '10분',
      status: '정상',
    },
    {
      employeeId: 'EMP009',
      name: '강수진',
      position: '사원',
      department: '생산팀',
      date: '2024-01-15',
      checkIn: '08:55',
      checkOut: '17:55',
      workHours: '8시간',
      overtime: '0분',
      status: '정상',
    },
    {
      employeeId: 'EMP010',
      name: '윤태호',
      position: '대리',
      department: '재무팀',
      date: '2024-01-15',
      checkIn: '09:20',
      checkOut: '18:25',
      workHours: '8시간 5분',
      overtime: '25분',
      status: '지각',
    },
  ];

  const departments = [...new Set(attendanceData.map((emp) => emp.department))];
  const positions = [...new Set(attendanceData.map((emp) => emp.position))];

  const filteredData = useMemo(() => {
    return attendanceData.filter((record) => {
      const matchesDepartment = !departmentFilter || record.department === departmentFilter;
      const matchesPosition = !positionFilter || record.position === positionFilter;
      const matchesSearch =
        !searchTerm || record.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesDepartment && matchesPosition && matchesSearch;
    });
  }, [departmentFilter, positionFilter, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handleDownloadAttendance = () => {
    const attendanceReport = attendanceData.map((record) => ({
      name: record.name,
      position: record.position,
      department: record.department,
      date: record.date,
      checkIn: record.checkIn,
      checkOut: record.checkOut,
      workHours: record.workHours,
      status: record.status,
    }));

    const dataStr = JSON.stringify(attendanceReport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `attendance_report_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">출퇴근 기록</h3>
        <div className="flex items-center space-x-3">
          <input
            type="date"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            defaultValue="2024-01-15"
          />
          <button
            onClick={handleDownloadAttendance}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap text-sm"
          >
            <i className="ri-download-line mr-1"></i>
            출근부 다운로드
          </button>
        </div>
      </div>

      {/* 필터링 및 검색 */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">부서:</label>
          <select
            value={departmentFilter}
            onChange={(e) => {
              setDepartmentFilter(e.target.value);
              handleFilterChange();
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
          >
            <option value="">전체 부서</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">직급:</label>
          <select
            value={positionFilter}
            onChange={(e) => {
              setPositionFilter(e.target.value);
              handleFilterChange();
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
          >
            <option value="">전체 직급</option>
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2 flex-1">
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="직원 이름 검색..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleFilterChange();
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <button
          onClick={() => {
            setDepartmentFilter('');
            setPositionFilter('');
            setSearchTerm('');
            setCurrentPage(1);
          }}
          className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          <i className="ri-refresh-line mr-1"></i>
          초기화
        </button>
      </div>

      {/* 결과 요약 */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-600">
          총 {filteredData.length}명의 출퇴근 기록 (전체 {attendanceData.length}명 중)
        </div>
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
                출근 시간
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                퇴근 시간
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                근무 시간
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                초과 근무
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((record) => (
              <tr key={record.employeeId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{record.name}</div>
                    <div className="text-sm text-gray-500">{record.position}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.checkIn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.checkOut}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.workHours}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.overtime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      record.status === '정상'
                        ? 'bg-green-100 text-green-800'
                        : record.status === '지각'
                          ? 'bg-yellow-100 text-yellow-800'
                          : record.status === '휴가'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onViewAttendance(record)}
                      className="text-blue-600 hover:text-blue-900 cursor-pointer"
                    >
                      <i className="ri-eye-line"></i>
                    </button>
                    <button
                      onClick={() => onEditAttendance(record)}
                      className="text-green-600 hover:text-green-900 cursor-pointer"
                    >
                      <i className="ri-edit-line"></i>
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
            {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} /{' '}
            {filteredData.length}명
          </div>
        </div>
      )}
    </div>
  );
}
