'use client';

import { useState } from 'react';

import AttendanceRecord from './components/AttendanceRecord';
import ProfileHeader from './components/ProfileHeader';
import TrainingStatus from './components/TrainingStatus';
import EmploymentInfo, { EmploymentData } from './components/EmploymentInfo';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [employmentData, setEmploymentData] = useState<EmploymentData>({
    employeeId: 'EMP-2021-001',
    name: '홍길동',
    department: '개발팀',
    position: '선임연구원',
    rank: '대리',
    hireDate: '2021-03-15',
    workYears: '3년 9개월',
    employmentType: '정규직',
    workLocation: '서울 본사',
    directManager: '김팀장',
    email: 'hong@company.com',
    phone: '010-1234-5678',
    address: '서울시 강남구 테헤란로 123',
    emergencyContact: '010-9876-5432 (배우자)',
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
