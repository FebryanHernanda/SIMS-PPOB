import { useLocation, useNavigate } from "react-router-dom";
import { Button, Link, Typography } from "../../components/atoms";
import { Avatar } from "../../components/molecules";
import { ProfileForm } from "../../components/organisms";

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isEditMode = location.pathname === "/profile/edit";

  const handleSubmit = () => {
    navigate("/profile");
  };

  return (
    <section className="flex flex-col items-center justify-center gap-5 p-5 py-5 lg:p-0">
      <Avatar className="w-35" />
      <Typography variant="h1">Febryan Hernanda</Typography>
      <div className="w-full p-5 lg:px-20">
        <ProfileForm isEditProfile={isEditMode} onSubmit={handleSubmit} />
        {!isEditMode && (
          <div className="flex flex-col gap-5">
            <Button
              type="submit"
              variant="primary"
              onClick={() => navigate("/profile/edit")}
            >
              Edit Profile
            </Button>

            <Link href="/">
              <Button type="submit" variant="secondary" className="w-full">
                Logout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
