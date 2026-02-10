import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, // 리액트 스트릭트 모드 (개발 시 문제 탐지)
  compiler: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
  // Turbopack 설정 (빈 객체로 에러 회피)
  turbopack: {},
};

export default nextConfig;
