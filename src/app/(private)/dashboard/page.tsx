import QuickActions from '@/app/(private)/dashboard/components/QuickActions';
import WorkflowStatus from '@/app/(private)/dashboard/components/WorkflowStatus';
import StatSection from '@/app/components/common/StatSection';
import { getDashboardStats, getWorkflowStatus } from '@/app/(private)/dashboard/dashboard.api';
import { mapDashboardStatsToCards } from './dashboard.service';

export default async function DashboardPage() {
  const dashboardStats = await getDashboardStats();

  const workflowData = await getWorkflowStatus();
  const dashboardStatsData = mapDashboardStatsToCards(dashboardStats);

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <StatSection
          title="대시보드"
          subTitle="기업 자원 관리 현황"
          statsData={dashboardStatsData}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 mb-8">
          {/* 빠른 작업 */}
          <div className="lg:col-span-1">
            <QuickActions />
          </div>

          {/* 워크플로우 현황 */}
          <div className="lg:col-span-2">
            <WorkflowStatus $workflowData={workflowData} />
          </div>
        </div>
      </main>

      {/* 리포트 다운로드 */}
      {/* <ReportDownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        selectedPeriod={selectedPeriod}
      /> */}
    </div>
  );
}
