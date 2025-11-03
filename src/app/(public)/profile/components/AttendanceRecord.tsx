'use client';

import { FormEvent, useState } from 'react';

export default function AttendanceRecord() {
  const [currentStatus, setCurrentStatus] = useState('출근');
  const [showCalendar, setShowCalendar] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    leaveType: '연차',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const todayAttendance = {
    checkIn: '09:00',
    checkOut: currentStatus === '퇴근' ? '18:30' : null,
    workHours: currentStatus === '퇴근' ? '8시간 30분' : '진행중',
    status: currentStatus === '출근' ? '근무중' : '퇴근완료',
  };

  const recentAttendance = [
    {
      date: '2024-12-20',
      checkIn: '09:00',
      checkOut: '18:30',
      workHours: '8시간 30분',
      status: '정상',
    },
    {
      date: '2024-12-19',
      checkIn: '09:15',
      checkOut: '18:45',
      workHours: '8시간 30분',
      status: '지각',
    },
    {
      date: '2024-12-18',
      checkIn: '08:55',
      checkOut: '18:25',
      workHours: '8시간 30분',
      status: '정상',
    },
    {
      date: '2024-12-17',
      checkIn: '09:00',
      checkOut: '18:30',
      workHours: '8시간 30분',
      status: '정상',
    },
    {
      date: '2024-12-16',
      checkIn: '09:00',
      checkOut: '18:30',
      workHours: '8시간 30분',
      status: '정상',
    },
  ];

  const handleCheckInOut = () => {
    if (currentStatus === '출근') {
      setCurrentStatus('퇴근');
    } else {
      setCurrentStatus('출근');
    }
  };

  const handleLeaveFormChange = (key: keyof typeof leaveForm, value: string) => {
    setLeaveForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLeaveSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('휴가 신청이 접수되었습니다.');
    setIsLeaveModalOpen(false);
    setLeaveForm({
      leaveType: '연차',
      startDate: '',
      endDate: '',
      reason: '',
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-3">
              {/* <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-time-line text-purple-600 text-lg"></i>
              </div> */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">근태 기록</h2>
                <p className="text-sm text-gray-500">출퇴근 관리 및 근무 현황</p>
              </div>
            </div>
            <button
              onClick={() => setIsLeaveModalOpen(true)}
              className="inline-flex items-center justify-center space-x-1 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-purple-700"
            >
              <i className="ri-flight-takeoff-line"></i>
              <span>휴가 신청</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* 오늘 근태 현황 */}
          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">오늘 근태 현황</h3>
              <span className="text-xs text-gray-500">
                {new Date().toLocaleDateString('ko-KR')}
              </span>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-500">출근시간</span>
                <p className="text-sm font-medium text-gray-900">{todayAttendance.checkIn}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">퇴근시간</span>
                <p className="text-sm font-medium text-gray-900">
                  {todayAttendance.checkOut || '-'}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-500">근무시간</span>
                <p className="text-sm font-medium text-gray-900">{todayAttendance.workHours}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">상태</span>
                <p
                  className={`text-sm font-medium ${currentStatus === '출근' ? 'text-green-600' : 'text-blue-600'}`}
                >
                  {todayAttendance.status}
                </p>
              </div>
            </div>

            <button
              onClick={handleCheckInOut}
              className={`w-full whitespace-nowrap rounded-lg py-3 px-4 font-medium transition-colors duration-200 ${
                currentStatus === '출근'
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {currentStatus === '출근' ? '퇴근하기' : '출근하기'}
            </button>
          </div>

          {/* 최근 근태 기록 */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-900">최근 근태 기록</h3>
            <div className="space-y-2">
              {recentAttendance.map((record, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900">{record.date}</span>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        record.status === '정상'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {record.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {record.checkIn} - {record.checkOut}
                    </p>
                    <p className="text-xs text-gray-700">{record.workHours}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isLeaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">휴가 신청</h3>
                <p className="text-sm text-gray-500">휴가 정보를 입력하고 신청을 완료하세요.</p>
              </div>
              <button
                onClick={() => setIsLeaveModalOpen(false)}
                className="text-gray-400 transition-colors hover:text-gray-600"
                aria-label="닫기"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleLeaveSubmit} className="space-y-4 px-6 py-6">
              <div>
                <label
                  htmlFor="leave-type"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  휴가 유형
                </label>
                <select
                  id="leave-type"
                  value={leaveForm.leaveType}
                  onChange={(event) => handleLeaveFormChange('leaveType', event.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                >
                  <option value="연차">연차</option>
                  <option value="반차">반차</option>
                  <option value="병가">병가</option>
                  <option value="경조사">경조사</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="leave-start"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    시작일
                  </label>
                  <input
                    id="leave-start"
                    type="date"
                    value={leaveForm.startDate}
                    onChange={(event) => handleLeaveFormChange('startDate', event.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="leave-end"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    종료일
                  </label>
                  <input
                    id="leave-end"
                    type="date"
                    value={leaveForm.endDate}
                    onChange={(event) => handleLeaveFormChange('endDate', event.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="leave-reason"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  신청 사유
                </label>
                <textarea
                  id="leave-reason"
                  value={leaveForm.reason}
                  onChange={(event) => handleLeaveFormChange('reason', event.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                  placeholder="휴가 사유를 입력하세요."
                  rows={4}
                  required
                />
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsLeaveModalOpen(false)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 sm:w-auto"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-700 sm:w-auto"
                >
                  신청하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
