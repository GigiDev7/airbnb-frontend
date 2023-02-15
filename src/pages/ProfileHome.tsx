import React, { useContext, useState, ChangeEvent, useEffect } from "react";
import { BASE_URL } from "../config";
import AuthUserContext from "../context/authUserContext";
import { AiFillEdit } from "react-icons/ai";
import { MdCancel } from "react-icons/md";

const ProfileHome = () => {
  const userContext = useContext(AuthUserContext);
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState<null | File>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    if (userContext.user?.email) {
      setEmail(userContext.user?.email);
    }
  }, [userContext.user]);

  const onCancelImageUpload = () => {
    setImagePreview("");
    setImageFile(null);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "email" | "password" | "confirmPassword" | "file"
  ) => {
    if (type === "email") {
      setEmail(e.target.value);
    } else if (type === "password") {
      setPassword(e.target.value);
    } else if (type === "confirmPassword") {
      setPasswordConfirm(e.target.value);
    } else {
      if (e.target.files) {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
          setImageFile(selectedImage);
          const reader = new FileReader();
          reader.onload = (e) => {
            setImagePreview((e.target as any).result as any);
          };
          reader.readAsDataURL(selectedImage);
        }
      }
    }
  };

  return (
    <div className="flex w-1/2 justify-between">
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            className="w-40 h-40 border-2 rounded-full"
            src={
              imagePreview
                ? imagePreview
                : `${BASE_URL}/${userContext.user?.image}`
            }
          />
          {imagePreview && (
            <MdCancel
              onClick={onCancelImageUpload}
              className="absolute -left-3 text-red-600 top-3 text-2xl cursor-pointer"
            />
          )}
          <div className="absolute right-3 top-3">
            <label htmlFor="profileImage">
              <AiFillEdit className="text-2xl cursor-pointer" />
            </label>
            <input
              onChange={(e) => handleInputChange(e, "file")}
              className="hidden"
              id="profileImage"
              type="file"
            />
          </div>
        </div>
        <h2 className="font-semibold text-xl mt-3">
          {userContext.user?.firstname} {userContext.user?.lastname}
        </h2>

        <button
          disabled={
            !imageFile &&
            (!password || !passwordConfirm) &&
            email == userContext.user?.email
          }
          className="mt-20 hover:bg-blue-600 disabled:opacity-70 disabled:bg-blue-500 bg-blue-500 py-2 px-5 rounded-lg text-white"
        >
          Save changes
        </button>
      </div>
      <div>
        <div className="mt-8 flex flex-col gap-2">
          <label className="font-semibold" htmlFor="email">
            Email:
          </label>
          <input
            onChange={(e) => handleInputChange(e, "email")}
            id="email"
            name="email"
            className="border-[1px] border-black  py-2 pl-2 w-full rounded-md"
            placeholder="Enter your email"
            value={email}
          />
        </div>
        <div className="mt-8 flex flex-col gap-2">
          <label className="font-semibold" htmlFor="password">
            New password:
          </label>
          <input
            onChange={(e) => handleInputChange(e, "password")}
            id="password"
            name="password"
            className="border-[1px] border-black  py-2 pl-2 w-full rounded-md"
            placeholder="Enter new password"
            value={password}
          />
        </div>
        <div className="mt-8 flex flex-col gap-2">
          <label className="font-semibold" htmlFor="confirmPassword">
            Confirm password:
          </label>
          <input
            onChange={(e) => handleInputChange(e, "confirmPassword")}
            id="confirmPassword"
            name="confirmPassword"
            className="border-[1px] border-black  py-2 pl-2 w-full rounded-md"
            placeholder="Confirm new password"
            value={passwordConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileHome;
