import RouteProviders from '../_RouteProviders';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <RouteProviders>{children}</RouteProviders>;
}
