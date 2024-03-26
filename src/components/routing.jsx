import { Routes, Route } from "react-router-dom";
import Login from "./auth/login";
import Signup from "./auth/signup";
import Home from "./pages/home";
import ProtectedRoutes from "./protected_routes";
import { useContext } from "react";
import { AccountContext } from "../contexts/user_context";
import { Text } from "@chakra-ui/react";

const Routing = () => {
  const { user } = useContext(AccountContext);

  return user.loggedIn === null ? (
    <main style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <Text>Loading...</Text>
    </main>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/create-account" element={<Signup />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Routing;
