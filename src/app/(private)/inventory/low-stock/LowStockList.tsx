'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { LowStockItemResponse } from '../types/LowStockItems';
import { getLowStockItems, getLowStockList } from '../inventory.api';
import Link from 'next/link';
import { LowStockListQueryParams } from '../types/LowStockListType';
import StatusLabel from '@/app/components/common/StatusLabel';
import Pagination from '@/app/components/common/Pagination';
import { LOW_STOCK_STATUS_OPTIONS } from '../inventory.constants';

export default function LowStockList() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('ALL');

  const lowStockItems = [
    {
      id: 'INV001',
      name: '스테인리스 스틸 파이프',
      code: 'SS-PIPE-001',
      category: '원자재',
      currentStock: 45,
      safetyStock: 50,
      unit: 'EA',
      unitPrice: 25000,
      totalValue: 1125000,
      location: 'A-01-01',
      warehouse: '제1창고',
      status: 'critical',
      supplier: '스테인리스코리아',
    },
    {
      id: 'INV002',
      name: '볼트 M8x20',
      code: 'BOLT-M8-20',
      category: '부품',
      currentStock: 110,
      safetyStock: 100,
      unit: 'EA',
      unitPrice: 500,
      totalValue: 55000,
      location: 'B-02-15',
      warehouse: '제3창고',
      status: 'warning',
      supplier: '패스너코리아',
    },
    {
      id: 'INV003',
      name: '산업용 모터 5HP',
      code: 'MOTOR-5HP-001',
      category: '부품',
      currentStock: 5,
      safetyStock: 10,
      unit: 'EA',
      unitPrice: 850000,
      totalValue: 4250000,
      location: 'C-01-05',
      warehouse: '제2창고',
      status: 'critical',
      supplier: '모터테크',
    },
    {
      id: 'INV004',
      name: '용접봉 3.2mm',
      code: 'WELD-ROD-32',
      category: '원자재',
      currentStock: 5,
      safetyStock: 20,
      unit: 'KG',
      unitPrice: 8000,
      totalValue: 40000,
      location: 'D-03-08',
      warehouse: '제1창고',
      status: 'critical',
      supplier: '용접재료상사',
    },
    {
      id: 'INV005',
      name: '베어링 6205',
      code: 'BEAR-6205',
      category: '부품',
      currentStock: 35,
      safetyStock: 30,
      unit: 'EA',
      unitPrice: 12000,
      totalValue: 420000,
      location: 'B-01-20',
      warehouse: '제3창고',
      status: 'warning',
      supplier: '베어링코리아',
    },
  ];

  const queryParams = useMemo(
    () => ({
      page: currentPage - 1,
      size: 10,
      status: statusFilter || 'ALL',
    }),
    [currentPage, statusFilter],
  );
  const {
    data: lowStockRes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['lowStockList', queryParams],
    queryFn: ({ queryKey }) => getLowStockList(queryKey[1] as LowStockListQueryParams),
    staleTime: 1000,
  });

  const lowStocks = lowStockRes?.data ?? [];
  const pageInfo = lowStockRes?.pageData;
  const totalPages = pageInfo?.totalPages ?? 1;

  const toggleSelectItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId],
    );
  };

  const handleBulkOrder = () => {
    if (selectedItems.length === 0) {
      alert('발주할 품목을 선택해주세요.');
      return;
    }

    const selectedItemsData = lowStockItems.filter((item) => selectedItems.includes(item.id));
    console.log('선택된 품목들:', selectedItemsData);
    alert(`${selectedItems.length}개 품목에 대한 발주 요청이 생성되었습니다.`);
    setSelectedItems([]);
  };

  return (
    <div className="">
      <Link
        href="/inventory"
        className="px-3 text-sm text-gray-600 hover:text-gray-800 cursor-pointer flex items-center justify-end my-5"
      >
        <i className="ri-arrow-left-line mr-1"></i>
        재고관리로 돌아가기
      </Link>
      <div className="bg-white rounded-lg  border border-gray-200 ">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">주의 재고 부족</h2>
            <div className="flex items-center space-x-4">
              <select
                value={statusFilter}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setStatusFilter(e.target.value as string)
                }
                className="bg-white px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
              >
                {LOW_STOCK_STATUS_OPTIONS.map(({ key, value }) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
              <button
                onClick={handleBulkOrder}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
              >
                <i className="ri-shopping-cart-line mr-1"></i>
                선택 품목 발주 ({selectedItems.length})
              </button>
            </div>

            {/* <Link
            href="/purchase/request/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-shopping-cart-line mr-1"></i>
            일괄 발주 요청
          </Link> */}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(lowStockItems.map((item) => item.id));
                      } else {
                        setSelectedItems([]);
                      }
                    }}
                    checked={selectedItems.length === lowStockItems.length}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  품목
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  카테고리
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  현재재고
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  안전재고
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  단가
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  총 가치
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  창고 위치
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lowStocks.map((lowStock) => (
                <tr key={lowStock.itemId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedItems.includes(lowStock.itemId)}
                      onChange={() => toggleSelectItem(lowStock.itemId)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{lowStock.itemName}</div>
                      <div className="text-sm text-gray-500">{lowStock.itemNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      {lowStock.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {lowStock.currentStock.toLocaleString()} {lowStock.uomName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {lowStock.safetyStock.toLocaleString()} {lowStock.uomName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ₩{lowStock.unitPrice.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ₩{lowStock.totalAmount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lowStock.warehouseName}</div>
                    <div className="text-sm text-gray-500">{lowStock.warehouseNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusLabel $statusCode={lowStock.statusCode} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isError || isLoading ? null : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalElements={pageInfo?.totalElements}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
}
