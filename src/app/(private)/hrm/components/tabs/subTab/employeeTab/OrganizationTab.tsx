export default function OrganizationTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">부서별 조직 구조</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div key={dept.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{dept.name}</h4>
              <button
                onClick={() => handleViewDepartment(dept)}
                className="text-blue-600 hover:text-blue-900 cursor-pointer"
                title="부서 상세보기"
              >
                <i className="ri-eye-line"></i>
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">인원 수</span>
                <span className="text-sm font-medium text-gray-900">{dept.headCount}명</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">부서장</span>
                <span className="text-sm font-medium text-gray-900">{dept.manager}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
