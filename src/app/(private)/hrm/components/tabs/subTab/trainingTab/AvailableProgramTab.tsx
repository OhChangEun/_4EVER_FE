'use client';

import { fetchProgramList } from '@/app/(private)/hrm/api/hrm.api';
import { ProgramListData, ProgramRequestParams } from '@/app/(private)/hrm/types/HrmProgramApiType';
import IconButton from '@/app/components/common/IconButton';
import { useModal } from '@/app/components/common/modal/useModal';
import Pagination from '@/app/components/common/Pagination';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useMemo } from 'react';
import ProgramDetailModal from '@/app/(private)/hrm/components/modals/ProgramDetailModal';

export default function AvailableProgramTab() {
  // --- 모달 출력 ---
  const { openModal } = useModal();

  // --- 페이지 네이션 ---
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const programQueryParams = useMemo(
    (): ProgramRequestParams => ({
      page: currentPage - 1,
      size: pageSize,
    }),
    [currentPage],
  );

  const {
    data: programData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['programList', programQueryParams],
    queryFn: () => fetchProgramList(programQueryParams),
  });

  const programList = programData?.content ?? [];
  const pageInfo = programData?.page;

  const handleViewProgramDetail = (programId: ProgramListData) => {
    openModal(ProgramDetailModal, {
      title: '프로그램 상세 조회',
      programId: programId.programId,
    });
  };
  return (
    <div>
      <div className="flex items-center justify-end mb-4">
        <IconButton icon="ri-add-line" label="프로그램 추가" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programList.map((program) => (
          <div key={program.programId} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">{program.programName}</h4>
                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {program.category}
                </span>
              </div>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                {program.statusCode}
              </span>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <i className="ri-time-line mr-2"></i>
                <span className="pt-1">{program.trainingHour}시간</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <i className="ri-computer-line mr-2"></i>
                <span className="pt-1">{program.isOnline}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <i className="ri-team-line mr-2"></i>
                <span className="pt-1">{program.capacity}명</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <IconButton
                icon="ri-eye-line mr-1"
                label="상세보기"
                variant="whiteOutline"
                onClick={() => handleViewProgramDetail(program)}
              />
              <IconButton icon="ri-edit-line mr-1" label="프로그램 관리" />
            </div>
          </div>
        ))}
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
