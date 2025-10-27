import type { Metadata } from 'next';
import { Geist, Geist_Mono, Pacifico } from 'next/font/google';
import '../styles/globals.css';
import Providers from '@/app/providers';

const geistSans = Geist({
  display: 'swap',
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  display: 'swap',
  variable: '--font-geist-mono',
});

const pacifico = Pacifico({
  weight: '400',
  display: 'swap',
  variable: '--font-pacifico',
});

export const metadata: Metadata = {
  title: 'EvErp',
  description: '기업 자원 관리 통합 시스템',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
