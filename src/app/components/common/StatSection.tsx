'use client';

import { useState } from 'react';
import { Period, StatCardType } from '@/app/types/StatType';
import { STAT_PERIODS } from '@/app/(private)/purchase/constants';
import PageTitle from '@/app/components/common/PageTitle';
import StatCardList from '@/app/components/statCard/StatCardList';
import SlidingNavBar from './SlidingNavBar';

interface StatSectionProps {
  title: string;
  subTitle?: string;
  statsData: Record<Period, StatCardType[]>;
}

export default function StatSection({ title, subTitle, statsData }: StatSectionProps) {
  const DEFAULT_PERIOD: Period = 'week';
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(DEFAULT_PERIOD);
  const [isOpen, setIsOpen] = useState(false);
  const stats = statsData?.[selectedPeriod] ?? [];
  const handlePeriodSelect = (key: string) => {
    setSelectedPeriod(key as Period);
  };

  return (
    <div className="mb-4">
      {/* 제목 + 좌측 컨트롤 */}
      <div className="flex items-end gap-4 flex-wrap">
        <PageTitle title={title} subTitle={subTitle} />
      </div>

      {/* 토글 버튼 + 기간 선택기 좌측 인라인 */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors border border-gray-200"
        >
          <i className="ri-bar-chart-2-line" />
          <span>{isOpen ? '지표 숨기기' : '지표 보기'}</span>
          <i className={`ri-arrow-${isOpen ? 'up' : 'down'}-s-line`} />
        </button>

        {isOpen && (
          <SlidingNavBar
            items={STAT_PERIODS}
            selectedKey={selectedPeriod}
            onSelect={handlePeriodSelect}
          />
        )}
      </div>

      {/* 지표 카드 리스트 */}
      {isOpen && <StatCardList stats={stats} period={selectedPeriod} />}
    </div>
  );
}
