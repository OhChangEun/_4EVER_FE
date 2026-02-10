import RouteProviders from '../_RouteProviders';

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  return <RouteProviders>{children}</RouteProviders>;
}
