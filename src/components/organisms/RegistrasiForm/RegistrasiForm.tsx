import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  clearAuthState,
  registerUser,
  type RegisterInput,
} from "../../../redux/slices/AuthSlice";
import { Button, Link } from "../../atoms";
import { InputField } from "../../molecules";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegistrasiForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = useForm<RegisterInput>({
    mode: "onChange",
  });
  const dispatch = useAppDispatch();
  const { loading, error, successMessage } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    return () => {
      dispatch(clearAuthState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate("/");
        dispatch(clearAuthState());
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate, dispatch]);

  const onSubmit = (data: RegisterInput) => {
    if (data.password !== data.confirmPassword) {
      alert("Password Tidak Sama");
      return;
    }
    const sendData: RegisterInput = {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password,
    };

    dispatch(registerUser(sendData));
  };

  return (
    <div className="w-full lg:p-5">
      <div className="mb-5">
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
            name="first_name"
            control={control}
            rules={{
              required: "Nama depan wajib diisi",
              pattern: {
                value: /^[A-Za-z\s]+$/i,
                message: "Nama hanya boleh berisi huruf",
              },
            }}
            render={({ field, fieldState }) => (
              <InputField
                label="Nama Depan"
                type="text"
                placeholder="Masukkan nama depan anda"
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="last_name"
            control={control}
            rules={{
              required: "Nama belakang wajib diisi",
              pattern: {
                value: /^[A-Za-z\s]+$/i,
                message: "Nama hanya boleh berisi huruf",
              },
            }}
            render={({ field, fieldState }) => (
              <InputField
                label="Nama Belakang"
                type="text"
                placeholder="Masukkan nama belakang anda"
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password wajib diisi",
              minLength: {
                value: 8,
                message: "Password minimal 8 karakter",
              },
            }}
            render={({ field, fieldState }) => (
              <InputField
                label="Password"
                type="password"
                placeholder="Masukkan password anda"
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Konfirmasi password wajib diisi",
              validate: (value) =>
                value === getValues("password") || "Password tidak sama",
            }}
            render={({ field, fieldState }) => (
              <InputField
                label="Konfirmasi Password"
                type="password"
                placeholder="Masukkan konfirmasi password anda"
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {loading ? "loading..." : "Daftar"}
          </Button>
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
