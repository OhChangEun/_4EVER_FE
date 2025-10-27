// import { useState } from 'react';
// import { PlannedOrder } from '@/app/(private)/production/types/MrpType';
// import Button from '@/app/components/common/Button';

// interface PurchaseRequestModalProps {
//   orders: PlannedOrder[];
//   onClose: () => void;
//   onConfirm: (updatedOrders: PlannedOrder[]) => void;
// }

// export default function PurchaseRequestModal({
//   orders,
//   onClose,
//   onConfirm,
// }: PurchaseRequestModalProps) {
//   const [editableOrders, setEditableOrders] = useState<PlannedOrder[]>(orders);

//   const totalAmount = editableOrders.reduce((sum, order) => sum + order.totalPrice, 0);

//   const handleQuantityChange = (index: number, newQuantity: number) => {
//     const updatedOrders = [...editableOrders];
//     const order = updatedOrders[index];
//     updatedOrders[index] = {
//       ...order,
//       quantity: newQuantity,
//       totalPrice: newQuantity * order.unitPrice,
//     };
//     setEditableOrders(updatedOrders);
//   };

//   const handleDeliveryDateChange = (index: number, newDate: string) => {
//     const updatedOrders = [...editableOrders];
//     updatedOrders[index] = {
//       ...updatedOrders[index],
//       deliveryDate: newDate,
//     };
//     setEditableOrders(updatedOrders);
//   };

//   const getOrderStatusBadge = (status: PlannedOrder['status']) => {
//     const statusConfig = {
//       PLANNED: { label: '계획', class: 'bg-blue-100 text-blue-800' },
//       WAITING: { label: '대기', class: 'bg-yellow-100 text-yellow-800' },
//       APPROVED: { label: '승인', class: 'bg-green-100 text-green-800' },
//       REJECTED: { label: '반려', class: 'bg-red-100 text-red-800' },
//     };
//     const config = statusConfig[status];
//     return (
//       <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
//         {config.label}
//       </span>
//     );
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <h3 className="text-lg font-semibold text-gray-900">자재 구매 요청</h3>
//             <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
//               <i className="ri-close-line text-xl"></i>
//             </button>
//           </div>
//         </div>

//         <div className="p-6 overflow-y-auto max-h-[70vh]">
//           <div className="space-y-6">
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <h4 className="font-medium text-blue-900 mb-2">구매 요청 요약</h4>
//               <div className="grid grid-cols-3 gap-4 text-sm">
//                 <div>
//                   <span className="text-blue-600">선택된 주문:</span>
//                   <span className="ml-2 font-medium">{editableOrders.length}건</span>
//                 </div>
//                 <div>
//                   <span className="text-blue-600">총 예상 금액:</span>
//                   <span className="ml-2 font-medium">₩{totalAmount.toLocaleString()}</span>
//                 </div>
//                 <div>
//                   <span className="text-blue-600">요청일:</span>
//                   <span className="ml-2 font-medium">{new Date().toLocaleDateString()}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       참조 견적서
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       자재
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       수량
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       단가
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       총액
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       공급사
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       납기일
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       상태
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {editableOrders.map((order, index) => (
//                     <tr key={order.id} className="hover:bg-gray-50">
//                       <td className="px-4 py-3 text-sm font-medium text-blue-600">
//                         {order.referenceQuote}
//                       </td>
//                       <td className="px-4 py-3 text-sm text-gray-900">{order.material}</td>
//                       <td className="px-4 py-3">
//                         <input
//                           type="number"
//                           value={order.quantity}
//                           className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
//                           onChange={(e) => {
//                             const newQuantity = parseInt(e.target.value) || 0;
//                             handleQuantityChange(index, newQuantity);
//                           }}
//                         />
//                       </td>
//                       <td className="px-4 py-3 text-sm text-gray-900">
//                         ₩{order.unitPrice.toLocaleString()}
//                       </td>
//                       <td className="px-4 py-3 text-sm font-medium text-gray-900">
//                         ₩{order.totalPrice.toLocaleString()}
//                       </td>
//                       <td className="px-4 py-3 text-sm text-gray-900">{order.supplier}</td>
//                       <td className="px-4 py-3">
//                         <input
//                           type="date"
//                           value={order.deliveryDate}
//                           className="px-2 py-1 border border-gray-300 rounded text-sm"
//                           onChange={(e) => handleDeliveryDateChange(index, e.target.value)}
//                         />
//                       </td>
//                       <td className="px-4 py-3">{getOrderStatusBadge(order.status)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="bg-gray-50 p-4 rounded-lg">
//               <h5 className="font-medium text-gray-900 mb-3">구매 요청 메모</h5>
//               <textarea
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
//                 rows={3}
//                 placeholder="구매 요청에 대한 추가 메모나 특별 요구사항을 입력하세요..."
//               ></textarea>
//             </div>
//           </div>
//         </div>

//         <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
//           <Button label="취소" variant="whiteOutline" onClick={onClose} />
//           <Button label="구매 요청 확정" onClick={() => onConfirm(editableOrders)} />
//         </div>
//       </div>
//     </div>
//   );
// }
