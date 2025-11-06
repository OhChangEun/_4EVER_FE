'use client';

import Button from '@/app/components/common/Button';
import { ModalProps } from '@/app/components/common/modal/types';
import { useMemo, useState } from 'react';
import Dropdown from '@/app/components/common/Dropdown';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchDepartmentsDropdown,
  fetchPositionsDropdown,
  postEmployeeRegister,
} from '@/app/(private)/hrm/api/hrm.api';
import { KeyValueItem } from '@/app/types/CommonType';
import { EmployeeRegisterRequest } from '../../types/HrmEmployeesApiType';
import { useDropdown } from '@/app/hooks/useDropdown';

export default function EmployeeRegisterModal({ onClose }: ModalProps) {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');

  // 부서 드롭다운
  const { options: departmentsOptions } = useDropdown(
    'departmentsDropdown',
    fetchDepartmentsDropdown,
    'include',
  );

  const {
    data: positionData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['positionsDropdown', selectedDepartment],
    queryFn: () => fetchPositionsDropdown(selectedDepartment),
    enabled: !!selectedDepartment,
  });

  const mutation = useMutation({
    mutationFn: (body: EmployeeRegisterRequest) => postEmployeeRegister(body),
    onSuccess: () => {
      alert('회원 등록 성공');
    },
    onError: (error) => {
      console.log('회원 등록 실패: ', error);
      alert('회원 등록에 실패했습니다.');
    },
  });

  const [formData, setFormData] = useState<EmployeeRegisterRequest>({
    name: '',
    departmentId: '',
    positionId: '',
    email: '',
    phoneNumber: '',
    hireDate: '',
    birthDate: '',
    baseAddress: '',
    detailAddress: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requestBodyData: EmployeeRegisterRequest = {
      ...formData,
      departmentId: selectedDepartment,
      positionId: selectedPosition,
    };

    mutation.mutate(requestBodyData);

    // 폼 초기화
    setFormData({
      name: '',
      departmentId: '',
      positionId: '',
      email: '',
      phoneNumber: '',
      hireDate: '',
      birthDate: '',
      baseAddress: '',
      detailAddress: '',
    });

    //onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {/* 이메일 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="hong@company.com"
          />
        </div>
        {/* 이름 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="홍길동"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <div>
          <label className="block pl-1 text-sm font-medium text-gray-700 mb-1">부서</label>
          <Dropdown
            items={departmentsOptions}
            value={selectedDepartment}
            onChange={(dept: string) => {
              setSelectedDepartment(dept);
              setSelectedPosition('');
            }}
            placeholder="부서 선택"
          />
        </div>

        {selectedDepartment && (
          <div className="fade-in">
            <label className="block pl-1 text-sm font-medium text-gray-700 mb-1">직급</label>
            <Dropdown
              items={positionData ?? []}
              value={selectedPosition}
              onChange={setSelectedPosition}
              placeholder="직급 선택"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
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
            name="hireDate"
            value={formData.hireDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">생년월일</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
          <input
            type="text"
            name="baseAddress"
            value={formData.baseAddress}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="서울시 강남구 테헤란로 123"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">상세 주소</label>
          <input
            type="text"
            name="detailAddress"
            value={formData.detailAddress}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="3층 301호 (역삼동, 강남빌딩)

"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" label="등록" />
      </div>
    </form>
  );
}
