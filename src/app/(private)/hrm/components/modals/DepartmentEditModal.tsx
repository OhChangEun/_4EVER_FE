'use client';

import { ModalProps } from '@/app/components/common/modal/types';
import { DepartmentsData } from '@/app/(private)/hrm/types/HrmDepartmentsApiType';
import IconButton from '@/app/components/common/IconButton';
import { useMemo, useState } from 'react';
import { useModal } from '@/app/components/common/modal/useModal';
import { useQuery } from '@tanstack/react-query';
import { fetchDeptMemberDropdown } from '../../api/hrm.api';
import Dropdown from '@/app/components/common/Dropdown';

interface DepartmentEditModalProps extends ModalProps {
  departments: DepartmentsData;
}

export function DepartmentEditModal({ departments }: DepartmentEditModalProps) {
  const { removeAllModals } = useModal();

  // 선택된 부서장 상태
  const [selectedManager, setSelectedManager] = useState<string | undefined>(departments.managerId);

  const {
    data: memberOptions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['deptMemberDropdown'],
    queryFn: () => fetchDeptMemberDropdown(departments.departmentId),
  });

  const [formData, setFormData] = useState({
    manager: departments.managerName,
    position: departments.description,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // TODO: API 호출하여 수정 내용 저장
    console.log('저장할 데이터:', {
      departmentId: departments.departmentId,
      ...formData,
    });

    removeAllModals(); // 모든 모달창 닫기
    alert('부서 정보가 수정되었습니다.');
  };

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">부서명</label>
        <input
          type="text"
          required
          defaultValue={departments.departmentName + '팀'}
          disabled
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
        />
      </div>
      <div className="mt-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">부서장</label>
        <Dropdown
          items={memberOptions ?? []}
          value={selectedManager ?? ''}
          onChange={(value) => {
            setSelectedManager(value);
            handleInputChange('manager', value);
          }}
          placeholder={departments.managerName ?? ''}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          defaultValue={departments.description}
          onChange={(e) => handleInputChange('manager', e.target.value)}
        ></textarea>
      </div>
      <div className="flex justify-end">
        <IconButton label="저장" size="sm" icon="ri-save-line" onClick={handleSave} />
      </div>
    </>
  );
}
