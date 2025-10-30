import { useState } from 'react';
import Button from '@/app/components/common/Button';
import { ModalProps } from '@/app/components/common/modal/types';

interface PlannedOrder {
  id: string;
  referenceQuote: string;
  material: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  supplier: string;
  deliveryDate: string;
  status: 'PLANNED' | 'WAITING' | 'APPROVED' | 'REJECTED';
}

interface PurchaseRequestModalProps extends ModalProps {
  orders?: PlannedOrder[];
  onConfirm: () => void;
  editable?: boolean; // 수량 및 납기일 수정 가능 여부
}

// 목업 데이터
const MOCK_ORDERS: PlannedOrder[] = [
  {
    id: 'PO-001',
    referenceQuote: 'QT-2024-001',
    material: '스테인리스 강판 304',
    quantity: 500,
    unitPrice: 15000,
    totalPrice: 7500000,
    supplier: '(주)대한철강',
    deliveryDate: '2024-11-15',
    status: 'PLANNED',
  },
  {
    id: 'PO-002',
    referenceQuote: 'QT-2024-002',
    material: '알루미늄 프로파일',
    quantity: 1000,
    unitPrice: 8000,
    totalPrice: 8000000,
    supplier: '(주)한국알루미늄',
    deliveryDate: '2024-11-20',
    status: 'WAITING',
  },
  {
    id: 'PO-003',
    referenceQuote: 'QT-2024-003',
    material: '볼트 M8x30',
    quantity: 5000,
    unitPrice: 150,
    totalPrice: 750000,
    supplier: '(주)정밀기계부품',
    deliveryDate: '2024-11-10',
    status: 'PLANNED',
  },
  {
    id: 'PO-004',
    referenceQuote: 'QT-2024-004',
    material: '베어링 6205',
    quantity: 200,
    unitPrice: 12000,
    totalPrice: 2400000,
    supplier: '(주)글로벌베어링',
    deliveryDate: '2024-11-25',
    status: 'APPROVED',
  },
];

export default function MrpPurchaseRequestModal({
  orders = MOCK_ORDERS,
  onConfirm,
  onClose,
  editable = true,
}: PurchaseRequestModalProps) {
  const [editableOrders, setEditableOrders] = useState<PlannedOrder[]>(orders);
  const [memo, setMemo] = useState('');

  const totalAmount = editableOrders.reduce((sum, order) => sum + order.totalPrice, 0);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedOrders = [...editableOrders];
    const order = updatedOrders[index];
    updatedOrders[index] = {
      ...order,
      quantity: newQuantity,
      totalPrice: newQuantity * order.unitPrice,
    };
    setEditableOrders(updatedOrders);
  };

  const handleDeliveryDateChange = (index: number, newDate: string) => {
    const updatedOrders = [...editableOrders];
    updatedOrders[index] = {
      ...updatedOrders[index],
      deliveryDate: newDate,
    };
    setEditableOrders(updatedOrders);
  };

  const handleConfirm = () => {
    onConfirm(); // 부모 callback
    onClose(); // 모달 닫기
  };

  return (
    <div className="min-w-3xl">
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">구매 요청 요약</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-blue-600">선택된 주문:</span>
              <span className="ml-2 font-medium">{editableOrders.length}건</span>
            </div>
            <div>
              <span className="text-blue-600">총 예상 금액:</span>
              <span className="ml-2 font-medium">₩{totalAmount.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-blue-600">요청일:</span>
              <span className="ml-2 font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto overflow-y-auto max-h-[252px] rounded shadow-xs">
          <table className="min-w-full divide-y divide-gray-100 border-b border-gray-100">
            <thead className="sticky top-0 z-10 bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  참조 견적서
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  자재
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  수량
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  단가
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  총액
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  공급사
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  납기일
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {editableOrders.map((order, index) => (
                <tr key={order.id} className="hover:bg-gray-50 text-center">
                  <td className="px-4 py-3 text-sm font-medium text-blue-600">
                    {order.referenceQuote}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{order.material}</td>
                  <td className="px-4 py-3">
                    {editable ? (
                      <input
                        type="number"
                        value={order.quantity}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value) || 0;
                          handleQuantityChange(index, newQuantity);
                        }}
                      />
                    ) : (
                      order.quantity.toLocaleString()
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    ₩{order.unitPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    ₩{order.totalPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{order.supplier}</td>
                  <td className="px-4 py-3">
                    {editable ? (
                      <input
                        type="date"
                        value={order.deliveryDate}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                        onChange={(e) => handleDeliveryDateChange(index, e.target.value)}
                      />
                    ) : (
                      order.deliveryDate
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg py-2">
          <h5 className="pl-2 font-medium text-gray-900 mb-1">구매 요청 메모</h5>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
            rows={3}
            placeholder="구매 요청에 대한 추가 메모나 특별 요구사항을 입력하세요..."
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end pt-2 pb-6">
        <Button label="구매 요청 확정" onClick={handleConfirm} />
      </div>
    </div>
  );
}
