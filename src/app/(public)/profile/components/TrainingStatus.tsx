'use client';

import { useState } from 'react';

const TrainingStatus = () => {
  const [activeTab, setActiveTab] = useState('current');

  const currentTrainings = [
    {
      id: 1,
      title: '정보보안 교육',
      category: '필수',
      instructor: '보안팀',
      duration: '2시간',
      progress: 75,
      deadline: '2024-12-31',
      status: '진행중',
      isRequired: true,
    },
    {
      id: 2,
      title: 'React 고급 과정',
      category: '기술',
      instructor: '개발팀',
      duration: '8시간',
      progress: 40,
      deadline: '2025-01-15',
      status: '진행중',
      isRequired: false,
    },
    {
      id: 3,
      title: '프로젝트 관리 기법',
      category: '관리',
      instructor: '외부강사',
      duration: '4시간',
      progress: 0,
      deadline: '2025-01-30',
      status: '신청완료',
      isRequired: false,
    },
  ];

  const availableTrainings = [
    {
      id: 4,
      title: '개인정보보호법 교육',
      category: '필수',
      instructor: '법무팀',
      duration: '1시간',
      deadline: '2025-02-28',
      isRequired: true,
      description: '개인정보보호법 준수를 위한 필수 교육',
    },
    {
      id: 5,
      title: 'TypeScript 심화 과정',
      category: '기술',
      instructor: '개발팀',
      duration: '6시간',
      deadline: '2025-03-15',
      isRequired: false,
      description: 'TypeScript 고급 기능 및 실무 활용법',
    },
    {
      id: 6,
      title: '리더십 개발 과정',
      category: '관리',
      instructor: '외부강사',
      duration: '12시간',
      deadline: '2025-04-30',
      isRequired: false,
      description: '팀 리더를 위한 리더십 역량 강화 교육',
    },
  ];

  const completedTrainings = [
    {
      id: 7,
      title: '신입사원 교육',
      category: '필수',
      instructor: '인사팀',
      duration: '16시간',
      completedDate: '2021-03-30',
      score: 95,
    },
    {
      id: 8,
      title: 'JavaScript ES6+ 과정',
      category: '기술',
      instructor: '개발팀',
      duration: '4시간',
      completedDate: '2023-06-15',
      score: 88,
    },
    {
      id: 9,
      title: '업무 효율성 향상',
      category: '일반',
      instructor: '외부강사',
      duration: '3시간',
      completedDate: '2023-11-20',
      score: 92,
    },
  ];

  const handleApplyTraining = (trainingId: number) => {
    alert(`교육 신청이 완료되었습니다. (ID: ${trainingId})`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <i className="ri-graduation-cap-line text-orange-600 text-lg"></i>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">교육 현황</h2>
            <p className="text-sm text-gray-500">사내 교육 수강 및 신청 관리</p>
          </div>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab('current')}
            className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
              activeTab === 'current'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            수강중인 교육
          </button>
          <button
            onClick={() => setActiveTab('available')}
            className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
              activeTab === 'available'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            신청 가능한 교육
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
              activeTab === 'completed'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            수료한 교육
          </button>
        </nav>
      </div>

      <div className="p-6 min-h-150 ">
        {/* 수강중인 교육 */}
        {activeTab === 'current' && (
          <div className="space-y-4">
            {currentTrainings.map((training) => (
              <div key={training.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-medium text-gray-900">{training.title}</h3>
                      {training.isRequired && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          필수
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      강사: {training.instructor} | 시간: {training.duration}
                    </p>
                    <p className="text-xs text-gray-500">마감일: {training.deadline}</p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      training.status === '진행중'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {training.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 신청 가능한 교육 */}
        {activeTab === 'available' && (
          <div className="space-y-4">
            {availableTrainings.map((training) => (
              <div key={training.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-medium text-gray-900">{training.title}</h3>
                      {training.isRequired && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          필수
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                      강사: {training.instructor} | 시간: {training.duration}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">신청 마감일: {training.deadline}</p>
                    <p className="text-xs text-gray-700">{training.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleApplyTraining(training.id)}
                  className="w-full mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 cursor-pointer whitespace-nowrap"
                >
                  교육 신청하기
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 수료한 교육 */}
        {activeTab === 'completed' && (
          <div className="space-y-4">
            {completedTrainings.map((training) => (
              <div key={training.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{training.title}</h3>
                    <p className="text-xs text-gray-500">
                      강사: {training.instructor} | 시간: {training.duration}
                    </p>
                    <p className="text-xs text-gray-500">수료일: {training.completedDate}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">수료</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingStatus;
