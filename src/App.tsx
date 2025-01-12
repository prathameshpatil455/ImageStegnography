import "./App.css";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import Encryption from "./pages/Encryption";
import Decryption from "./pages/Decryption";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const Layout = ({ children }) => {
    return (
      <main className="flex flex-col gap-4 min-h-screen py-4 px-8 box-border">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Toaster />
        <Footer />
      </main>
    );
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout children={<Home />} />} />
        <Route
          path="/encryption"
          element={<Layout children={<Encryption />} />}
        />
        <Route
          path="/decryption"
          element={<Layout children={<Decryption />} />}
        />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
