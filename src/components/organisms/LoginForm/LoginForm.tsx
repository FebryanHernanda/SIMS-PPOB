import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser, type LoginInput } from "../../../redux/slices/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { Button, Link } from "../../atoms";
import { InputField } from "../../molecules";

const LoginForm = () => {
  const { handleSubmit, control } = useForm<LoginInput>();
  const dispatch = useAppDispatch();
  const { loading, error, successMessage } = useAppSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const onSubmit = (data: LoginInput) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate("/home");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

  return (
    <div className="w-full lg:p-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <Controller
            name="email"
            control={control}
            rules={{
              required: "email wajib diisi",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Format email tidak valid",
              },
            }}
            render={({ field, fieldState }) => (
              <InputField
                label="Email"
                type="email"
                placeholder="Masukkan email"
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: "password wajib diisi",
            }}
            render={({ field, fieldState }) => (
              <InputField
                label="Password Anda"
                type="password"
                placeholder="Masukkan password anda"
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "login"}
          </Button>
        </div>
      </form>
      {successMessage && (
        <div className="text-green-600 font-semibold">{successMessage}</div>
      )}
      {error && <div className="text-red-600 mt-4">{error}</div>}
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
