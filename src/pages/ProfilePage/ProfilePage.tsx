import { useLocation, useNavigate } from "react-router-dom";
import { Button, Typography } from "../../components/atoms";
import { Avatar } from "../../components/molecules";
import { EditProfileForm, ProfileForm } from "../../components/organisms";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect } from "react";
import { getProfile, logout } from "../../redux/slices/AuthSlice";

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditPage = location.pathname === "/profile/edit";
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const goToEditProfile = () => {
    navigate("/profile/edit");
  };

  const goBackToProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <section className="flex flex-col items-center justify-center gap-5 max-w-screen lg:p-0">
      <Avatar className="w-35" />
      <Typography variant="h1">
        {profile
          ? `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim()
          : "Nama tidak tersedia"}
      </Typography>
      <div className="p-5 w-3xl">
        {isEditPage ? (
          <>
            <EditProfileForm />
            <div className="flex flex-col justify-center max-w-sm gap-5 mx-auto mt-4 text-center md:max-w-lg">
              <Button variant="secondary" onClick={goBackToProfile}>
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <ProfileForm />
        )}
        {!isEditPage && (
          <div className="flex flex-col max-w-sm gap-5 mx-auto mt-4 text-center lg:max-w-lg">
            <Button variant="primary" onClick={goToEditProfile}>
              Edit Profile
            </Button>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
