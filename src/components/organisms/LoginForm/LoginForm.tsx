import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  clearMessages,
  loginUser,
  type LoginInput,
} from "../../../redux/slices/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { Button, Link } from "../../atoms";
import { InputField } from "../../molecules";

const LoginForm = () => {
  const { handleSubmit, control } = useForm<LoginInput>({
    mode: "onChange",
  });
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
        dispatch(clearMessages());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate, dispatch]);

  return (
    <div className="w-full lg:p-5">
      <div className="mb-10">
        {successMessage && (
          <div className="p-2 mx-auto font-bold text-gray-600 bg-green-200 rounded-sm text-md ">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="p-2 mx-auto font-bold text-gray-600 bg-red-200 rounded-sm text-md ">
            {error}
          </div>
        )}
      </div>

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
            {loading ? "Loading..." : "Login"}
          </Button>
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
