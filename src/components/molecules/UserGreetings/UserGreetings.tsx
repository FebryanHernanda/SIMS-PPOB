import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { Typography } from "../../atoms";
import { Avatar } from "../Avatar";
import { getProfile } from "../../../redux/slices/AuthSlice";

const UserGreetings = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  if (!user) {
    return <Typography>Memuat profil...</Typography>;
  }

  return (
    <div className="flex flex-col items-center w-full gap-2 lg:w-fit lg:items-baseline lg:h-[200px] lg:justify-between">
      <Avatar className="w-23" />
      <div className="space-y-1">
        <Typography variant="h3" className="font-light!">
          Selamat Datang,
        </Typography>
        <Typography variant="h1">{`${user.first_name} ${user.last_name}`}</Typography>
      </div>
    </div>
  );
};

export default UserGreetings;
