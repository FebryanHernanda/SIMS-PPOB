import { InputField } from "../../molecules";
import { useAppSelector } from "../../../hooks/hooks";

const ProfileForm = () => {
  const profile = useAppSelector((state) => state.auth.user);

  return (
    <div className="flex flex-col max-w-sm gap-5 mx-auto lg:max-w-lg">
      <InputField label="Email" value={profile?.email || ""} readOnly />
      <InputField
        label="Nama Depan"
        value={profile?.first_name || ""}
        readOnly
      />
      <InputField
        label="Nama Belakang"
        value={profile?.last_name || ""}
        readOnly
      />
    </div>
  );
};

export default ProfileForm;
