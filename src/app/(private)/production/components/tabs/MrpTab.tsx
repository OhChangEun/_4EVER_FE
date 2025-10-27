'use client';

import { MRP_TABS } from '@/app/(private)/production/constants';
import SubNavigation from '@/app/components/common/SubNavigation';

export default function MrpTab() {
  return (
    <>
      <div className="text-lg font-semibold text-gray-900">자재소요계획 (MRP)</div>
      <SubNavigation tabs={MRP_TABS} />
    </>
  );
}
