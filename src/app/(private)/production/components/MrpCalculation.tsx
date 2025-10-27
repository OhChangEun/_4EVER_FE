'use client';

import { useState } from 'react';

export default function MrpCalculation() {
  const [showCalculationModal, setShowCalculationModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  // const [selectedMrpResult, setSelectedMrpResult] = useState<any>(null);

  const mrpResults = [
    {
      id: 'MRP-001',
      planId: 'MPS-001',
      productName: '산업용 모터 5HP',
      calculationDate: '2024-01-15',
      status: 'completed',
      totalMaterials: 4,
      shortageItems: 1,
      totalCost: 4250000,
      materials: [
        {
          code: 'STEEL-001',
          name: '스테인리스 스틸',
          required: 100,
          available: 150,
          shortage: 0,
          orderDate: '2024-01-18',
          deliveryDate: '2024-01-25',
          unit: 'KG',
        },
        {
          code: 'COPPER-001',
          name: '구리선',
          required: 250,
          available: 200,
          shortage: 50,
          orderDate: '2024-01-16',
          deliveryDate: '2024-01-20',
          unit: 'M',
        },
        {
          code: 'BEARING-001',
          name: '베어링 6205',
          required: 200,
          available: 180,
          shortage: 20,
          orderDate: '2024-01-17',
          deliveryDate: '2024-01-22',
          unit: 'EA',
        },
        {
          code: 'BOLT-001',
          name: '볼트 M8x20',
          required: 600,
          available: 800,
          shortage: 0,
          orderDate: null,
          deliveryDate: null,
          unit: 'EA',
        },
      ],
      mrpSchedule: {
        'STEEL-001': {
          weeks: ['9월 1주차', '9월 2주차', '9월 3주차', '9월 4주차', '10월 1주차', '10월 2주차'],
          data: [
            { type: '필요 수량', values: [40, 0, 0, 0, 0, 0] },
            { type: '필요 시점', values: ['9월 3주차', '', '', '', '', ''] },
            { type: '리드타임', values: ['2주', '', '', '', '', ''] },
            { type: '최소 발주 시점', values: ['9월 1주차', '', '', '', '', ''] },
          ],
        },
        'COPPER-001': {
          weeks: ['9월 1주차', '9월 2주차', '9월 3주차', '9월 4주차', '10월 1주차', '10월 2주차'],
          data: [
            { type: '필요 수량', values: [20, 0, 0, 0, 0, 0] },
            { type: '필요 시점', values: ['9월 3주차', '', '', '', '', ''] },
            { type: '리드타임', values: ['2주', '', '', '', '', ''] },
            { type: '최소 발주 시점', values: ['9월 1주차', '', '', '', '', ''] },
          ],
        },
        'BEARING-001': {
          weeks: ['9월 1주차', '9월 2주차', '9월 3주차', '9월 4주차', '10월 1주차', '10월 2주차'],
          data: [
            { type: '필요 수량', values: [1, 0, 0, 0, 0, 0] },
            { type: '필요 시점', values: ['9월 3주차', '', '', '', '', ''] },
            { type: '리드타임', values: ['1주', '', '', '', '', ''] },
            { type: '최소 발주 시점', values: ['9월 2주차', '', '', '', '', ''] },
          ],
        },
        'BOLT-001': {
          weeks: ['9월 1주차', '9월 2주차', '9월 3주차', '9월 4주차', '10월 1주차', '10월 2주차'],
          data: [
            { type: '필요 수량', values: [0.4, 0, 0, 0, 0, 0] },
            { type: '필요 시점', values: ['9월 3주차', '', '', '', '', ''] },
            { type: '리드타임', values: ['1주', '', '', '', '', ''] },
            { type: '최소 발주 시점', values: ['9월 2주차', '', '', '', '', ''] },
          ],
        },
      },
    },
    {
      id: 'MRP-002',
      planId: 'MPS-002',
      productName: '알루미늄 프레임',
      calculationDate: '2024-01-14',
      status: 'pending',
      totalMaterials: 3,
      shortageItems: 2,
      totalCost: 1750000,
      materials: [
        {
          code: 'AL-001',
          name: '알루미늄 프로파일',
          required: 80,
          available: 60,
          shortage: 20,
          orderDate: '2024-01-16',
          deliveryDate: '2024-01-22',
          unit: 'M',
        },
        {
          code: 'SCREW-001',
          name: '나사 M6x15',
          required: 320,
          available: 200,
          shortage: 120,
          orderDate: '2024-01-17',
          deliveryDate: '2024-01-20',
          unit: 'EA',
        },
        {
          code: 'BRACKET-001',
          name: '브라켓',
          required: 40,
          available: 50,
          shortage: 0,
          orderDate: null,
          deliveryDate: null,
          unit: 'EA',
        },
      ],
      mrpSchedule: {
        'AL-001': {
          weeks: ['9월 1주차', '9월 2주차', '9월 3주차', '9월 4주차', '10월 1주차', '10월 2주차'],
          data: [
            { type: '필요 수량', values: [20, 0, 0, 0, 0, 0] },
            { type: '필요 시점', values: ['9월 3주차', '', '', '', '', ''] },
            { type: '리드타임', values: ['2주', '', '', '', '', ''] },
            { type: '최소 발주 시점', values: ['9월 1주차', '', '', '', '', ''] },
          ],
        },
        'SCREW-001': {
          weeks: ['9월 1주차', '9월 2주차', '9월 3주차', '9월 4주차', '10월 1주차', '10월 2주차'],
          data: [
            { type: '필요 수량', values: [20, 0, 0, 0, 0, 0] },
            { type: '필요 시점', values: ['9월 3주차', '', '', '', '', ''] },
            { type: '리드타임', values: ['1주', '', '', '', '', ''] },
            { type: '최소 발주 시점', values: ['9월 2주차', '', '', '', '', ''] },
          ],
        },
        'BRACKET-001': {
          weeks: ['9월 1주차', '9월 2주차', '9월 3주차', '9월 4주차', '10월 1주차', '10월 2주차'],
          data: [
            { type: '필요 수량', values: [2, 0, 0, 0, 0, 0] },
            { type: '필요 시점', values: ['9월 3주차', '', '', '', '', ''] },
            { type: '리드타임', values: ['1주', '', '', '', '', ''] },
            { type: '최소 발주 시점', values: ['9월 2주차', '', '', '', '', ''] },
          ],
        },
      },
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: '완료', class: 'bg-green-100 text-green-800' },
      pending: { label: '대기', class: 'bg-yellow-100 text-yellow-800' },
      processing: { label: '처리중', class: 'bg-blue-100 text-blue-800' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    );
  };

  // const handleDetailView = (result: any) => {
  //   setSelectedMrpResult(result);
  //   setShowDetailModal(true);
  // };

  return <div></div>;
}
