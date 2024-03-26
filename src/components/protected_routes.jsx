import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AccountContext } from "../contexts/user_context";

const useAuth = () => {
  const { user } = useContext(AccountContext);

  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
