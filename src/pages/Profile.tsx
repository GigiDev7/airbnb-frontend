import React from "react";
import { Outlet } from "react-router-dom";
import ProfileSideBar from "../components/ProfileSideBar";

const Profile = () => {
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
