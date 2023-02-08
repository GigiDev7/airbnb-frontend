import { useContext } from "react";
import { createPortal } from "react-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import AuthFormContext from "../context/authFormContext";

const AuthForm: React.FC<{ type: string }> = () => {
  const authFormContext = useContext(AuthFormContext);

  return createPortal(
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.3)] z-50"></div>
      <div className="rounded-md pt-4 pb-14 flex flex-col items-center z-50 w-1/2 lg:w-1/3 h-fit bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex relative w-full justify-center items-center border-b-2 pb-3 mb-5">
          <IoIosCloseCircleOutline
            onClick={authFormContext.hideAuthForm}
            className="text-4xl absolute left-2 cursor-pointer"
          />
          <h1 className="font-medium text-xl">{authFormContext.type}</h1>
        </div>
        <form className="flex flex-col w-[85%] gap-3">
          <input
            type="text"
            placeholder="Email adress"
            className="border-[1px] border-gray-500 rounded-md w-full py-3 pl-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="border-[1px] border-gray-500 rounded-md w-full py-3 pl-2"
          />
          {authFormContext.type === "Register" && (
            <>
              <input
                type="password"
                placeholder="Confirm password"
                className="border-[1px] border-gray-500 rounded-md w-full py-3 pl-2"
              />
              <input
                type="text"
                placeholder="Firstname"
                className="border-[1px] border-gray-500 rounded-md w-full py-3 pl-2"
              />
              <input
                type="text"
                placeholder="Lastname"
                className="border-[1px] border-gray-500 rounded-md w-full py-3 pl-2"
              />
            </>
          )}
          <button className="w-full bg-red-500 rounded-md py-3 text-white hover:bg-red-600">
            {authFormContext.type}
          </button>
        </form>
      </div>
    </>,
    document.getElementById("auth-modal") as Element
  );
};

export default AuthForm;
