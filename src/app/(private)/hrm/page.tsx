import Providers from '@/app/providers';
import { getQueryClient } from '@/lib/queryClient';
import { dehydrate } from '@tanstack/react-query';
import StatSection from '@/app/components/common/StatSection';
import { fetchHrmStats } from './api/hrm.api';
import { mapHrmStatsToCards } from './services/hrm.service';
import ErrorMessage from '@/app/components/common/ErrorMessage';
import { Suspense } from 'react';
import TabNavigation from '@/app/components/common/TabNavigation';
import { HRM_TABS } from './constants';

export default async function HrmPage() {
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  const data = await fetchHrmStats();
  const hrmStatsData = data ? mapHrmStatsToCards(data ?? {}) : null;
  // const [isEmployeeRegisterModalOpen, setIsEmployeeRegisterModalOpen] = useState(false);

  // const handleSubmitNewEmployee = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   alert('신규 직원이 등록되었습니다.');
  //   setIsEmployeeRegisterModalOpen(false);
  // };

  return (
    <Providers dehydratedState={dehydratedState}>
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {hrmStatsData ? (
            <StatSection
              title="인적자원관리"
              subTitle="직원 정보 및 인사 업무 관리 시스템"
              statsData={hrmStatsData}
            />
          ) : (
            <ErrorMessage message={'인적자원관리 통계 데이터를 불러오는데 실패했습니다.'} />
          )}

          {/* 직원관리 탭 / 급여관리 탭 / 근태관리 탭 / 교육관리 탭 */}
          <Suspense fallback={<div>Loading...</div>}>
            <TabNavigation tabs={HRM_TABS} />
          </Suspense>
        </main>
      </div>

      {/* 신규 직원 등록 모달 */}
      {/* {isEmployeeRegisterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">신규 직원 등록</h3>
              <button
                onClick={() => setIsEmployeeRegisterModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <form onSubmit={handleSubmitNewEmployee} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">부서</label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                  >
                    <option value="">부서 선택</option>
                    <option value="개발팀">개발팀</option>
                    <option value="마케팅팀">마케팅팀</option>
                    <option value="영업팀">영업팀</option>
                    <option value="인사팀">인사팀</option>
                    <option value="재무팀">재무팀</option>
                    <option value="기획팀">기획팀</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">직급</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                >
                  <option value="">직급 선택</option>
                  <option value="사원">사원</option>
                  <option value="대리">대리</option>
                  <option value="과장">과장</option>
                  <option value="차장">차장</option>
                  <option value="부장">부장</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="hong@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="010-1234-5678"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">입사일</label>
                  <input
                    type="date"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">생년월일</label>
                  <input
                    type="date"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">성별</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                >
                  <option value="">성별 선택</option>
                  <option value="남성">남성</option>
                  <option value="여성">여성</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="서울시 강남구 테헤란로 123"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">학력</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="서울대학교 컴퓨터공학과 학사"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">경력사항</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="이전 직장 경력 및 주요 업무를 입력하세요"
                ></textarea>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEmployeeRegisterModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  등록
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
    </Providers>
  );
}
