import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AgencyContext } from "../../context/AgencyContext";
import "./Navbar.css";

export default function Navbar() {
  const { userToken, user, logout } = useContext(AuthContext);
  const { state, setState, setPop } = useContext(AgencyContext);

  const onClickHandler = () => {
    setState({ ...state, selectedAgencyId: "" });
    setPop(false);
  };

  const logoutHandler = () => {
    logout();
    setState({ ...state, selectedAgencyId: "" });
    setPop(false);
  };

  return (
    <div className="links">
      {userToken && userToken.error !== "Unauthorized" && (
        <p>
          Welkom <span className="welcome">{user}</span>
        </p>
      )}

      {userToken ? (
        <>
          <NavLink
            to="/new-admin"
            className={(navData) => (navData.isActive ? "active" : "login")}
            onClick={onClickHandler}
          >
            Create new Admin
          </NavLink>
          <NavLink
            to="/add-agency"
            className={(navData) => (navData.isActive ? "active" : "login")}
            onClick={onClickHandler}
          >
            Add new Agency
          </NavLink>
          <NavLink
            to="/"
            className={(navData) => (navData.isActive ? "login" : "login")}
            onClick={logoutHandler}
          >
            Log out
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/login"
            className={(navData) => (navData.isActive ? "active" : "login")}
            // onClick={onClickHandler}
          >
            Log in
          </NavLink>
        </>
      )}
    </div>
  );
}
