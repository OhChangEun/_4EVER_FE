'use client';

import { FormEvent, useEffect, useState } from 'react';

export type EmploymentData = {
  employeeId: string;
  employeeNumber: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  statusCode: string;
  hireDate: string;
  birthDate: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  trainings: {
    trainingId: string;
    trainingName: string;
    category: string;
    durationHours: number;
    completionStatus: string;
  }[];
};

type EmploymentInfoProps = {
  isEditing: boolean;
  employmentData: EmploymentData;
  onSave: (data: EmploymentData) => void;
  onCancel: () => void;
};

interface EditUserRequest {
  email: string;
  phone: string;
  address: string;
}

const EmploymentInfo = ({ isEditing, employmentData, onSave, onCancel }: EmploymentInfoProps) => {
  const [formData, setFormData] = useState<EditUserRequest>({
    email: employmentData.email,
    phone: employmentData.phone,
    address: employmentData.address,
  });

  function formatWorkYears(hireDate: string): string {
    const hire = new Date(hireDate);
    const today = new Date();

    let years = today.getFullYear() - hire.getFullYear();
    let months = today.getMonth() - hire.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years === 0 && months === 0) return '1개월 미만';
    if (years === 0) return `${months}개월`;
    if (months === 0) return `${years}년`;
    return `${years}년 ${months}개월`;
  }

  useEffect(() => {
    if (isEditing) {
      setFormData(employmentData);
    }
  }, [employmentData, isEditing]);

  const displayData = employmentData;
  // const displayData = isEditing ? formData : employmentData;

  const summaryItems = [
    {
      label: '부서',
      value: displayData.department,
    },
    {
      label: '직책',
      value: displayData.position,
    },
    {
      label: '입사일',
      value: displayData.hireDate,
    },
    {
      label: '근속기간',
      // value: displayData.workYears,
      value: formatWorkYears(displayData.hireDate),
      highlight: true,
    },
  ];

  const detailItems = [
    {
      label: '이메일',
      value: displayData.email,
    },
    {
      label: '연락처',
      value: displayData.phone,
    },
    {
      label: '주소',
      value: displayData.address,
    },
  ];

  const formFields: Array<{
    key: keyof EditUserRequest;
    label: string;
    type?: string;
    readOnly?: boolean;
  }> = [
    // { key: 'name', label: '성명' },
    { key: 'address', label: '주소' },
    { key: 'email', label: '이메일', type: 'email' },
    { key: 'phone', label: '연락처' },
  ];

  const handleChange = (key: keyof EmploymentData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // onSave(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 px-6 py-8 text-white">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-white/15 flex items-center justify-center">
              <i className="ri-user-3-line text-2xl"></i>
            </div>
            <div>
              <p className="text-sm text-white/80">{displayData.employeeNumber}</p>
              <h2 className="text-2xl font-semibold">{displayData.name}</h2>
              <p className="text-sm text-white/80">
                {displayData.department} · {displayData.position}
              </p>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4 lg:w-auto">
            {summaryItems.map((item) => (
              <div
                key={item.label}
                className={`rounded-xl px-4 py-3 ${item.highlight ? 'bg-white text-blue-600' : 'bg-white/10'}`}
              >
                <span
                  className={`text-xs font-medium ${item.highlight ? 'text-blue-500' : 'text-white/70'}`}
                >
                  {item.label}
                </span>
                <p
                  className={`mt-1 text-sm font-semibold ${item.highlight ? 'text-blue-700' : 'text-white'}`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white px-6 py-6">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {formFields.map((field) => {
                const commonClasses =
                  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200';
                const isReadOnly = field.readOnly ?? false;
                const inputClasses = `${commonClasses} ${
                  isReadOnly
                    ? 'cursor-not-allowed bg-gray-100 text-gray-500 focus:border-gray-200 focus:ring-0'
                    : ''
                }`;

                return (
                  <div
                    key={field.key}
                    className={`rounded-xl border border-gray-100 bg-gray-50 px-4 py-4  
                    `}
                  >
                    <label
                      htmlFor={field.key}
                      className="mb-2 block text-xs font-medium text-gray-500"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.key}
                      type={field.type ?? 'text'}
                      value={formData[field.key]}
                      onChange={
                        isReadOnly
                          ? undefined
                          : (event) => handleChange(field.key, event.target.value)
                      }
                      readOnly={isReadOnly}
                      className={inputClasses}
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                취소
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                저장
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {detailItems.map((item) => (
              <div
                key={item.label}
                className={`rounded-xl border border-gray-100 bg-gray-50 px-4 py-4`}
              >
                <span className="text-xs font-medium text-gray-500">{item.label}</span>
                <p className="mt-1 text-sm font-medium text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmploymentInfo;
