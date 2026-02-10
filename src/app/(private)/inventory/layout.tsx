import RouteProviders from '../_RouteProviders';

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  return <RouteProviders>{children}</RouteProviders>;
}
