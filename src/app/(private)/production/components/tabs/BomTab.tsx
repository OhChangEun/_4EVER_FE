'use client';

import IconButton from '@/app/components/common/IconButton';
import { BomListResponse } from '@/app/(private)/production/types/BomListApiType';
import BomDetailModal from '@/app/(private)/production/components/modals/BomDetailModal';
// import BomInputFormModal from '@/app/(private)/production/components/modals/BomInputFormModal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deletBomItem, fetchBomList } from '../../api/production.api';
import { getQueryClient } from '@/lib/queryClient';
import { useModal } from '@/app/components/common/modal/useModal';
import BomInputFormModal from '../modals/BomInputFormModal';

export default function BomTab() {
  const { openModal } = useModal();

  const queryClient = getQueryClient();

  // bom 목록 조회
  const {
    data: bomResponse,
    isLoading,
    isError,
  } = useQuery<BomListResponse>({
    queryKey: ['bomList'],
    queryFn: fetchBomList,
  });

  // bom 삭제
  const deleteMutation = useMutation({
    mutationFn: (bomId: string) => deletBomItem(bomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bomList'] });
      alert('BOM이 삭제되었습니다.');
    },
    onError: (error) => {
      console.error('BOM 삭제 실패:', error);
      alert('BOM 삭제에 실패했습니다.');
    },
  });

  // content 배열 추출
  const bomList = bomResponse?.content || [];

  const handleCreate = () => {
    openModal(BomInputFormModal, { title: 'BOM 생성' });
  };

  const handleViewDetail = (bomId: string) => {
    openModal(BomDetailModal, { title: 'BOM 상세 정보', bomId: bomId });
  };

  const handleEdit = () => {
    openModal(BomInputFormModal, { title: 'BOM 수정', editMode: true });
  };

  const handleDelete = (bomId: string) => {
    if (confirm('정말로 이 BOM을 삭제하시겠습니까?')) {
      deleteMutation.mutate(bomId);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">BOM 목록</h3>
        <IconButton label="BOM 생성" icon="ri-add-line" onClick={handleCreate} />
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <i className="ri-loader-4-line animate-spin text-3xl text-gray-400"></i>
          <p className="mt-3 text-gray-500">로딩 중...</p>
        </div>
      ) : isError ? (
        <div className="text-center py-12">
          <i className="ri-error-warning-line text-3xl text-red-400"></i>
          <p className="mt-3 text-red-500">데이터를 불러오는데 실패했습니다.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  제품 정보
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  BOM 번호
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  버전
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  최종 수정일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bomList.length > 0 ? (
                bomList.map((bom) => (
                  <tr key={bom.bomId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{bom.productName}</div>
                        <div className="text-sm text-gray-500">{bom.productNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{bom.bomNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {bom.version}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{bom.statusCode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bom.lastModifiedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleViewDetail(bom.bomId)}
                        className="text-blue-600 hover:text-blue-900 cursor-pointer"
                        disabled={deleteMutation.isPending}
                      >
                        상세보기
                      </button>
                      <button
                        onClick={() => handleEdit()}
                        className="text-green-600 hover:text-green-900 cursor-pointer"
                        disabled={deleteMutation.isPending}
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(bom.bomId)}
                        className="text-red-600 hover:text-red-900 cursor-pointer"
                        disabled={deleteMutation.isPending}
                      >
                        {deleteMutation.isPending ? '삭제 중...' : '삭제'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    등록된 BOM이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
