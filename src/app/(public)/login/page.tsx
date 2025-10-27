import LoginHeader from '@/app/(public)/login/components/LoginHeader';
import LoginForm from '@/app/(public)/login/components/LoginForm';
import LoginFooter from '@/app/(public)/login/components/LoginFooter';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 로고 및 제목 */}
        <LoginHeader />

        {/* 로그인 폼 */}
        <LoginForm />

        {/* 하단 정보 */}
        <LoginFooter />
      </div>
    </div>
  );
}
