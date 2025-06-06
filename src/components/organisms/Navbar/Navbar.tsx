import { useLocation } from "react-router-dom";
import { Button, Link } from "../../atoms";
import { Logo } from "../../molecules";

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <nav className="p-3 border-gray-300 py-7 border-b-1">
      <div className="flex flex-row items-center justify-between">
        <Link href="/home">
          <Logo />
        </Link>

        <ul className="flex flex-row gap-5">
          <li>
            <Link href="/topup">
              <Button
                type="button"
                variant={pathname === "/topup" ? "navActive" : "navNotActive"}
              >
                Top Up
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/transaksi">
              <Button
                type="button"
                variant={
                  pathname.startsWith("/transaksi")
                    ? "navActive"
                    : "navNotActive"
                }
              >
                Transactions
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <Button
                type="button"
                variant={
                  pathname.startsWith("/profile") ? "navActive" : "navNotActive"
                }
              >
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
