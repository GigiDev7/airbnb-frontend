import { useContext, MouseEvent, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useFetcher, useActionData, json } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import AuthFormContext from "../context/authFormContext";
import axios from "axios";
import { BASE_URL } from "../config";
import { catchError } from "../utils/httpErrorHelper";
import AuthUserContext from "../context/authUserContext";
import { useLogout } from "../hooks/useLogout";

const AuthForm: React.FC = () => {
  const [wasRegistered, setWasRegistered] = useState(false);
  const authUserContext = useContext(AuthUserContext);
  const authFormContext = useContext(AuthFormContext);
  const fetcher = useFetcher();
  const { data } = fetcher;

  const { logout } = useLogout();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  if (wasRegistered) {
    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = "";
      passwordRef.current.value = "";
    }
  }

  useEffect(() => {
    let timer: number | undefined;
    if (data && !data.isError && authFormContext.type === "Register") {
      authFormContext.showAuthForm("Login");
      setWasRegistered(true);
      timer = setTimeout(() => {
        setWasRegistered(false);
      }, 1500);
    }
    if (data && !data.isError && authFormContext.type === "Login") {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      const expiresAt = Date.now() + 60 * 60 * 1000;
      localStorage.setItem("expiresAt", expiresAt.toString());
      authUserContext.updateUser(data.user);
      authFormContext.hideAuthForm();
      setTimeout(() => {
        logout();
      }, 60 * 60 * 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [data]);

  const hideForm = (e: MouseEvent) => {
    e.stopPropagation();
    authFormContext.hideAuthForm();
  };

  const switchFormType = (type: string, e: MouseEvent) => {
    authFormContext.showAuthForm(type, e);
  };

  return createPortal(
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.3)] z-50"></div>
      <div
        onClick={(e) => authFormContext.showAuthForm(authFormContext.type, e)}
        className="rounded-md pt-4 pb-14 flex flex-col items-center z-50 w-1/2 lg:w-1/3 h-fit bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {wasRegistered && (
          <p className="bg-green-500 text-white p-3 rounded-xl">
            Successfully registered!
          </p>
        )}
        <div className="flex relative w-full justify-center items-center border-b-2 pb-3 mb-5">
          <IoIosCloseCircleOutline
            onClick={(e) => hideForm(e)}
            className="text-4xl absolute left-2 cursor-pointer"
          />
          <h1 className="font-medium text-xl">{authFormContext.type}</h1>
        </div>
        {data && data.isError && data.message && (
          <h2 className="mt-2 mb-4 text-red-500">{data.message}</h2>
        )}
        <fetcher.Form
          method="post"
          action="/"
          className="flex flex-col w-[85%] gap-3"
        >
          <input
            ref={emailRef}
            type="text"
            name="email"
            placeholder="Email adress"
            className="border-[1px] border-gray-500 rounded-md w-full py-3 pl-2"
          />
          <input
            ref={passwordRef}
            name="password"
            type="password"
            placeholder="Password"
            className="border-[1px] border-gray-500 rounded-md w-full py-3 pl-2"
          />
          {authFormContext.type === "Register" && (
            <>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                className="border-[1px] border-gray-500 rounded-md w-full py-3 pl-2"
              />
              <input
                name="firstname"
                type="text"
                placeholder="Firstname"
                className="border-[1px] border-gray-500 rounded-md w-full py-3 pl-2"
              />
              <input
                name="lastname"
                type="text"
                placeholder="Lastname"
                className="border-[1px] border-gray-500 rounded-md w-full py-3 pl-2"
              />
            </>
          )}
          <button
            disabled={fetcher.state === "submitting"}
            type="submit"
            className="w-full bg-red-500 rounded-md py-3 text-white hover:bg-red-600"
          >
            {fetcher.state === "submitting"
              ? "Submitting..."
              : authFormContext.type}
          </button>
        </fetcher.Form>
        <p className="mt-3">
          {authFormContext.type === "Login" ? (
            <button>
              Don't have an account?
              <span
                onClick={(e) => switchFormType("Register", e)}
                className="font-semibold"
              >
                Register
              </span>
            </button>
          ) : (
            <button>
              Already have an account?
              <span
                onClick={(e) => switchFormType("Login", e)}
                className="font-semibold"
              >
                Login
              </span>
            </button>
          )}
        </p>
      </div>
    </>,
    document.getElementById("auth-modal") as Element
  );
};

export async function action({ request }: { request: any }) {
  const formData: FormData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");
  const fields = [...formData.keys()];

  if (!email || !password) {
    return { isError: true, message: "Please fill all fields" };
  }

  if (fields.length == 2) {
    try {
      const { data } = await axios.post(`${BASE_URL}/user/login`, {
        email,
        password,
      });
      return { isError: false, user: data.user, token: data.token };
    } catch (err: any) {
      return catchError(err);
    }
  } else {
    if (!firstname || !lastname || !confirmPassword) {
      return { isError: true, message: "Please fill all fields" };
    }
    if (confirmPassword !== password) {
      return { isError: true, message: "Passwords do not match" };
    }

    try {
      await axios.post(`${BASE_URL}/user/register`, {
        email,
        password,
        firstname,
        lastname,
      });
      return { isError: false };
    } catch (err) {
      return catchError(err);
    }
  }
}

export default AuthForm;
