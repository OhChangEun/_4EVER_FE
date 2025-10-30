'use client';

import Button from '@/app/components/common/Button';
import IconButton from '@/app/components/common/IconButton';
import { ModalProps } from '@/app/components/common/modal/types';

interface BomInputFormModalProps extends ModalProps {
  editMode?: boolean;
}

export default function BomInputFormModal({ editMode = false }: BomInputFormModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between gap-3">
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">제품명</h4>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="휴대폰"
              required
            />
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">단위</h4>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="v1.0"
              required
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-semibold text-gray-900">구성품 리스트</h4>
            <IconButton type="button" label="추가" icon="ri-add-line" variant="outline" size="sm" />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    '제품 코드',
                    '타입',
                    '자재',
                    '공급사',
                    '품목명',
                    '단위',
                    '수량',
                    '공정 순서',
                    '작업',
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200"></tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <Button label={editMode ? '수정' : '생성'} />
        </div>
      </form>
    </div>
  );
}
