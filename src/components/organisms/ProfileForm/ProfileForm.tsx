import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../../atoms";
import { InputField } from "../../molecules";
import { useLocation } from "react-router-dom";

type ProfileFormProps = {
  isEditProfile?: boolean;
  onSubmit?: () => void;
};

const ProfileForm = ({ isEditProfile, onSubmit }: ProfileFormProps) => {
  const { handleSubmit, control } = useForm();

  const location = useLocation();
  const isEditPage = location.pathname === "/profile/edit";

  const onSubmitHandler: SubmitHandler<ProfileFormProps> = (data) => {
    if (onSubmit) {
      onSubmit();
    }
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
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
              {...field}
              label="Email"
              placeholder="Email"
              readOnly={!isEditPage}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              label="Nama Depan"
              placeholder="Febryan"
              readOnly={!isEditPage}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              label="Nama Belakang"
              placeholder="Hernanda"
              readOnly={!isEditPage}
            />
          )}
        />
        <div className="flex flex-col gap-5">
          {isEditProfile && (
            <Button type="submit" variant="primary">
              Simpan
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
