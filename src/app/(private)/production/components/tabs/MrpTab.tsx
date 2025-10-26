'use client';

import { MRP_TABS } from '@/app/(private)/production/constants';
import SubNavigation from '@/app/components/common/SubNavigation';

export default function MrpTab() {
  return (
    <div className="bg-white rounded-2xl p-6 space-y-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">자재소요계획 (MRP)</h3>
      </div>
      <SubNavigation tabs={MRP_TABS} paramName="subTab" />
    </div>
  );
}
