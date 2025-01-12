import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation(); // Get the current path

  return (
    <nav className="flex items-center justify-center p-4">
      <Menubar className="py-6 bg-gray-600 text-white">
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Link
              to="/"
              className={`px-4 py-2 text-lg font-medium transition-all ${
                location.pathname === "/"
                  ? "bg-gray-300 text-black"
                  : "hover:bg-gray-300 hover:text-black"
              }`}
            >
              Home
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Link
              to="/encryption"
              className={`px-4 py-2 text-lg font-medium transition-all ${
                location.pathname === "/encryption"
                  ? "bg-gray-300 text-black"
                  : "hover:bg-gray-300 hover:text-black"
              }`}
            >
              Encode
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Link
              to="/decryption"
              className={`px-4 py-2 text-lg font-medium transition-all ${
                location.pathname === "/decryption"
                  ? "bg-gray-300 text-black"
                  : "hover:bg-gray-300 hover:text-black"
              }`}
            >
              Decode
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </nav>
  );
};

export default Navbar;
