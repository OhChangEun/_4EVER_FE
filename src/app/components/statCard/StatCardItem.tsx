import React from 'react';
import { StatCardType } from '@/app/types/StatType';

interface StatCardProps {
  stat: StatCardType;
  currentPeriodLabel: string;
}

/** 제목 해시 기반으로 안정적인 스파크라인 데이터 생성 */
function getSparklinePoints(title: string, changeType: 'increase' | 'decrease'): number[] {
  let h = 5381;
  for (let i = 0; i < title.length; i++) {
    h = (((h << 5) + h) ^ title.charCodeAt(i)) & 0xffff;
  }
  const pts: number[] = [];
  let cur = 35 + (h % 30);
  for (let i = 0; i < 8; i++) {
    const noise = ((h >> (i * 2)) & 0x7) - 3;
    cur = Math.max(8, Math.min(92, cur + noise));
    pts.push(cur);
  }
  const mid = pts.slice(0, -1).reduce((a, b) => a + b, 0) / (pts.length - 1);
  pts[pts.length - 1] =
    changeType === 'increase'
      ? Math.max(pts[pts.length - 1], Math.min(92, mid + 10))
      : Math.min(pts[pts.length - 1], Math.max(8, mid - 10));
  return pts;
}

function Sparkline({
  points,
  changeType,
}: {
  points: number[];
  changeType: 'increase' | 'decrease';
}) {
  const W = 88;
  const H = 40;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * W;
    const y = H - ((p - min) / range) * (H - 4) - 2;
    return [x, y] as [number, number];
  });

  const polyPoints = coords.map(([x, y]) => `${x},${y}`).join(' ');
  const lastX = coords[coords.length - 1][0];
  const lastY = coords[coords.length - 1][1];

  // 면적용 path (gradient fill)
  const areaPath = [
    `M ${coords[0][0]},${H}`,
    ...coords.map(([x, y]) => `L ${x},${y}`),
    `L ${coords[coords.length - 1][0]},${H}`,
    'Z',
  ].join(' ');

  const color = changeType === 'increase' ? '#2f9e73' : '#c93c3c';
  const fillId = `fill-${changeType}-${points[0]}`;

  return (
    <svg width={W} height={H} className="overflow-visible">
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.18} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      {/* 면적 fill */}
      <path d={areaPath} fill={`url(#${fillId})`} />
      {/* 라인 */}
      <polyline
        points={polyPoints}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 마지막 점 */}
      <circle cx={lastX} cy={lastY} r="2.5" fill={color} />
    </svg>
  );
}

export default function StatCardItem({ stat, currentPeriodLabel }: StatCardProps) {
  const sparkPoints = getSparklinePoints(stat.title, stat.changeType);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-[0_1px_4px_0_rgba(0,0,0,0.04)] p-5">
      <div className="flex items-start justify-between gap-3">
        {/* 좌측: 수치 영역 */}
        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-xs font-medium text-gray-500 truncate">{stat.title}</p>
          <p className="text-2xl font-bold text-gray-900 leading-tight mt-1">{stat.value}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={`text-xs font-semibold ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {stat.changeType === 'increase' ? '▲' : '▼'} {stat.change}
            </span>
            <span className="text-xs text-gray-400">{currentPeriodLabel}</span>
          </div>
        </div>

        {/* 우측: 스파크라인 그래프 */}
        <div className="shrink-0 pt-1">
          <Sparkline points={sparkPoints} changeType={stat.changeType} />
        </div>
      </div>
    </div>
  );
}
