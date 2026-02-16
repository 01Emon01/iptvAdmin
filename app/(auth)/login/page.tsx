import LoginBox from "@/components/admin/auth/LoginBox";

export default async function page() {
  return (
    <div className="auth-box">
      <div className="auth-box-title">
        <h2 className="text-3xl font-bold text-center">Welcome</h2>
        <p className="text-sm text-center text-gray-500">
          Please login to admin dashboard
        </p>
      </div>
      <LoginBox />
    </div>
  );
}
