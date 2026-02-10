import RouteProviders from '../_RouteProviders';

export default function WarehouseLayout({ children }: { children: React.ReactNode }) {
  return <RouteProviders>{children}</RouteProviders>;
}
