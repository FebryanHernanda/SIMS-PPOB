import { Typography } from "../../atoms";
import { Avatar } from "../Avatar";

const UserGreetings = () => {
  return (
    <div className="flex flex-col items-center w-full gap-2 lg:w-fit lg:items-baseline lg:h-[200px] lg:justify-between">
      <Avatar />
      <div className="space-y-1">
        <Typography variant="h3" className="font-light!">
          Selamat Datang,
        </Typography>
        <Typography variant="h1">Febryan Hernanda</Typography>
      </div>
    </div>
  );
};

export default UserGreetings;
