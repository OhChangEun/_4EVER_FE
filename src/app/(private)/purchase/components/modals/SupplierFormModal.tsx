'use client';

import { useState, useEffect } from 'react';
import {
  CreateSupplierRequest,
  ModSupplierRequestBody,
  SupplierDetailResponse,
  ManagerInfo,
  Material,
} from '@/app/(private)/purchase/types/SupplierType';
import Button from '@/app/components/common/Button';
import IconButton from '@/app/components/common/IconButton';
import Dropdown from '@/app/components/common/Dropdown';
import { SupplierCategory } from '@/app/(private)/purchase/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createSupplyRequest,
  patchSupplyRequest,
  fetchSupplierCategoryDropdown,
  fetchSupplierStatusDropdown,
} from '@/app/(private)/purchase/api/purchase.api';
import { ModalProps } from '@/app/components/common/modal/types';
import { useDropdown } from '@/app/hooks/useDropdown';
import LoadingMessage from '@/app/components/common/LoadingMessage';

interface SupplierFormModalProps extends ModalProps {
  initialData?: SupplierDetailResponse; // 수정 모드일 때 전달
}

export default function SupplierFormModal({ initialData, onClose }: SupplierFormModalProps) {
  const isEditMode = !!initialData; // initialData가 있으면 수정 모드
  const queryClient = useQueryClient();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialData?.supplierInfo.category || '',
  );
  const [selectedStatus, setSelectedStatus] = useState<string>(
    initialData?.supplierInfo.supplierStatusCode || '',
  );

  // 공급업체 카테고리 드롭다운
  const { options: supplierCategoryOptions } = useDropdown(
    'supplierCategoryDropdown',
    fetchSupplierCategoryDropdown,
    'exclude',
  );
  // 공급업체 상태 드롭다운
  const { options: supplierStatusOptions } = useDropdown(
    'supplierStatusDropdown',
    fetchSupplierStatusDropdown,
    'exclude',
  );

  const [supplierInfo, setSupplierInfo] = useState({
    supplierName: initialData?.supplierInfo.supplierName || '',
    supplierEmail: initialData?.supplierInfo.supplierEmail || '',
    supplierPhone: initialData?.supplierInfo.supplierPhone || '',
    supplierBaseAddress: initialData?.supplierInfo.supplierBaseAddress || '',
    supplierDetailAddress: initialData?.supplierInfo.supplierDetailAddress || '',
    category: initialData?.supplierInfo.category || ('ALL' as SupplierCategory),
    statusCode: initialData?.supplierInfo.supplierStatusCode || '',
    deliveryLeadTime: initialData?.supplierInfo.deliveryLeadTime || 0,
  });

  const [managerInfo, setManagerInfo] = useState<ManagerInfo>({
    managerName: initialData?.managerInfo.managerName || '',
    managerPhone: initialData?.managerInfo.managerPhone || '',
    managerEmail: initialData?.managerInfo.managerEmail || '',
  });

  const [materialList, setMaterialList] = useState<Material[]>([
    {
      materialName: '',
      uomCode: '',
      unitPrice: 0,
    },
  ]);

  // 카테고리 변경 시 supplierInfo 업데이트
  useEffect(() => {
    if (selectedCategory) {
      setSupplierInfo((prev) => ({
        ...prev,
        category: selectedCategory as SupplierCategory,
      }));
    }
  }, [selectedCategory]);

  // 생성 mutation
  const { mutate: submitSupplierCreate, isPending: isCreating } = useMutation({
    mutationFn: createSupplyRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplierList'] });
      alert('공급업체 등록이 완료되었습니다.');
      onClose();
    },
  });

  // 수정 mutation
  // 수정 mutation 부분만 수정
  const { mutate: submitSupplierUpdate, isPending: isUpdating } = useMutation({
    mutationFn: (body: ModSupplierRequestBody) => {
      const supplierId = initialData?.supplierInfo.supplierId;
      if (!supplierId) {
        throw new Error('공급업체 ID를 찾을 수 없습니다.');
      }
      return patchSupplyRequest(supplierId, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplierList'] });
      if (initialData?.supplierInfo.supplierId) {
        queryClient.invalidateQueries({
          queryKey: ['supplierDetail', initialData.supplierInfo.supplierId],
        });
      }
      alert('공급업체 정보가 수정되었습니다.');
      onClose();
    },
  });

  const isLoading = isCreating || isUpdating;

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

    if (isEditMode) {
      // 수정 모드
      if (
        !supplierInfo.supplierName ||
        !supplierInfo.supplierEmail ||
        !supplierInfo.supplierPhone ||
        !supplierInfo.supplierBaseAddress ||
        !supplierInfo.category ||
        !managerInfo.managerName ||
        !managerInfo.managerPhone ||
        !managerInfo.managerEmail
      ) {
        alert('모든 필수 항목을 입력해주세요.');
        return;
      }

      const updateRequest: ModSupplierRequestBody = {
        supplierName: supplierInfo.supplierName,
        supplierEmail: supplierInfo.supplierEmail,
        supplierPhone: supplierInfo.supplierPhone,
        supplierBaseAddress: supplierInfo.supplierBaseAddress,
        supplierDetailAddress: supplierInfo.supplierDetailAddress || '',
        category: supplierInfo.category,
        statusCode: supplierInfo.statusCode,
        deliverLeadTime: supplierInfo.deliveryLeadTime,
        managerName: managerInfo.managerName,
        managerPhone: managerInfo.managerPhone,
        managerEmail: managerInfo.managerEmail,
      };

      submitSupplierUpdate(updateRequest);
    } else {
      // 생성 모드
      if (
        !supplierInfo.supplierName ||
        !supplierInfo.supplierEmail ||
        !supplierInfo.supplierPhone ||
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

      // CreateSupplierRequest 형태로 데이터 구성
      const supplierRequest: CreateSupplierRequest = {
        supplierInfo: {
          supplierName: supplierInfo.supplierName,
          supplierEmail: supplierInfo.supplierEmail,
          supplierPhone: supplierInfo.supplierPhone,
          supplierBaseAddress: supplierInfo.supplierBaseAddress,
          supplierDetailAddress: supplierInfo.supplierDetailAddress || null,
          category: supplierInfo.category,
          deliveryLeadTime: supplierInfo.deliveryLeadTime,
        },
        managerInfo,
        materialList: filteredMaterials.map((m) => ({
          materialName: m.materialName,
          uomCode: m.uomCode,
          unitPrice: Number(m.unitPrice),
        })),
      };

      submitSupplierCreate(supplierRequest);
    }
  };

  const getDeliveryLabel = (days: number): string => {
    if (days === 0) return '당일 배송';
    return `${days}일 배송`;
  };

  const filledMaterialCount = materialList.filter(
    (m) => m.materialName && m.uomCode && m.unitPrice,
  ).length;

  if (isLoading) {
    return isEditMode ? (
      <LoadingMessage message="공급업체 정보를 수정하는 중..." />
    ) : (
      <LoadingMessage message="공급업체를 등록하는 중..." />
    );
  }

  return (
    <>
      {/* 폼 */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* 공급업체 정보 섹션 */}
        <div>
          <h4 className="text-md font-semibold text-gray-900 mb-2">공급업체 정보</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                업체명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={supplierInfo.supplierName}
                onChange={(e) => setSupplierInfo({ ...supplierInfo, supplierName: e.target.value })}
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
                업체 전화번호 {isEditMode && <span className="text-red-500">*</span>}
              </label>
              <input
                type="tel"
                value={supplierInfo.supplierPhone}
                onChange={(e) =>
                  setSupplierInfo({ ...supplierInfo, supplierPhone: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="예: 02-1234-5678"
                required={isEditMode}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리 <span className="text-red-500">*</span>
              </label>
              <Dropdown
                placeholder="카테고리 선택"
                items={supplierCategoryOptions}
                value={selectedCategory}
                onChange={setSelectedCategory}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"></label>
              <Dropdown
                placeholder="상태 선택"
                items={supplierStatusOptions}
                value={selectedStatus}
                onChange={setSelectedStatus}
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
          <h4 className="text-md font-semibold text-gray-900 mb-2">담당자 정보</h4>
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

        {/* 제공 가능한 자재 섹션 - 생성 모드에만 표시 */}
        {!isEditMode && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-base font-semibold text-gray-900">
                제공 가능한 자재 목록 ({filledMaterialCount}건 입력)
              </h4>
              <IconButton
                type="button"
                label="자재 추가"
                variant="secondary"
                size="sm"
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
        )}

        {/* 버튼 */}
        <div className="flex items-center justify-end pt-2 border-t border-gray-200">
          <Button label={isEditMode ? '수정' : '공급업체 등록'} type="submit" />
        </div>
      </form>
    </>
  );
}
