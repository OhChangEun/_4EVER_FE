'use client';

import { useState, useEffect, useRef } from 'react';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { formatDate } from '@/app/utils/date';
import Button from './Button';

interface CalendarButtonProps {
  selectedDate: string | null;
  onDateChange: (date: string | null) => void;
  placeholder?: string; // 기본 버튼 문구
}

export default function CalendarButton({
  selectedDate,
  onDateChange,
  placeholder = '날짜 선택',
}: CalendarButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const dateValue = selectedDate ? new Date(selectedDate) : null;

  const handleSelect = (newDate: Date | null) => {
    onDateChange(formatDate(newDate));
    setIsOpen(false); // 날짜 선택 시 닫기
  };

  const handleReset = () => {
    onDateChange(null); // 선택된 값 초기화
    setIsOpen(false); // 닫기
  };

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div ref={wrapperRef} className="relative inline-block">
        <Button
          label={selectedDate || placeholder}
          variant={selectedDate ? 'soft' : 'secondary'}
          size="sm"
          onClick={() => setIsOpen((prev) => !prev)}
        />

        {/* 달력 부분 */}
        {isOpen && (
          <div className="absolute z-50 mt-2 bg-white rounded-md shadow-md border border-gray-200 pb-6">
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              value={dateValue}
              onChange={handleSelect}
              minDate={new Date(2000, 0, 1)}
              maxDate={new Date(2030, 11, 31)}
              slotProps={{
                actionBar: { actions: [] },
              }}
            />

            {/* 초기화 버튼 */}
            <div className="absolute z-50 bottom-3 right-3 flex justify-end">
              <Button label="초기화" variant="outline" size="sm" onClick={handleReset} />
            </div>
          </div>
        )}
      </div>
    </LocalizationProvider>
  );
}
