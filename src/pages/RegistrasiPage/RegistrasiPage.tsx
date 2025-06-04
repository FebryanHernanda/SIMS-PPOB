import { RegistrasiForm } from "../../components/organisms";
import { AuthLayout } from "../../components/templates";

const RegistrasiPage = () => {
  return (
    <AuthLayout
      title="Lengkapi Data untuk Membuat Akun"
      form={<RegistrasiForm />}
    />
  );
};

export default RegistrasiPage;
