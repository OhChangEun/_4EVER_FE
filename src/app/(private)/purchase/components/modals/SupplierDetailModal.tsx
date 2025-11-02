'use client';

import { useState, useEffect } from 'react';
import { SupplierDetailResponse } from '@/app/(private)/purchase/types/SupplierType';
import ReadSupplierFormSection from '@/app/(private)/purchase/components/sections/SupplierTableSection';
import { useQuery } from '@tanstack/react-query';
import { fetchSupplierDetail } from '@/app/(private)/purchase/api/purchase.api';
import ModalStatusBox from '@/app/components/common/ModalStatusBox';
import { ModalProps } from '@/app/components/common/modal/types';
import { useModal } from '@/app/components/common/modal/useModal';
import ModalStatusBox2 from '@/app/components/common/ModalStatusBox2';

interface DetailSupplierModalProps extends ModalProps {
  supplierId: string;
}

export default function SupplierDetailModal({ supplierId, onClose }: DetailSupplierModalProps) {
  const { openModal } = useModal();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<SupplierDetailResponse | null>();

  const { data: supplier, isLoading } = useQuery<SupplierDetailResponse>({
    queryKey: ['supplierDetail'],
    queryFn: () => fetchSupplierDetail(supplierId),
    select: (data) => data ?? ({} as SupplierDetailResponse),
    onError: () => {
      openModal(ModalStatusBox2, {
        type: 'error',
        message: '공급업체 상세 정보 데이터를 불러오는 중 오류가 발생했습니다.',
      });
    },
  });

  // useEffect(() => {
  //   if (supplier) setEditForm(supplier);
  // }, [supplier]);

  if (isLoading)
    return <ModalStatusBox $type="loading" $message="공급업체 상세정보를 불러오는 중입니다..." />;

  return (
    <>
      {isEditMode && (
        <EditSupplierFormSection
          supplier={editForm}
          setEditForm={setEditForm}
          onCancel={() => setIsEditMode(false)}
          onSave={() => setIsEditMode(false)}
        />
      )}
      {!isEditMode && supplier && (
        <ReadSupplierFormSection supplier={supplier} onEdit={() => setIsEditMode(true)} />
      )}
    </>
  );
}
