'use client';

export default function BomStats() {
  const stats = [
    {
      title: '생산중인 품목',
      value: '12',
      change: '+2',
      changeType: 'increase' as const,
      icon: 'ri-play-circle-line',
    },
    {
      title: '이번 달에 생산이 들어간 개수',
      value: '156',
      change: '+23',
      changeType: 'increase' as const,
      icon: 'ri-shopping-cart-line',
    },
    {
      title: '완료된 생산',
      value: '89',
      change: '+12',
      changeType: 'increase' as const,
      icon: 'ri-checkbox-circle-line',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-lg">
              <i className={`${stat.icon} text-xl text-blue-600`}></i>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span
              className={`text-sm font-medium ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stat.change}
            </span>
            <span className="text-sm text-gray-500 ml-2">전월 대비</span>
          </div>
        </div>
      ))}
    </div>
  );
}
