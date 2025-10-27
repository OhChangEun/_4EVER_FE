import { SupplierDetailResponse } from '@/app/(private)/purchase/types/SupplierType';

interface ReadSupplierProps {
  supplier: SupplierDetailResponse;
  onClose: () => void;
  onEdit: () => void;
}

export default function SupplierTableSection({ supplier, onClose, onEdit }: ReadSupplierProps) {
  const getStatusText = (status: string) => (status === 'active' ? '활성' : '비활성');
  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    return status === 'active'
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-red-100 text-red-800`;
  };

  const { supplierInfo, managerInfo } = supplier;
  return (
    <>
      {/* 기본 정보 */}
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">업체 ID</p>
              <p className="text-base font-medium text-gray-900">{supplierInfo.supplierCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">업체명</p>
              <p className="text-base font-medium text-gray-900">{supplierInfo.supplierName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">카테고리</p>
              <p className="text-base font-medium text-gray-900">{supplierInfo.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">상태</p>
              <span className={getStatusBadge(supplierInfo.supplierStatus)}>
                {getStatusText(supplierInfo.supplierStatus)}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">이메일</p>
              <p className="text-base font-medium text-gray-900">{supplierInfo.supplierEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">연락처</p>
              <p className="text-base font-medium text-gray-900">{supplierInfo.supplierPhone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">주소</p>
              <p className="text-base font-medium text-gray-900">
                {supplierInfo.supplierBaseAddress} {supplierInfo.supplierDetailAddress}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">배송기간</p>
              <p className="text-base font-medium text-gray-900">
                {supplierInfo.deliveryLeadTime}일
              </p>
            </div>
          </div>
        </div>

        {/* 담당자 정보 */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">담당자 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">담당자명</p>
              <p className="text-base font-medium text-gray-900">{managerInfo.managerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">담당자 전화번호</p>
              <p className="text-base font-medium text-gray-900">{managerInfo.managerPhone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">담당자 이메일</p>
              <p className="text-base font-medium text-gray-900 break-all">
                {managerInfo.managerEmail}
              </p>
            </div>
          </div>
        </div>

        {/* 자재 목록
        {supplier.materials && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">자재 목록</h4>
            <table className="w-full border border-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-3 py-2 text-left">제품명</th>
                  <th className="border px-3 py-2 text-left">단위</th>
                  <th className="border px-3 py-2 text-left">단가</th>
                </tr>
              </thead>
              <tbody>
                {supplier.materials.map((m) => (
                  <tr key={m.id} className="odd:bg-white even:bg-gray-50">
                    <td className="border px-3 py-2">{m.productName}</td>
                    <td className="border px-3 py-2">{m.unit}</td>
                    <td className="border px-3 py-2">{m.unitPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )} */}
      </div>

      {/* 버튼 */}
      <div className="flex gap-3 pt-6 border-t border-gray-200">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
        >
          닫기
        </button>
        <button
          onClick={onEdit}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
        >
          수정
        </button>
      </div>
    </>
  );
}
