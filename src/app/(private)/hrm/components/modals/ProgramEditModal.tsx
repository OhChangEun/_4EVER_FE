'use client';

import Button from '@/app/components/common/Button';
import { ModalProps } from '@/app/components/common/modal/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { FormEvent, useState } from 'react';
import { patchProgram } from '@/app/(private)/hrm/api/hrm.api';
import { UpdateProgramRequest } from '@/app/(private)/hrm/types/HrmProgramApiType';

// 목업 상태 데이터
const statusOptions = ['모집중', '진행중', '완료'];

interface EditProgramModalProps extends ModalProps {
  programId: string;
  programName: string;
}

export default function EditProgramModal({
  programId,
  programName,
  onClose,
}: EditProgramModalProps) {
  const queryClient = useQueryClient();

  const [editedName, setEditedName] = useState(programName);
  const [statusCode, setStatusCode] = useState('');

  // mutation 설정
  const mutation = useMutation({
    mutationFn: (data: UpdateProgramRequest) => patchProgram(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programList'] });
      onClose();
      alert('교육 정보가 수정되었습니다.');
    },
    onError: (error) => {
      console.error('교육 정보 수정 실패', error);
      alert('교육 정보 수정에 실패했습니다.');
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!programName.trim()) {
      alert('교육명을 입력해주세요.');
      return;
    }

    const updateData: UpdateProgramRequest = {
      programId,
      programName: editedName,
      statusCode,
    };

    mutation.mutate(updateData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 교육명 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">교육명</label>
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          placeholder="교육명을 입력하세요"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* 상태 선택 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
        <select
          value={statusCode}
          onChange={(e) => setStatusCode(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* 버튼 */}
      <div className="flex justify-end">
        <Button type="submit" label="수정" />
      </div>
    </form>
  );
}
