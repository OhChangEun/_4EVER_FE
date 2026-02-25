import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href="/dashboard"
      className="pl-1 flex items-center gap-2.5 cursor-pointer select-none group"
    >
      {/* 워드마크 */}
      <div className="flex items-baseline gap-1 px-1">
        <span className="text-4xl font-black tracking-tight text-blue-500 italic">4</span>
        <span className="text-2xl font-black tracking-normal text-gray-800 italic">Ever</span>
      </div>
    </Link>
  );
}
