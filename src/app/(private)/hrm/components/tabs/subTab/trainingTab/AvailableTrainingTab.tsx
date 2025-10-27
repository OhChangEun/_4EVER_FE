'use client';

import React, { useState, useMemo } from 'react';

// 임의의 Mock 교육 데이터
const MOCK_TRAININGS = [
  {
    id: 1,
    title: '리액트 기초 실습',
    category: '기술 교육',
    status: '진행 중',
    duration: '20시간',
    format: '온라인',
    participants: 45,
  },
  {
    id: 2,
    title: '마케팅 전략 201',
    category: '마케팅',
    status: '예정',
    duration: '12시간',
    format: '온/오프라인',
    participants: 22,
  },
  {
    id: 3,
    title: '신입사원 기본 매뉴얼',
    category: '기본 교육',
    status: '마감',
    duration: '8시간',
    format: '온라인',
    participants: 60,
  },
  {
    id: 4,
    title: '데이터 분석 입문',
    category: '기술 교육',
    status: '진행 중',
    duration: '30시간',
    format: '온라인',
    participants: 55,
  },
  {
    id: 5,
    title: '팀장 리더십 교육',
    category: '관리 교육',
    status: '진행 중',
    duration: '15시간',
    format: '오프라인',
    participants: 18,
  },
  {
    id: 6,
    title: '고객 서비스 심화',
    category: '서비스',
    status: '예정',
    duration: '10시간',
    format: '온라인',
    participants: 30,
  },
  {
    id: 7,
    title: '파이썬 데이터 처리',
    category: '기술 교육',
    status: '진행 중',
    duration: '40시간',
    format: '온라인',
    participants: 70,
  },
];

// 상태 색상 헬퍼 함수
const getStatusColor = (status) => {
  switch (status) {
    case '진행 중':
      return 'bg-green-100 text-green-800';
    case '예정':
    case '필수':
      return 'bg-yellow-100 text-yellow-800';
    case '마감':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function AvailableTrainingTab() {
  const [trainingCurrentPage, setTrainingCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState('');
  const itemsPerPage = 6; // 한 페이지당 표시할 항목 수

  // 필터링된 교육 목록
  const filteredTrainings = useMemo(() => {
    return MOCK_TRAININGS.filter(
      (training) => !categoryFilter || training.category === categoryFilter,
    );
  }, [categoryFilter]);

  // 페이지네이션 계산
  const trainingTotalPages = Math.ceil(filteredTrainings.length / itemsPerPage);
  const trainingStartIndex = (trainingCurrentPage - 1) * itemsPerPage;
  const paginatedTrainings = filteredTrainings.slice(
    trainingStartIndex,
    trainingStartIndex + itemsPerPage,
  );

  // 더미 핸들러 함수
  const handleAddTraining = () => alert('교육 프로그램 추가 기능 실행');
  const handleViewTrainingDetail = (training) => alert(`${training.title} 상세보기`);
  const handleManageTraining = (training) => alert(`${training.title} 관리 기능 실행`);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">교육 프로그램 목록</h3>
        <div className="flex items-center space-x-3">
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setTrainingCurrentPage(1); // 필터 변경 시 1페이지로 이동
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
          >
            <option value="">전체 카테고리</option>
            <option value="기본 교육">기본 교육</option>
            <option value="기술 교육">기술 교육</option>
            <option value="마케팅">마케팅</option>
            <option value="관리 교육">관리 교육</option>
            <option value="서비스">서비스</option>
          </select>
          <button
            onClick={handleAddTraining}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap text-sm"
          >
            <i className="ri-add-line mr-1"></i>
            교육 프로그램 추가
          </button>
        </div>
      </div>

      {/* 결과 요약 */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-600">
          총 **{filteredTrainings.length}**개의 교육 프로그램
        </div>
        <div className="text-sm text-gray-600">
          페이지 **{trainingCurrentPage} / {trainingTotalPages}**
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedTrainings.map((training) => (
          <div key={training.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">{training.title}</h4>
                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {training.category}
                </span>
              </div>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(training.status)}`}
              >
                {training.status}
              </span>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <i className="ri-time-line mr-2"></i>
                <span>{training.duration}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <i className="ri-computer-line mr-2"></i>
                <span>{training.format}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <i className="ri-team-line mr-2"></i>
                <span>{training.participants}명</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleViewTrainingDetail(training)}
                className="px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-eye-line mr-1"></i>
                상세보기
              </button>
              <button
                onClick={() => handleManageTraining(training)}
                className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-edit-line mr-1"></i>
                관리
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      {trainingTotalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setTrainingCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={trainingCurrentPage === 1}
              className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${
                trainingCurrentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <i className="ri-arrow-left-line mr-1"></i>
              이전
            </button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: trainingTotalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setTrainingCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${
                    trainingCurrentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setTrainingCurrentPage((prev) => Math.min(prev + 1, trainingTotalPages))
              }
              disabled={trainingCurrentPage === trainingTotalPages}
              className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${
                trainingCurrentPage === trainingTotalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              다음
              <i className="ri-arrow-right-line ml-1"></i>
            </button>
          </div>

          <div className="text-sm text-gray-600">
            {trainingStartIndex + 1}-
            {Math.min(trainingStartIndex + itemsPerPage, filteredTrainings.length)} /{' '}
            {filteredTrainings.length}개
          </div>
        </div>
      )}
    </div>
  );
}
