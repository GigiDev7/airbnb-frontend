import React, { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import ProfileSideBar from "../components/ProfileSideBar";
import AuthUserContext from "../context/authUserContext";

const Profile = () => {
  const authUserContext = useContext(AuthUserContext);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      authUserContext.updateUser(JSON.parse(user));
    }
  }, []);

  return (
    <div className="mt-16 flex w-full gap-12">
      <ProfileSideBar />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
