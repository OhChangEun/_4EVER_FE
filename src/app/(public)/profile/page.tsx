'use client';

import { useState } from 'react';

import AttendanceRecord from './components/AttendanceRecord';
import ProfileHeader from './components/ProfileHeader';
import TrainingStatus from './components/TrainingStatus';
import EmploymentInfo, { EmploymentData } from './components/EmploymentInfo';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [employmentData, setEmploymentData] = useState<EmploymentData>({
    employeeId: '019a3811-bc69-7124-bdf7-db8cb311f48a',
    employeeNumber: 'EMP-001',
    name: '김철수',
    email: 'chulsoo.kim@example.com',
    phone: '010-1111-1111',
    position: '사원',
    department: '구매',
    statusCode: 'ACTIVE',
    hireDate: '2023-01-01',
    birthDate: '1995-03-15',
    address: '서울특별시 강남구',
    createdAt: '2025-10-31',
    updatedAt: '2025-10-31',
    trainings: [
      {
        trainingId: 'TRN-001',
        trainingName: '신입사원 기본 교육',
        category: '입문',
        durationHours: 16,
        completionStatus: '완료',
      },
      {
        trainingId: 'TRN-002',
        trainingName: '구매 프로세스 이해',
        category: '업무',
        durationHours: 8,
        completionStatus: '진행 중',
      },
      {
        trainingId: 'TRN-003',
        trainingName: '엑셀 데이터 분석 실무',
        category: '기술',
        durationHours: 12,
        completionStatus: '대기',
      },
      {
        trainingId: 'TRN-004',
        trainingName: '협상력 향상 워크숍',
        category: '리더십',
        durationHours: 6,
        completionStatus: '완료',
      },
    ],
  });

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleEmploymentSave = (updatedData: EmploymentData) => {
    setEmploymentData(updatedData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader isEditing={isEditing} onToggleEdit={handleToggleEdit} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <EmploymentInfo
            isEditing={isEditing}
            employmentData={employmentData}
            onSave={handleEmploymentSave}
            onCancel={handleCancelEdit}
          />
          <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-[22rem_1fr]">
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <AttendanceRecord />
            </div>
            <div>
              <TrainingStatus />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
