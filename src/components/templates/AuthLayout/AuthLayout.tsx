import { Image, Typography } from "../../atoms";
import { Logo } from "../../molecules";

type AuthLayoutProps = {
  title: string;
  form: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, form }) => {
  return (
    <section className="flex items-center justify-center min-h-screen py-10 ">
      <div className="flex flex-col items-center justify-center w-fit rounded-2xl lg:flex-row sm:shadow-xl ">
        <div className="lg:w-[600px] order-1 p-5 lg:order-0 gap-2 flex flex-col items-center text-center">
          <Logo />
          <Typography variant="h1">{title}</Typography>

          {/* Form Field */}
          {form}
        </div>
        <div className="hidden sm:block h-80 w-full lg:w-[600px] lg:h-full ">
          <Image
            src="/assets/Illustrasi-Login.png"
            alt="Ilustrasi Login"
            className="object-cover w-full h-full rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
