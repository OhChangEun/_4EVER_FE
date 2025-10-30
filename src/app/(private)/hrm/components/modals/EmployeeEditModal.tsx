import { EmployeeData, EmployeeUpdateRequest } from '@/app/(private)/hrm/types/HrmEmployeesApiType';
import IconButton from '@/app/components/common/IconButton';
import { ModalProps } from '@/app/components/common/modal/types';
import { useModal } from '@/app/components/common/modal/useModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { putEmployee } from '../../api/hrm.api';

interface EmployeeEditModalProps extends ModalProps {
  employee: EmployeeData;
}

export function EmployeeEditModal({ employee }: EmployeeEditModalProps) {
  const { removeAllModals } = useModal();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<EmployeeUpdateRequest>({
    employeeName: employee.name,
    departmentId: employee.department,
    positionId: employee.position,
  });

  // mutation 설정
  const mutation = useMutation({
    mutationFn: (data: EmployeeUpdateRequest) => putEmployee(employee.employeeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employeesList'] });

      removeAllModals();
      alert('고객정보가 수정되었습니다.');
    },
    onError: (error) => {
      console.error('직원 정보 수정 실패: ', error);
      alert('직원 정보 수정에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleInputChange = (field: keyof EmployeeUpdateRequest, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.departmentId.trim() || !formData.positionId.trim()) {
      alert('부서와 직급을 모두 입력해주세요.');
      return;
    }
    // mutation 호출
    mutation.mutate(formData);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
            <div className="text-sm text-gray-900">{employee.name}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              부서 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.departmentId}
              onChange={(e) => handleInputChange('departmentId', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              직급 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.positionId}
              onChange={(e) => handleInputChange('positionId', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">입사일</label>
            <div className="text-sm text-gray-900">{employee.hireDate}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">생년월일</label>
            <div className="text-sm text-gray-900">{employee.birthDate}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
            <div className="text-sm text-gray-900">{employee.phone}</div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
          <div className="text-sm text-gray-900">{employee.email}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
          <div className="text-sm text-gray-900">{employee.address}</div>
        </div>
      </div>

      <div className="flex justify-end">
        <IconButton label="저장" size="sm" icon="ri-save-line" onClick={handleSave} />
      </div>
    </>
  );
}
