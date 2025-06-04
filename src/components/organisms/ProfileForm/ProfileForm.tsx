import { Button } from "../../atoms";
import { InputField } from "../../molecules";

type ProfileFormProps = {
  isEditProfile: boolean;
  onSubmit?: () => void;
};

const ProfileForm = ({ isEditProfile, onSubmit }: ProfileFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <InputField label="Email" placeholder="Email" />
        <InputField label="Nama Depan" placeholder="Febryan" />
        <InputField label="Nama Belakang" placeholder="Hernanda" />
        <div className="flex flex-col gap-5">
          {isEditProfile && (
            <Button
              type="submit"
              variant="primary"
              onClick={() => console.log("Simpan Berhasil")}
            >
              Simpan
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
