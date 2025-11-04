'use client';

import Button from '@/app/components/common/Button';
import IconButton from '@/app/components/common/IconButton';
import Dropdown from '@/app/components/common/Dropdown';
import { ModalProps } from '@/app/components/common/modal/types';
import { useState } from 'react';

interface BomInputFormModalProps extends ModalProps {
  editMode?: boolean;
}

interface MaterialInfo {
  id: string;
  name: string;
  productCode: string;
  type: string;
  supplier: string;
  unit: string;
  unitPrice: number;
}

interface OperationInfo {
  id: string;
  name: string;
}

interface BomItem {
  id: string;
  itemId: string;
  materialInfo?: MaterialInfo;
  quantity: number;
  operationId: string;
  sequence: number;
}

// 목업 데이터
const MOCK_MATERIALS: MaterialInfo[] = [
  {
    id: 'M001',
    name: '디스플레이 패널',
    productCode: 'DP-2024-001',
    type: '전자부품',
    supplier: '삼성디스플레이',
    unit: '개',
    unitPrice: 150000,
  },
  {
    id: 'M002',
    name: 'AP 칩셋',
    productCode: 'AP-2024-002',
    type: '반도체',
    supplier: '퀄컴',
    unit: '개',
    unitPrice: 80000,
  },
  {
    id: 'M003',
    name: '배터리',
    productCode: 'BT-2024-003',
    type: '전지',
    supplier: 'LG에너지솔루션',
    unit: '개',
    unitPrice: 45000,
  },
  {
    id: 'M004',
    name: '카메라 모듈',
    productCode: 'CM-2024-004',
    type: '광학부품',
    supplier: '소니',
    unit: '개',
    unitPrice: 35000,
  },
  {
    id: 'M005',
    name: '케이스',
    productCode: 'CS-2024-005',
    type: '외장재',
    supplier: '폭스콘',
    unit: '개',
    unitPrice: 12000,
  },
];

const MOCK_OPERATIONS: OperationInfo[] = [
  { id: 'OP001', name: '조립' },
  { id: 'OP002', name: '검사' },
  { id: 'OP003', name: '테스트' },
  { id: 'OP004', name: '포장' },
];

export default function BomInputFormModal({ editMode = false }: BomInputFormModalProps) {
  const [productName, setProductName] = useState('');
  const [unit, setUnit] = useState('');
  const [bomItems, setBomItems] = useState<BomItem[]>([]);

  const materialOptions = MOCK_MATERIALS.map((m) => ({
    key: m.id,
    value: m.name,
  }));

  const operationOptions = MOCK_OPERATIONS.map((o) => ({
    key: o.id,
    value: o.name,
  }));

  const handleAddRow = () => {
    const newItem: BomItem = {
      id: Date.now().toString(),
      itemId: '',
      quantity: 1,
      operationId: '',
      sequence: bomItems.length + 1,
    };
    setBomItems([...bomItems, newItem]);
  };

  const handleRemoveRow = (id: string) => {
    setBomItems(bomItems.filter((item) => item.id !== id));
  };

  const handleMaterialChange = (id: string, materialId: string) => {
    const material = MOCK_MATERIALS.find((m) => m.id === materialId);
    setBomItems(
      bomItems.map((item) =>
        item.id === id ? { ...item, itemId: materialId, materialInfo: material } : item,
      ),
    );
  };

  const handleItemChange = (id: string, field: keyof BomItem, value: string | number) => {
    setBomItems(bomItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const bomData = {
      productName,
      unit,
      items: bomItems.map(({ id, materialInfo, ...rest }) => rest),
    };

    console.log('BOM 데이터:', bomData);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between gap-3">
          <div className="flex-1">
            <h4 className="text-md font-semibold text-gray-900 mb-4">제품명</h4>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="휴대폰"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <div className="flex-1">
            <h4 className="text-md font-semibold text-gray-900 mb-4">단위</h4>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="EA"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-semibold text-gray-900">구성품 리스트</h4>
            <IconButton
              type="button"
              icon="ri-add-line"
              variant="outline"
              size="sm"
              onClick={handleAddRow}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    '자재',
                    '제품 코드',
                    '타입',
                    '공급사',
                    '단위',
                    '단가',
                    '수량',
                    '작업',
                    '공정 순서',
                    '삭제',
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bomItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-3 py-2 w-40">
                      <Dropdown
                        items={materialOptions}
                        value={item.itemId}
                        onChange={(value) => handleMaterialChange(item.id, value)}
                        placeholder="선택"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        className="w-32 px-2 py-1 border border-gray-200 rounded text-sm bg-gray-50"
                        value={item.materialInfo?.productCode || ''}
                        disabled
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        className="w-24 px-2 py-1 border border-gray-200 rounded text-sm bg-gray-50"
                        value={item.materialInfo?.type || ''}
                        disabled
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        className="w-32 px-2 py-1 border border-gray-200 rounded text-sm bg-gray-50"
                        value={item.materialInfo?.supplier || ''}
                        disabled
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        className="w-16 px-2 py-1 border border-gray-200 rounded text-sm bg-gray-50"
                        value={item.materialInfo?.unit || ''}
                        disabled
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        className="w-24 px-2 py-1 border border-gray-200 rounded text-sm bg-gray-50 text-right"
                        value={
                          item.materialInfo?.unitPrice
                            ? item.materialInfo.unitPrice.toLocaleString() + '원'
                            : ''
                        }
                        disabled
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(item.id, 'quantity', Number(e.target.value))
                        }
                        min="1"
                      />
                    </td>
                    <td className="px-3 py-2 w-32">
                      <Dropdown
                        items={operationOptions}
                        value={item.operationId}
                        onChange={(value) => handleItemChange(item.id, 'operationId', value)}
                        placeholder="선택"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        value={item.sequence}
                        onChange={(e) =>
                          handleItemChange(item.id, 'sequence', Number(e.target.value))
                        }
                        min="1"
                        disabled
                      />
                    </td>
                    <td className="px-3 py-2">
                      <IconButton
                        type="button"
                        icon="ri-delete-bin-line"
                        size="sm"
                        onClick={() => handleRemoveRow(item.id)}
                      />
                    </td>
                  </tr>
                ))}
                {bomItems.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-3 py-8 text-center text-gray-500 text-sm">
                      구성품을 추가해주세요
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button label={editMode ? '수정' : '생성'} type="submit" />
        </div>
      </form>
    </div>
  );
}
