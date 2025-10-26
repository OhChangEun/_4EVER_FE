
'use client';

export default function WarehouseStats() {
  const stats = [
    {
      title: '총 창고 수',
      value: '5',
      unit: '개',
      change: '+1',
      changeType: 'increase',
      icon: 'ri-building-line',
      color: 'blue'
    },
    {
      title: '운영 중인 창고',
      value: '4',
      unit: '개',
      change: '0',
      changeType: 'neutral',
      icon: 'ri-checkbox-circle-line',
      color: 'green'
    },
    {
      title: '총 저장 용량',
      value: '2,900',
      unit: '㎡',
      change: '+300',
      changeType: 'increase',
      icon: 'ri-stack-line',
      color: 'purple'
    },
    {
      title: '평균 사용률',
      value: '67',
      unit: '%',
      change: '+5%',
      changeType: 'increase',
      icon: 'ri-pie-chart-line',
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color as keyof typeof colors];
  };

  const getChangeColor = (type: string) => {
    if (type === 'increase') return 'text-green-600';
    if (type === 'decrease') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <div className="flex items-baseline mt-2">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <span className="ml-1 text-sm text-gray-500">{stat.unit}</span>
              </div>
              {stat.change !== '0' && (
                <div className={`flex items-center mt-1 ${getChangeColor(stat.changeType)}`}>
                  <i className={`${stat.changeType === 'increase' ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} text-xs mr-1`}></i>
                  <span className="text-xs font-medium">{stat.change}</span>
                </div>
              )}
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(stat.color)}`}>
              <i className={`${stat.icon} text-xl`}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
