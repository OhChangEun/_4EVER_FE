'use client';
import SubNavigation from '@/app/components/common/SubNavigation';
import { TRAINING_TABS } from '@/app/(private)/hrm/constants';

export default function TrainingManagement() {
  return (
    <>
      <SubNavigation tabs={TRAINING_TABS} />

      {/* 직원 교육 상세보기 모달 */}
      {/* {showEmployeeTrainingDetailModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedEmployee.name}의 교육 현황
              </h3>
              <button
                onClick={() => setShowEmployeeTrainingDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="mb-6">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {selectedEmployee.completedTrainings}
                  </div>
                  <div className="text-sm text-gray-600">완료된 교육</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedEmployee.inProgressTrainings}
                  </div>
                  <div className="text-sm text-gray-600">진행 중인 교육</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {selectedEmployee.requiredTrainings}
                  </div>
                  <div className="text-sm text-gray-600">필수 교육 미완료</div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-md font-semibold text-gray-900 mb-3">교육 이력</h4>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {selectedEmployee.trainingHistory.map((training: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{training.title}</h5>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          training.status === '완료'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {training.status}
                      </span>
                    </div>
                    {training.status === '완료' ? (
                      <div className="text-sm text-gray-600">
                        <div>완료일: {training.completedDate}</div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600">
                        <div>시작일: {training.startDate}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowEmployeeTrainingDetailModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* 수강생 추가 모달 - 수정된 버전 */}
      {/* {showAddStudentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">수강생 추가</h3>
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <form onSubmit={handleSubmitAddStudent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">직원 선택</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus-outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                >
                  <option value="">직원을 선택하세요</option>
                  <option value="김철수">김철수 - 개발팀</option>
                  <option value="이영희">이영희 - 마케팅팀</option>
                  <option value="박민수">박민수 - 영업팀</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">수강 유형</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus-outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                >
                  <option value="">수강 유형을 선택하세요</option>
                  <option value="필수 수강">필수 수강</option>
                  <option value="선택 수강">선택 수강</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                >
                  추가
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}

      {/* 수강생 정보 수정 모달 - 수정된 버전 */}
      {/* {showEditStudentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">수강생 정보 수정</h3>
              <button
                onClick={() => setShowEditStudentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <form onSubmit={handleUpdateStudentProgress} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">직원명</label>
                <input
                  type="text"
                  value="김철수"
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus-outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                >
                  <option value="진행중">진행중</option>
                  <option value="완료">완료</option>
                  <option value="중단">중단</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditStudentModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}

      {/* 수강생 상세보기 모달 */}
      {/* {showStudentDetailModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">수강생 상세 정보</h3>
              <button
                onClick={() => setShowStudentDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">기본 정보</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">이름</span>
                    <p className="font-medium text-gray-900">{selectedStudent.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">부서</span>
                    <p className="font-medium text-gray-900">{selectedStudent.department}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">직급</span>
                    <p className="font-medium text-gray-900">{selectedStudent.position}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">입사일</span>
                    <p className="font-medium text-gray-900">2023-03-15</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">교육 진행 상황</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">시작일</span>
                      <p className="font-medium text-gray-900">{selectedStudent.startDate}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">상태</span>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          selectedStudent.status === '진행중'
                            ? 'bg-blue-100 text-blue-800'
                            : selectedStudent.status === '완료'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {selectedStudent.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-200 mt-6 sticky bottom-0 bg-white">
              <button
                onClick={() => setShowStudentDetailModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}
