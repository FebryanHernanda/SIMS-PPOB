import { Image } from "../../atoms";

const Avatar = () => {
  return (
    <div className="border-2 border-gray-300 rounded-full w-fit">
      <Image
        src="/src/assets/Profile-Photo.png"
        alt="Avatar Image"
        className="w-23"
      />
    </div>
  );
};

export default Avatar;
