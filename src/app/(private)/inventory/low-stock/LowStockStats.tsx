export default function LowStockStats() {
  const stats = [
    {
      title: '긴급 재고 부족',
      value: '8',
      change: '+2',
      changeType: 'increase',
      icon: 'ri-error-warning-line',
      color: 'red',
    },
    {
      title: '주의 재고 부족',
      value: '15',
      change: '+3',
      changeType: 'increase',
      icon: 'ri-alert-line',
      color: 'yellow',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      red: 'bg-red-50 text-red-600',
      yellow: 'bg-yellow-50 text-yellow-600',
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              <div className="flex items-center mt-2">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {stat.changeType === 'increase' ? '↗' : '↘'} {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">전월 대비</span>
              </div>
            </div>
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(stat.color)}`}
            >
              <i className={`${stat.icon} text-xl`}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
