import { EmployeeData } from '@/app/(private)/hrm/types/HrmEmployeesApiType';
import IconButton from '@/app/components/common/IconButton';
import { ModalProps } from '@/app/components/common/modal/types';
import { useModal } from '@/app/components/common/modal/useModal';
import { useState } from 'react';

interface EmployeeEditModalProps extends ModalProps {
  employee: EmployeeData;
}

export function EmployeeEditModal({ employee }: EmployeeEditModalProps) {
  const { removeAllModals } = useModal();

  const [formData, setFormData] = useState({
    department: employee.department,
    position: employee.position,
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
      employeeId: employee.employeeId,
      ...formData,
    });

    removeAllModals(); // 모든 모달창 닫기
    alert('고객정보가 수정되었습니다.');
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
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              직급 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => handleInputChange('position', e.target.value)}
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
