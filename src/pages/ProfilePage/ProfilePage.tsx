import { useLocation, useNavigate } from "react-router-dom";
import { Button, Typography } from "../../components/atoms";
import { Avatar } from "../../components/molecules";
import { ProfileForm } from "../../components/organisms";
import { useAppDispatch } from "../../hooks/hooks";
import { logout } from "../../redux/slices/AuthSlice";

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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

            <Button
              type="submit"
              variant="secondary"
              className="w-full"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
