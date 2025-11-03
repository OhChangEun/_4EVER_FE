import Header from '@/app/components/header/Header';

export const dynamic = 'force-dynamic';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-gray-50">{children}</main>
    </>
  );
}
