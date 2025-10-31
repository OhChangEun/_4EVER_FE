import Providers from '@/app/providers';
import { getQueryClient } from '@/lib/queryClient';
import { dehydrate } from '@tanstack/react-query';
import StatSection from '@/app/components/common/StatSection';
import {
  fetchDepartmentsDropdown,
  fetchEmployeesList,
  fetchHrmStats,
  fetchPositionsList,
} from '@/app/(private)/hrm/api/hrm.api';
import { mapHrmStatsToCards } from '@/app/(private)/hrm/services/hrm.service';
import ErrorMessage from '@/app/components/common/ErrorMessage';
import { Suspense } from 'react';
import TabNavigation from '@/app/components/common/TabNavigation';
import { HRM_TABS } from '@/app/(private)/hrm/constants';

export default async function HrmPage() {
  const queryClient = getQueryClient();

  const initialParams = {
    department: undefined,
    position: undefined,
    page: 0,
    size: 10,
  };

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['employeesList', initialParams],
      queryFn: () => fetchEmployeesList(initialParams),
    }),

    // --- 드롭 다운 prefetch ---
    queryClient.prefetchQuery({
      queryKey: ['positionsList'],
      queryFn: fetchPositionsList,
    }),

    // 부서 드롭다운
    queryClient.prefetchQuery({
      queryKey: ['departmentsDropdown'],
      queryFn: fetchDepartmentsDropdown,
    }),
  ]);
  const dehydratedState = dehydrate(queryClient);

  const data = await fetchHrmStats();
  const hrmStatsData = data ? mapHrmStatsToCards(data ?? {}) : null;

  return (
    <Providers dehydratedState={dehydratedState}>
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {hrmStatsData ? (
            <StatSection
              title="인적자원관리"
              subTitle="직원 정보 및 인사 업무 관리 시스템"
              statsData={hrmStatsData}
            />
          ) : (
            <ErrorMessage message={'인적자원관리 통계 데이터를 불러오는데 실패했습니다.'} />
          )}

          {/* 직원관리 탭 / 급여관리 탭 / 근태관리 탭 / 교육관리 탭 */}
          <Suspense fallback={<div>Loading...</div>}>
            <TabNavigation tabs={HRM_TABS} />
          </Suspense>
        </main>
      </div>
    </Providers>
  );
}
