'use client';

import NewOrderModal from '@/app/(private)/sales/components/modals/NewOrderModal';
import Link from 'next/link';
import { useState } from 'react';

export default function QuickActions() {
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);

  const actions = [
    {
      title: '신규 주문 등록',
      description: '새로운 판매 주문을 등록합니다',
      icon: 'ri-add-circle-line',
      color: 'blue',
      href: '/sales',
    },
    {
      title: '신규 견적서 작성',
      description: '새로운 견적서를 작성합니다',
      icon: 'ri-file-text-line',
      color: 'indigo',
      href: '/production',
    },
    {
      title: '자재 구매 요청',
      description: '새로운 구매 요청을 생성합니다',
      icon: 'ri-shopping-cart-line',
      color: 'green',
      href: '/purchase/request/new',
    },
    {
      title: '재고 확인',
      description: '재고 현황을 확인합니다',
      icon: 'ri-archive-line',
      color: 'purple',
      href: '/inventory',
    },
    {
      title: '공급사 확인',
      description: '공급업체 정보를 확인합니다',
      icon: 'ri-building-line',
      color: 'orange',
      href: '/companies',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-100', icon: 'text-blue-600' },
      indigo: { bg: 'bg-indigo-100', icon: 'text-indigo-600' },
      green: { bg: 'bg-green-100', icon: 'text-green-600' },
      purple: { bg: 'bg-purple-100', icon: 'text-purple-600' },
      orange: { bg: 'bg-orange-100', icon: 'text-orange-600' },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <i className="ri-flashlight-line text-blue-600 text-lg"></i>
        <h2 className="text-lg font-semibold text-gray-900">빠른 작업</h2>
      </div>

      <div className="space-y-3">
        {actions.map((action, index) => {
          const colors = getColorClasses(action.color);

          const handleClick = (e: React.MouseEvent) => {
            if (action.title === '신규 견적서 작성') {
              e.preventDefault(); // 페이지 이동 막기
              setShowNewOrderModal(true); // 모달 열기
            }
          };

          return (
            <Link
              key={index}
              href={action.href}
              onClick={handleClick}
              className="group flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer border border-transparent hover:border-gray-200"
            >
              <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
                <i className={`${action.icon} ${colors.icon} text-lg`}></i>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-800">
                  {action.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{action.description}</p>
              </div>
              <i className="ri-arrow-right-line text-gray-400 group-hover:text-gray-600 transition-colors duration-200"></i>
            </Link>
          );
        })}
      </div>
      <NewOrderModal
        $showNewOrderModal={showNewOrderModal}
        $setShowNewOrderModal={setShowNewOrderModal}
      />
    </div>
  );
}
