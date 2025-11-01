'use client';

import Button from '@/app/components/common/Button';
import { ModalProps } from '@/app/components/common/modal/types';
import { useMemo, useState } from 'react';
import { EmployeeRegistRequest } from '@/app/(private)/hrm/types/HrmEmployeesApiType';
import { useDepartmentsDropdown } from '@/app/hooks/useDepartmentsDropdown';
import Dropdown from '@/app/components/common/Dropdown';
import { useQuery } from '@tanstack/react-query';
import { fetchPositionsDropdown } from '@/app/(private)/hrm/api/hrm.api';
import { KeyValueItem } from '@/app/types/CommonType';

export default function EmployeeRegisterModal({ onClose }: ModalProps) {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');

  // 부서 드롭다운(전체 제외)
  const {
    options: departmentsOptions,
    isLoading: dropdownLoading,
    isError: dropdownError,
  } = useDepartmentsDropdown(false);

  const {
    data: positionData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['positionsDropdown', selectedDepartment],
    queryFn: () => fetchPositionsDropdown(selectedDepartment),
    enabled: !!selectedDepartment,
  });

  const positionsOptions: KeyValueItem[] = useMemo(() => {
    const list = positionData ?? [];
    const mapped = list.map((p) => ({
      key: p.positionId,
      value: p.positionName,
    }));

    return mapped;
  }, [positionData]);

  const [formData, setFormData] = useState<EmployeeRegistRequest>({
    name: '',
    departmentId: '',
    positionId: '',
    email: '',
    phoneNumber: '',
    hireDate: '',
    birthDate: '',
    gender: '',
    address: '',
    academicHistory: '',
    careerHistory: '',
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

    // 폼 초기화
    setFormData({
      name: '',
      departmentId: '',
      positionId: '',
      email: '',
      phoneNumber: '',
      hireDate: '',
      birthDate: '',
      gender: '',
      address: '',
      academicHistory: '',
      careerHistory: '',
    });

    onClose();
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
              items={positionsOptions}
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
            name="phone"
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
            name="joinDate"
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="서울시 강남구 테헤란로 123"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" label="등록" />
      </div>
    </form>
  );
}
