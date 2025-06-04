import { Button, Link } from "../../atoms";
import { InputField } from "../../molecules";

const RegistrasiForm = () => {
  return (
    <div className="w-full lg:p-5">
      <form>
        <div className="flex flex-col gap-5">
          <InputField
            label="Email"
            type="email"
            placeholder="Masukkan email"
            name="email"
          />
          <InputField
            label="Nama Depan"
            type="text"
            placeholder="Masukkan Nama Depan Anda"
            name="NamaDepan"
          />
          <InputField
            label="Nama Belakang"
            type="text"
            placeholder="Masukkan Nama Belakang Anda"
            name="NamaBelakang"
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Masukkan Password Anda"
            name="password"
          />
          <InputField
            label="Konfirmasi Password"
            type="password"
            placeholder="Masukkan Konfirmasi Password Anda"
            name="password"
          />
          <Button type="submit">Registrasi</Button>
        </div>
      </form>
      <div className="mt-10">
        <Link href="/">
          Sudah punya akun? Login <span className="text-red-500">disini</span>
        </Link>
      </div>
    </div>
  );
};

export default RegistrasiForm;
