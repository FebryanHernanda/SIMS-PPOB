import { Image, Typography } from "../../atoms";

const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      <Image src="/assets/Logo.png" alt="logo" />
      <Typography variant="h4" className="text-gray-700">
        SIMS PPOB
      </Typography>
    </div>
  );
};

export default Logo;
