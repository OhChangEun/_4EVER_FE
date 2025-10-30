'use client';

import Button from '@/app/components/common/Button';
import { ModalProps } from '@/app/components/common/modal/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { FormEvent } from 'react';
import { postProgramToEmployee } from '@/app/(private)/hrm/api/hrm.api';
import { UpdateProgramToEmployeeRequest } from '@/app/(private)/hrm/types/HrmProgramApiType';

interface Training {
  id: string;
  title: string;
  status: string;
}

// 임의의 교육 프로그램 목업 데이터
const availableTrainings: Training[] = [
  { id: '1', title: '자동차 전장 기초 교육', status: '모집중' },
  { id: '2', title: 'C# 네트워크 통신 실습', status: '모집중' },
  { id: '3', title: 'React 프론트엔드 심화 과정', status: '마감' },
];

interface AddEmployeeTrainingModalProps extends ModalProps {
  employeeId: string;
}

export default function AddEmployeeTrainingModal({
  employeeId,
  onClose,
}: AddEmployeeTrainingModalProps) {
  const queryClient = useQueryClient();

  // mutation 설정
  const mutation = useMutation({
    mutationFn: ({ employeeId, programId }: UpdateProgramToEmployeeRequest) =>
      postProgramToEmployee({ employeeId, programId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainingList'] });
      onClose();
      alert('교육 프로그램이 지정되었습니다.');
    },
    onError: (error) => {
      console.log('교육 프로그램 추가 실패', error);
      alert('교육 프로그램 지정에 실패했습니다.');
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const programId = formData.get('programId') as string;
    if (!programId) return alert('교육 프로그램을 선택해주세요.');

    mutation.mutate({ employeeId, programId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 교육 프로그램 선택 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">교육 프로그램 선택</label>
        <select
          name="programId"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
        >
          <option value="">교육 프로그램 선택</option>
          {availableTrainings
            .filter((t) => t.status === '모집중')
            .map((training) => (
              <option key={training.id} value={training.id}>
                {training.title}
              </option>
            ))}
        </select>
      </div>

      <div className="flex justify-end">
        <Button type="submit" label="추가" />
      </div>
    </form>
  );
}
