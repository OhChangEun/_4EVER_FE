import RouteProviders from '../_RouteProviders';

export default function LowStockLayout({ children }: { children: React.ReactNode }) {
  return <RouteProviders>{children}</RouteProviders>;
}
