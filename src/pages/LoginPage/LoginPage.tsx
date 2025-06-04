import { LoginForm } from "../../components/organisms";
import { AuthLayout } from "../../components/templates";

const LoginPage = () => {
  return (
    <AuthLayout
      title="Masuk atau Buat Akun untuk Memulai"
      form={<LoginForm />}
    />
  );
};

export default LoginPage;
