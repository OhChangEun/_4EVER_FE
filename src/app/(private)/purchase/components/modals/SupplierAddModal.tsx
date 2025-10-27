'use client';

import { useState } from 'react';
import {
  CreateSupplierRequest,
  ManagerInfo,
  Material,
} from '@/app/(private)/purchase/types/SupplierType';
import Button from '@/app/components/common/Button';
import IconButton from '@/app/components/common/IconButton';
import Dropdown from '@/app/components/common/Dropdown';
import { SUPPLIER_CATEGORY_ITEMS, SupplierCategory } from '@/app/(private)/purchase/constants';
import { useMutation } from '@tanstack/react-query';
import { createSupplyRequest } from '@/app/(private)/purchase/api/purchase.api';

interface AddSupplierModalProps {
  onClose: () => void;
}

export default function SupplierAddModal({ onClose }: AddSupplierModalProps) {
  const [supplierInfo, setSupplierInfo] = useState({
    supplierName: '',
    supplierEmail: '',
    supplierBaseAddress: '',
    supplierDetailAddress: '',
    category: 'ALL' as SupplierCategory,
    deliveryLeadTime: 0,
  });

  const [managerInfo, setManagerInfo] = useState<ManagerInfo>({
    managerName: '',
    managerPhone: '',
    managerEmail: '',
  });

  const [materialList, setMaterialList] = useState<Material[]>([
    {
      materialName: '',
      uomCode: '',
      unitPrice: 0,
    },
  ]);

  const { mutate: submitSupplierCreate } = useMutation({
    mutationFn: createSupplyRequest,
    onSuccess: (data) => {
      console.log('공급업체 등록 성공: ', data);
      alert('공급업체 등록이 완료되었습니다.');
      onClose();

      // 초기화
      setSupplierInfo({
        supplierName: '',
        supplierEmail: '',
        supplierBaseAddress: '',
        supplierDetailAddress: '',
        category: 'ALL',
        deliveryLeadTime: 0,
      });
      setManagerInfo({
        managerName: '',
        managerPhone: '',
        managerEmail: '',
      });
      setMaterialList([
        {
          materialName: '',
          uomCode: '',
          unitPrice: 0,
        },
      ]);
    },
    onError: (error) => {
      alert(`공급업체 등록 중 오류가 발생했습니다. ${error}`);
    },
  });

  const handleAddMaterialRow = (): void => {
    setMaterialList([
      ...materialList,
      {
        materialName: '',
        uomCode: '',
        unitPrice: 0,
      },
    ]);
  };

  const handleRemoveMaterialRow = (index: number): void => {
    if (materialList.length > 1) {
      setMaterialList(materialList.filter((_, i) => i !== index));
    }
  };

  const handleMaterialChange = (index: number, field: keyof Material, value: string): void => {
    const updated = [...materialList];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setMaterialList(updated);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    // 필수 기본 정보 검증
    if (
      !supplierInfo.supplierName ||
      !supplierInfo.supplierEmail ||
      !supplierInfo.supplierBaseAddress ||
      !supplierInfo.category ||
      !managerInfo.managerName ||
      !managerInfo.managerPhone ||
      !managerInfo.managerEmail
    ) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    // 입력된 자재만 필터링
    const filteredMaterials = materialList.filter(
      (m) => m.materialName && m.uomCode && m.unitPrice,
    );

    // 자재 검증
    if (filteredMaterials.length === 0) {
      alert('최소 하나의 유효한 자재 정보를 입력해야 합니다.');
      return;
    }

    // SupplierRequest 형태로 데이터 구성
    const supplierRequest: CreateSupplierRequest = {
      supplierInfo: {
        ...supplierInfo,
        supplierDetailAddress: supplierInfo.supplierDetailAddress || null,
      },
      managerInfo,
      materialList: filteredMaterials.map((m) => ({
        materialName: m.materialName,
        uomCode: m.uomCode,
        unitPrice: Number(m.unitPrice),
      })),
    };
    console.log('공급업체: ', supplierRequest);

    submitSupplierCreate(supplierRequest);
  };

  const getDeliveryLabel = (days: number): string => {
    if (days === 0) return '당일 배송';
    if (days === 1) return '1일 배송';
    return `${days}일 배송`;
  };

  const filledMaterialCount = materialList.filter(
    (m) => m.materialName && m.uomCode && m.unitPrice,
  ).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h3 className="text-xl font-semibold text-gray-900">공급업체 등록</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* 공급업체 정보 섹션 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">공급업체 정보</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  업체명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={supplierInfo.supplierName}
                  onChange={(e) =>
                    setSupplierInfo({ ...supplierInfo, supplierName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  업체 이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={supplierInfo.supplierEmail}
                  onChange={(e) =>
                    setSupplierInfo({ ...supplierInfo, supplierEmail: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="예: company@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  카테고리 <span className="text-red-500">*</span>
                </label>
                <Dropdown
                  items={SUPPLIER_CATEGORY_ITEMS}
                  value={supplierInfo.category}
                  onChange={(key) =>
                    setSupplierInfo({ ...supplierInfo, category: key as SupplierCategory })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  배송 리드타임(일) <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    value={supplierInfo.deliveryLeadTime}
                    onChange={(e) =>
                      setSupplierInfo({
                        ...supplierInfo,
                        deliveryLeadTime: parseInt(e.target.value) || 0,
                      })
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <span className="text-sm text-gray-600 whitespace-nowrap font-medium">
                    ({getDeliveryLabel(supplierInfo.deliveryLeadTime)})
                  </span>
                </div>
              </div>
            </div>

            {/* 주소 */}
            <div className="mt-6 flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  기본 주소 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={supplierInfo.supplierBaseAddress}
                  onChange={(e) =>
                    setSupplierInfo({ ...supplierInfo, supplierBaseAddress: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="예: 서울시 강남구 테헤란로 123"
                  required
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">상세 주소</label>
                <input
                  type="text"
                  value={supplierInfo.supplierDetailAddress}
                  onChange={(e) =>
                    setSupplierInfo({ ...supplierInfo, supplierDetailAddress: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="예: 2층 201호"
                />
              </div>
            </div>
          </div>

          {/* 담당자 정보 섹션 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">담당자 정보</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  담당자명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={managerInfo.managerName}
                  onChange={(e) => setManagerInfo({ ...managerInfo, managerName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  담당자 전화번호 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={managerInfo.managerPhone}
                  onChange={(e) => setManagerInfo({ ...managerInfo, managerPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="예: 010-1234-5678"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  담당자 이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={managerInfo.managerEmail}
                  onChange={(e) => setManagerInfo({ ...managerInfo, managerEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="예: manager@example.com"
                  required
                />
              </div>
            </div>
          </div>

          {/* 제공 가능한 자재 섹션 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">
                제공 가능한 자재 목록 ({filledMaterialCount}건 입력)
              </h4>
              <IconButton
                type="button"
                label="자재 추가"
                icon="ri-add-line"
                onClick={handleAddMaterialRow}
              />
            </div>

            {/* 자재 테이블 */}
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase text-center">
                      자재명
                    </th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase text-center">
                      단위
                    </th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase text-center">
                      단가
                    </th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase text-center"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {materialList.map((material, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={material.materialName}
                          onChange={(e) =>
                            handleMaterialChange(index, 'materialName', e.target.value)
                          }
                          placeholder="예: 철강봉"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={material.uomCode}
                          onChange={(e) => handleMaterialChange(index, 'uomCode', e.target.value)}
                          placeholder="예: φ10×1000mm"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={material.unitPrice}
                          onChange={(e) => handleMaterialChange(index, 'unitPrice', e.target.value)}
                          placeholder="예: ₩10,000 / EA"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveMaterialRow(index)}
                          disabled={materialList.length === 1}
                          className={`p-1 rounded cursor-pointer ${
                            materialList.length === 1
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-red-600 hover:text-red-800'
                          }`}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button label="취소" variant="whiteOutline" onClick={onClose} type="button" />
            <Button label="공급업체 등록" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
