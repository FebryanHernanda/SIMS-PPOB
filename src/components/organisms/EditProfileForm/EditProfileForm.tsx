import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../../atoms";
import { InputField } from "../../molecules";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  clearMessages,
  getProfile,
  updateProfile,
  type User,
} from "../../../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

type EditProfileFormProps = {
  onSubmit?: (data: User) => void;
};

const EditProfileForm = ({ onSubmit }: EditProfileFormProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.auth.user);
  const { successMessage, error } = useAppSelector((state) => state.auth);

  const { handleSubmit, control, reset } = useForm<User>({
    mode: "onChange",
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
    },
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      reset({
        email: profile.email || "",
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
      });
    }
  }, [profile, reset]);

  useEffect(() => {
    if (successMessage || error) {
      const timeout = setTimeout(() => {
        dispatch(clearMessages());
        navigate("/profile");
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage, error, dispatch, navigate]);

  const onSubmitHandler: SubmitHandler<User> = async (data) => {
    if (onSubmit) onSubmit(data);
    dispatch(updateProfile(data));
  };

  return (
    <>
      <div className="max-w-md mx-auto mb-5 text-center">
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

      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col justify-center max-w-sm gap-5 mx-auto lg:max-w-lg"
      >
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email wajib diisi",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Format email tidak valid",
            },
          }}
          render={({ field, fieldState }) => (
            <InputField
              {...field}
              label="Email"
              placeholder="Masukkan Email anda"
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="first_name"
          control={control}
          rules={{
            pattern: {
              value: /^[A-Za-z\s]+$/i,
              message: "Nama hanya boleh berisi huruf",
            },
          }}
          render={({ field, fieldState }) => (
            <InputField
              {...field}
              label="Nama Depan"
              placeholder="Masukkan Nama anda"
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="last_name"
          control={control}
          rules={{
            pattern: {
              value: /^[A-Za-z\s]+$/i,
              message: "Nama hanya boleh berisi huruf",
            },
          }}
          render={({ field, fieldState }) => (
            <InputField
              {...field}
              label="Nama Belakang"
              placeholder="Masukkan Nama Belakang anda"
              error={fieldState.error?.message}
            />
          )}
        />
        <Button type="submit" variant="primary">
          Simpan
        </Button>
      </form>
    </>
  );
};

export default EditProfileForm;
