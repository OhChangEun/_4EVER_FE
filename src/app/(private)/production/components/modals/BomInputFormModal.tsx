// 'use client';

// import { useState } from 'react';
// import { BomItem, ComponentRow, ComponentType } from '@/app/(private)/production/types/BomType';
// import Button from '@/app/components/common/Button';
// import IconButton from '@/app/components/common/IconButton';
// import { KeyValueItem } from '@/app/types/CommonType';
// import DropdownInputListModal from '@/app/components/common/DropdownInputListModal';

// interface BomInputFormModalProps {
//   editingBom: BomItem | null;
//   onClose: () => void;
//   onSubmit: (data: Partial<BomItem>) => void;
// }

// export default function BomInputFormModal({
//   editingBom,
//   onClose,
//   onSubmit,
// }: BomInputFormModalProps) {
//   const [product, setProduct] = useState(editingBom?.productName || '');
//   const [unit, setUnit] = useState(editingBom?.version || '');
//   const [data, setData] = useState<KeyValueItem<string>[]>([]);

//   const [componentRows, setComponentRows] = useState<ComponentRow[]>(
//     editingBom?.components || [
//       {
//         id: '1',
//         code: '',
//         type: '',
//         name: '',
//         quantity: 1,
//         unit: '',
//         level: 1,
//         material: '',
//         supplier: '',
//       },
//     ],
//   );

//   // ✅ 제품 코드별 기본 정보 매핑
//   const productInfoMap: Record<
//     string,
//     { type: ComponentType; material: string; supplier: string; name: string; unit: string }
//   > = {
//     'MAT-001': {
//       type: '부품',
//       material: '스틸',
//       supplier: '공급사A',
//       name: '모터 하우징',
//       unit: 'EA',
//     },
//     'MAT-002': {
//       type: '원자재',
//       material: '알루미늄',
//       supplier: '공급사B',
//       name: '프레임',
//       unit: 'KG',
//     },
//     'MAT-003': {
//       type: '부품',
//       material: '플라스틱',
//       supplier: '공급사C',
//       name: '커버',
//       unit: 'EA',
//     },
//   };

//   const addComponentRow = () => {
//     const newRow: ComponentRow = {
//       id: Date.now().toString(),
//       code: '',
//       type: '',
//       name: '',
//       quantity: 1,
//       unit: '',
//       level: 1,
//       material: '',
//       supplier: '',
//       process: '',
//     };
//     setComponentRows([...componentRows, newRow]);
//   };

//   const removeComponentRow = (id: string) => {
//     if (componentRows.length > 1) {
//       setComponentRows(componentRows.filter((row) => row.id !== id));
//     }
//   };

//   const updateComponentRow = <K extends keyof ComponentRow>(
//     id: string,
//     field: K,
//     value: ComponentRow[K],
//   ) => {
//     setComponentRows((prev) =>
//       prev.map((row) => {
//         if (row.id === id) {
//           const updated = { ...row, [field]: value };

//           // 제품 코드 선택 시 자동 채움
//           if (field === 'code') {
//             const info = productInfoMap[value as string];
//             if (info) {
//               updated.type = info.type;
//               updated.material = info.material;
//               updated.supplier = info.supplier;
//               updated.name = info.name;
//               updated.unit = info.unit;
//             }
//           }

