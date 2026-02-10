import RouteProviders from '../_RouteProviders';

export default function ProductionLayout({ children }: { children: React.ReactNode }) {
  return <RouteProviders>{children}</RouteProviders>;
}
