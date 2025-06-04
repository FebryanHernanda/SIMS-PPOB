import { Button, Link } from "../../atoms";
import { InputField } from "../../molecules";

const LoginForm = () => {
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
            label="Password"
            type="password"
            placeholder="Masukkan password"
            name="password"
          />
          <Button type="submit">Masuk</Button>
        </div>
      </form>
      <div className="mt-10">
        <Link href="/register">
          Belum punya akun?{" "}
          <span className="text-red-500">Daftar Sekarang</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
