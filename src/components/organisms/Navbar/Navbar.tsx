import { Button, Link } from "../../atoms";
import { Logo } from "../../molecules";

const Navbar = () => {
  return (
    <nav className="p-3 border-gray-300 py-7 border-b-1">
      <div className="flex flex-row items-center justify-between">
        <Logo />

        <ul className="flex flex-row gap-10">
          <li>
            <Link href="#">
              <Button type="button" variant="linkSecondary">
                Top Up
              </Button>
            </Link>
          </li>
          <li>
            <Link href="#">
              <Button type="button" variant="linkSecondary">
                Transactions
              </Button>
            </Link>
          </li>
          <li>
            <Link href="#">
              <Button type="button" variant="linkSecondary">
                Akun
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
