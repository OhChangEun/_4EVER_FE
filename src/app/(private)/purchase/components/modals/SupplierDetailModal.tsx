'use client';

import { useState, useEffect } from 'react';
import { SupplierDetailResponse } from '@/app/(private)/purchase/types/SupplierType';
import ReadSupplierFormSection from '@/app/(private)/purchase/components/sections/SupplierTableSection';
import EditSupplierFormSection from '@/app/(private)/purchase/components/sections/EditSupplierFormSection';
import { useQuery } from '@tanstack/react-query';
import { fetchSupplierDetail } from '../../api/purchase.api';
import ModalStatusBox from '@/app/components/common/ModalStatusBox';

interface DetailSupplierModalProps {
  supplierId: number;
  onClose: () => void;
}

export default function SupplierDetailModal({ supplierId, onClose }: DetailSupplierModalProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<SupplierDetailResponse | null>();

  const {
    data: supplier,
    isLoading,
    isError,
  } = useQuery<SupplierDetailResponse>({
    queryKey: ['suppliers-detail'],
    queryFn: () => fetchSupplierDetail(supplierId),
  });

  useEffect(() => {
    if (supplier) setEditForm(supplier);
  }, [supplier]);

  const [errorModal, setErrorModal] = useState(false);
  useEffect(() => {
    setErrorModal(isError);
  }, [isError]);

  if (!supplier) return null;

  if (isLoading)
    return <ModalStatusBox $type="loading" $message="공급업체 상세정보를 불러오는 중입니다..." />;

  if (errorModal)
    return (
      <ModalStatusBox
        $type="error"
        $message="공급업체 상세 정보 데이터를 불러오는 중 오류가 발생했습니다."
        $onClose={() => setErrorModal(false)}
      />
    );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* {isEditMode && (
          <EditSupplierFormSection
            supplier={editForm}
            setEditForm={setEditForm}
            onCancel={() => setIsEditMode(false)}
            onSave={() => setIsEditMode(false)}
          />
        )} */}
        {supplier && !isEditMode && (
          <ReadSupplierFormSection
            supplier={supplier}
            onEdit={() => setIsEditMode(true)}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}