//           return updated;
//         }
//         return row;
//       }),
//     );
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit({
//       unit,
//       components: componentRows,
//     });
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg max-w-7xl w-full mx-4 max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-gray-200 flex justify-between items-center">
//           <h3 className="text-lg font-semibold text-gray-900">
//             {editingBom ? 'BOM 수정' : 'BOM 생성'}
//           </h3>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <i className="ri-close-line text-xl"></i>
//           </button>
//         </div>

//         <div className="p-6">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="flex justify-between gap-3">
//               <div>
//                 <h4 className="text-md font-semibold text-gray-900 mb-4">제품명</h4>
//                 <input
//                   type="text"
//                   value={product}
//                   onChange={(e) => setProduct(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//                   placeholder="휴대폰"
//                   required
//                 />
//               </div>

//               <div>
//                 <h4 className="text-md font-semibold text-gray-900 mb-4">단위</h4>
//                 <input
//                   type="text"
//                   value={unit}
//                   onChange={(e) => setUnit(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//                   placeholder="v1.0"
//                   required
//                 />
//               </div>
//             </div>
//             {/* ✅ 구성품 리스트 */}
//             <div>
//               <div className="flex justify-between items-center mb-4">
//                 <h4 className="text-md font-semibold text-gray-900">구성품 리스트</h4>
//                 <IconButton
//                   type="button"
//                   label="추가"
//                   icon="ri-add-line"
//                   variant="outline"
//                   size="sm"
//                   onClick={addComponentRow}
//                 />
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       {[
//                         '제품 코드',
//                         '타입',
//                         '자재',
//                         '공급사',
//                         '품목명',
//                         '단위',
//                         '수량',
//                         '공정 순서',
//                         '작업',
//                       ].map((h) => (
//                         <th
//                           key={h}
//                           className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
//                         >
//                           {h}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {componentRows.map((row) => (
//                       <tr key={row.id}>
//                         {/* 제품 코드 */}
//                         <td className="px-3 py-2">
//                           <select
//                             value={row.code}
//                             onChange={(e) => updateComponentRow(row.id, 'code', e.target.value)}
//                             className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
//                           >
//                             <option value="">선택</option>
//                             {Object.keys(productInfoMap).map((code) => (
//                               <option key={code} value={code}>
//                                 {code}
//                               </option>
//                             ))}
//                           </select>
//                         </td>

//                         {/* 자동 채워지는 필드들 */}
//                         <td className="px-3 py-2">
//                           <input
//                             type="text"
//                             value={row.type}
//                             disabled
//                             className="w-full bg-gray-100 text-sm rounded px-2 py-1"
//                           />
//                         </td>
//                         <td className="px-3 py-2">
//                           <input
//                             type="text"
//                             value={row.material}
//                             disabled
//                             className="w-full bg-gray-100 text-sm rounded px-2 py-1"
//                           />
//                         </td>
//                         <td className="px-3 py-2">
//                           <input
//                             type="text"
//                             value={row.supplier}
//                             disabled
//                             className="w-full bg-gray-100 text-sm rounded px-2 py-1"
//                           />
//                         </td>
//                         <td className="px-3 py-2">
//                           <input
//                             type="text"
//                             value={row.name}
//                             disabled
//                             className="w-full bg-gray-100 text-sm rounded px-2 py-1"
//                           />
//                         </td>
//                         <td className="px-3 py-2">
//                           <input
//                             type="text"
//                             value={row.unit}
//                             disabled
//                             className="w-full bg-gray-100 text-sm rounded px-2 py-1"
//                           />
//                         </td>

//                         {/* 사용자가 직접 입력 */}
//                         <td className="px-3 py-2">
//                           <input
//                             type="number"
//                             value={row.quantity}
//                             min={1}
//                             onChange={(e) =>
//                               updateComponentRow(row.id, 'quantity', parseInt(e.target.value) || 1)
//                             }
//                             className="w-full border rounded text-sm px-2 py-1"
//                           />
//                         </td>

//                         <td className="px-3 py-2">
//                           <DropdownInputListModal
//                             initialItems={data}
//                             onSubmit={(updated) => setData(updated)}
//                           />
//                         </td>

//                         {/* 삭제 버튼 */}
//                         <td className="px-3 py-2">
//                           <button
//                             type="button"
//                             onClick={() => removeComponentRow(row.id)}
//                             className="text-red-600 hover:text-red-800 disabled:text-gray-400"
//                             disabled={componentRows.length === 1}
//                           >
//                             <i className="ri-delete-bin-line"></i>
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <div className="flex justify-end space-x-3 pt-4">
//               <Button label={editingBom ? '수정' : '생성'} />
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
