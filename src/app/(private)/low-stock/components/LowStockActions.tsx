'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LowStockActions() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { value: 'all', label: '전체', count: 23 },
    { value: 'critical', label: '긴급', count: 8 },
    { value: 'warning', label: '주의', count: 15 },
    { value: 'pending', label: '발주대기', count: 12 },
  ];

  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer flex items-center"
        >
          <i className="ri-filter-line mr-1"></i>
          필터
          <i className="ri-arrow-down-s-line ml-1"></i>
        </button>

        {isFilterOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="py-1">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => {
                    setSelectedFilter(filter.value);
                    setIsFilterOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                    selectedFilter === filter.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <span>{filter.label}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
        <i className="ri-download-line mr-1"></i>
        내보내기
      </button>
    </div>
  );
}
