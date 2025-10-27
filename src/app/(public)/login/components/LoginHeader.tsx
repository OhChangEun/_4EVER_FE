'use client';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
        <i className="ri-building-line text-2xl text-white"></i>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">ERP 시스템</h1>
      <p className="text-gray-600">계정에 로그인하세요</p>
    </div>
  );
};

export default LoginHeader;
