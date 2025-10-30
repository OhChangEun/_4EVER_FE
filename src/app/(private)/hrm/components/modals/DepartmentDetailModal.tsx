import { ModalProps } from '@/app/components/common/modal/types';
import { DepartmentsData } from '@/app/(private)/hrm/types/HrmDepartmentsApiType';
import IconButton from '@/app/components/common/IconButton';

interface DepartmentDetailModalProps extends ModalProps {
  departments: DepartmentsData;
  onEdit: () => void;
}

export function DepartmentDetailModal({ departments, onEdit }: DepartmentDetailModalProps) {
  return (
    <>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-normal text-gray-400 mb-1">부서장</label>
          <div className="text-sm text-gray-900">{departments.managerName}</div>
        </div>
        <div>
          <label className="block text-sm font-normal text-gray-400 mb-1">인원 수</label>
          <div className="text-sm text-gray-900">{departments.employeeCount}명</div>
        </div>
        <div>
          <label className="block text-sm font-normal text-gray-400 mb-1">설립일</label>
          <div className="text-sm text-gray-900">{departments.establishedDate}</div>
        </div>
        <div>
          <label className="block text-sm font-normal text-gray-400 mb-1">설명</label>
          <div className="text-sm text-gray-900">{departments.description}</div>
        </div>
      </div>

      <div className="flex justify-end">
        <IconButton label="수정" size="sm" icon="ri-edit-line" onClick={onEdit} />
      </div>
    </>
  );
}
