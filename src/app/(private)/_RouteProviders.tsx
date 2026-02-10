'use client';

import Providers from '@/app/providers';

export default function RouteProviders({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
