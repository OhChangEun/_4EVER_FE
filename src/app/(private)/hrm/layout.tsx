import RouteProviders from '../_RouteProviders';

export default function HrmLayout({ children }: { children: React.ReactNode }) {
  return <RouteProviders>{children}</RouteProviders>;
}
