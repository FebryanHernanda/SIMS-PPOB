import { Image } from "../../atoms";
type AvatarProps = {
  className?: string;
};
const Avatar: React.FC<AvatarProps> = ({ className }) => {
  return (
    <div className="border-2 border-gray-300 rounded-full w-fit">
      <Image
        src="/assets/Profile-Photo.png"
        alt="Avatar Image"
        className={`${className} rounded-full`}
      />
    </div>
  );
};

export default Avatar;
