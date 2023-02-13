import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AuthUserContext from "../context/authUserContext";
import { useLogout } from "../hooks/useLogout";

const ProfileSideBar = () => {
  const authUserContext = useContext(AuthUserContext);
  const { logout } = useLogout();

  return (
    <aside className="flex flex-col items-start gap-6 border-r-[1px] h-fit  border-black w-fit pr-8">
      <NavLink
        to=""
        end={true}
        className={({ isActive }) =>
          `${
            isActive && "bg-gray-300"
          } hover:bg-gray-300 py-3 pl-2 w-36 text-start rounded-md`
        }
      >
        Profile
      </NavLink>
      <NavLink
        to="properties"
        className={({ isActive }) =>
          `${
            isActive && "bg-gray-300"
          } hover:bg-gray-300 py-3 pl-2 w-36 text-start rounded-md`
        }
      >
        My properties
      </NavLink>
      <NavLink
        to="bookings"
        className={({ isActive }) =>
          `${
            isActive && "bg-gray-300"
          } hover:bg-gray-300 py-3 pl-2 w-36 text-start rounded-md`
        }
      >
        My bookings
      </NavLink>
      <Link
        to="/favourites"
        className="hover:bg-gray-300 py-3 pl-2 w-36 text-start rounded-md"
      >
        Favourites({authUserContext.user?.favourites.length})
      </Link>
      <button
        className="hover:bg-gray-300 py-3 pl-2 w-36 text-start rounded-md"
        onClick={logout}
      >
        Logout
      </button>
    </aside>
  );
};

export default ProfileSideBar;
