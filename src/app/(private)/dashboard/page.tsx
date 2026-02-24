import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getDashboardStats, getWorkflowStatus } from '@/app/(private)/dashboard/dashboard.api';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  // 서버에서 데이터 prefetch (병렬 처리)
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['dashboardStats'],
      queryFn: getDashboardStats,
    }),
    queryClient.prefetchQuery({
      queryKey: ['workflowStatus'],
      queryFn: getWorkflowStatus,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClient />
    </HydrationBoundary>
  );
}
