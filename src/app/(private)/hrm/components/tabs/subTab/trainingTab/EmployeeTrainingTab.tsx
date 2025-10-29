'use client';

import {
  fetchDepartmentsList,
  fetchPositionsList,
  fetchTrainingList,
} from '@/app/(private)/hrm/api/hrm.api';
import {
  TrainingListData,
  TrainingRequestParams,
} from '@/app/(private)/hrm/types/HrmTrainingApiType';
import Dropdown from '@/app/components/common/Dropdown';
import { useModal } from '@/app/components/common/modal/useModal';
import Pagination from '@/app/components/common/Pagination';
import { KeyValueItem } from '@/app/types/CommonType';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useMemo } from 'react';
import TrainingDetailModal from '@/app/(private)/hrm/components/modals/TrainingDetailModal';

export default function EmployeeTrainingTab() {
  // --- 모달 출력 ---
  const { openModal } = useModal();

  // --- 드롭다운 ---
  const [selectedDepartment, setSelectedDepartment] = useState(''); // 부서
  const [selectedPosition, setSelectedPosition] = useState(''); // 직급

  // --- 페이지 네이션 ---
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');

  const {
    data: positionsData = [],
    isLoading: isPosLoading,
    isError: isPosError,
  } = useQuery({
    queryKey: ['positionsList'],
    queryFn: fetchPositionsList,
    staleTime: Infinity,
  });

  const {
    data: departmentsData,
    isLoading: isDeptLoading,
    isError: isDeptError,
  } = useQuery({
    queryKey: ['departmentsList'],
    queryFn: fetchDepartmentsList,
    staleTime: Infinity,
  });

  const positionOptions: KeyValueItem[] = useMemo(() => {
    return [
      { key: '', value: '전체 직급' },
      ...positionsData.map((item) => ({
        key: item.positionId,
        value: item.positionName,
      })),
    ];
  }, [positionsData]);

  const departmentsOptions: KeyValueItem[] = useMemo(() => {
    const departmentList = departmentsData?.departments ?? [];

    return [
      { key: '', value: '전체 부서' },
      ...departmentList.map((item) => ({
        key: item.departmentId,
        value: item.departmentName,
      })),
    ];
  }, [departmentsData]);

  const trainingQueryParams = useMemo(
    (): TrainingRequestParams => ({
      department: selectedDepartment || undefined,
      position: selectedPosition || undefined,
      page: currentPage - 1,
      size: pageSize,
    }),
    [selectedDepartment, selectedPosition, currentPage],
  );

  const {
    data: trainingData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['payrollList', trainingQueryParams],
    queryFn: () => fetchTrainingList(trainingQueryParams),
  });

  const trainingList = trainingData?.items ?? [];
  const pageInfo = trainingData?.page;

  const handleViewTrainingDetail = (training: TrainingListData) => {
    openModal(TrainingDetailModal, {
      title: `${training.name}의 교육현황`,
      employeeId: training.employeeId,
    });
  };

  return (
    <div>
      {/* 필터링 및 검색 */}
      <div className="flex items-center justify-end gap-3 mb-4">
        <div className="flex items-center gap-3">
          <Dropdown
            items={departmentsOptions}
            value={selectedDepartment}
            onChange={(dept: string) => {
              setSelectedDepartment(dept);
              setCurrentPage(1);
            }}
          />
          <Dropdown
            items={positionOptions}
            value={selectedPosition}
            onChange={(position: string) => {
              setSelectedPosition(position);
              setCurrentPage(1);
            }}
          />

          {/* 직원 이름 검색 */}
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="직원 이름 검색..."
              value={employeeSearchTerm}
              onChange={(e) => {
                setEmployeeSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
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
                완료된 교육
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                필수 교육
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                최근 교육일
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {trainingList.map((training) => (
              <tr key={training.employeeId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{training.name}</div>
                    <div className="text-sm text-gray-500">
                      {training.department} · {training.position}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-green-600">
                      {training.completedCount}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">개</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-red-600">
                      {training.requiredMissingCount}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">개 미완료</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {training.lastTrainingDate.split('T')[0]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewTrainingDetail(training)}
                      className="text-blue-600 hover:text-blue-900 cursor-pointer"
                      title="교육 상세보기"
                    >
                      <i className="ri-eye-line"></i>
                    </button>
                    <button
                      // onClick={() => handleAddEmployeeTraining(employee)}
                      className="text-green-600 hover:text-green-900 cursor-pointer"
                      title="교육 추가"
                    >
                      <i className="ri-add-line"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={pageInfo?.totalPages ?? 1}
        totalElements={pageInfo?.totalElements}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
