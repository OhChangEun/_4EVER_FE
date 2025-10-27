import { BomDetailResponse } from '@/app/(private)/production/types/BomDetailApiType';
import { fetchBomDetail } from '../../api/production.api';
import { useQuery } from '@tanstack/react-query';

interface BomDetailModalProps {
  bomId: string;
  onClose: () => void;
}

export default function BomDetailModal({ bomId, onClose }: BomDetailModalProps) {
  const {
    data: bomDetail,
    isLoading,
    isError,
  } = useQuery<BomDetailResponse>({
    queryKey: ['bomDetail', bomId],
    queryFn: () => fetchBomDetail(bomId),
    enabled: !!bomId,
  });

  const renderLevelStructure = (levelStructure: BomDetailResponse['levelStructure']) => {
    return (
      <div className="space-y-4">
        {Object.entries(levelStructure).map(([level, items]) => (
          <div
            key={level}
            className="ml-4"
            style={{ marginLeft: `${parseInt(level.replace('Level ', '')) * 20}px` }}
          >
            <div className="text-sm font-medium text-gray-600 mb-2">{level}</div>
            {items.map((item) => (
              <div
                key={item.itemId}
                className="flex items-center space-x-2 p-2 bg-gray-50 rounded mb-1"
              >
                <i className="ri-arrow-right-s-line text-gray-400"></i>
                <span className="font-medium">{item.itemNumber}</span>
                <span>{item.itemName}</span>
                <span className="text-sm text-gray-500">
                  ({item.quantity} {item.uomName})
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; class: string }> = {
      ACTIVE: { label: '활성', class: 'bg-green-100 text-green-800' },
      INACTIVE: { label: '비활성', class: 'bg-gray-100 text-gray-800' },
      DRAFT: { label: '초안', class: 'bg-yellow-100 text-yellow-800' },
    };
    const config = statusConfig[status] || { label: status, class: 'bg-gray-100 text-gray-800' };
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.class}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">BOM 상세 정보</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="p-6 text-center py-12">
            <i className="ri-loader-4-line animate-spin text-3xl text-gray-400"></i>
            <p className="mt-3 text-gray-500">로딩 중...</p>
          </div>
        ) : isError || !bomDetail ? (
          <div className="p-6 text-center py-12">
            <i className="ri-error-warning-line text-3xl text-red-400"></i>
            <p className="mt-3 text-red-500">데이터를 불러오는데 실패했습니다.</p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* 제품 기본 정보 */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4">제품 기본 정보</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">제품명</label>
                  <p className="text-sm text-gray-900">{bomDetail.productName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">제품 코드</label>
                  <p className="text-sm text-gray-900">{bomDetail.productNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">BOM 번호</label>
                  <p className="text-sm text-gray-900">{bomDetail.bomNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">버전</label>
                  <p className="text-sm text-gray-900">{bomDetail.version}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">상태</label>
                  <div className="mt-1">{getStatusBadge(bomDetail.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">최종 수정일</label>
                  <p className="text-sm text-gray-900">{bomDetail.lastModifiedAt}</p>
                </div>
              </div>
            </div>

            {/* 구성품 리스트 */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4">구성품 리스트</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        품목 코드
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        품목명
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        수량
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        단위
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        레벨
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        공급사
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        공정
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bomDetail.components.map((comp) => (
                      <tr key={comp.itemId}>
                        <td className="px-4 py-2 text-sm text-gray-900">{comp.itemNumber}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{comp.itemName}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{comp.quantity}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{comp.uomName}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{comp.level}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          {comp.supplierCompanyName}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900">{comp.operationName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 레벨 구조 */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4">레벨 구조</h4>
              {renderLevelStructure(bomDetail.levelStructure)}
            </div>

            {/* 공정 라우팅 정보 */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4">공정 라우팅 정보</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        순서
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        공정 ID
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        공정명
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        가동시간(분)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bomDetail.routing.map((routing) => (
                      <tr key={routing.operationId}>
                        <td className="px-4 py-2 text-sm text-gray-900">{routing.sequence}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{routing.operationId}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{routing.operationName}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{routing.runTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
