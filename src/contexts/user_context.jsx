import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const AccountContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: null });

  const navigate = useNavigate();

  useEffect(() => {
    const handleSessionUser = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/auth/signin`,
          {
            credentials: "include",
          }
        );

        if (!res || !res.ok || res.status >= 400) {
          setUser({ loggedIn: false });
          return;
        }

        const data = await res.json();

        setUser({ ...data });
        navigate("/home");
      } catch (error) {
        setUser({ loggedIn: false });
      }
    };

    handleSessionUser();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;

UserContext.propTypes = {
  children: PropTypes.node.isRequired,
};
