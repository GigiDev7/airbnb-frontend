import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import SingleResultPage from "./pages/SingleResultPage";
import Root from "./Root";
import { AuthFormContextProvider } from "./context/authFormContext";
import { AuthUserContextProvider } from "./context/authUserContext";
import { action as authAction } from "./components/AuthForm";
import { action as searchAction } from "./components/HeaderSearch";
import { loader as propertiesLoader } from "./pages/SearchResults";
import { loader as propertyLoader } from "./pages/SingleResultPage";
import ErrorPage from "./components/ErrorPage";
import Favourites from "./pages/Favourites";
import { loader as favouritesLoader } from "./pages/Favourites";
import ProtectRoute from "./ProtectRoute";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import { useLogout } from "./hooks/useLogout";
import ProfileHome from "./pages/ProfileHome";
import ProfileProperties from "./pages/ProfileProperties";
import ProfileBookings from "./pages/ProfileBookings";
import { loader as profilePropertiesLoader } from "./pages/ProfileProperties";
import ProfilePropertyEdit from "./pages/ProfilePropertyEdit";
import { loader as profileBookingsLoader } from "./pages/ProfileBookings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    action: authAction,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "property",
        element: <SearchResults />,
        loader: propertiesLoader,
        action: searchAction,
      },
      {
        path: "property/:propertyId",
        loader: propertyLoader,
        element: <SingleResultPage />,
      },
      {
        path: "favourites",
        element: (
          <ProtectRoute>
            <Favourites />
          </ProtectRoute>
        ),
        loader: favouritesLoader,
      },
    ],
  },
  {
    path: "/profile",
    errorElement: <ErrorPage />,
    element: (
      <ProtectRoute>
        <Profile />
      </ProtectRoute>
    ),
    children: [
      { index: true, element: <ProfileHome /> },
      {
        path: "properties",
        element: <ProfileProperties />,
        loader: profilePropertiesLoader,
      },
      {
        path: "bookings",
        element: <ProfileBookings />,
        loader: profileBookingsLoader,
      },
      { path: "property/:propertyId", element: <ProfilePropertyEdit /> },
    ],
  },
]);

function App() {
  const { logout } = useLogout();

  useEffect(() => {
    const expiresAt = localStorage.getItem("expiresAt");
    if (expiresAt) {
      const remainingTime = +expiresAt - Date.now();
      if (remainingTime < 0) {
        logout();
      } else {
        setTimeout(() => {
          logout();
        }, remainingTime);
      }
    }
  }, []);

  return (
    <AuthUserContextProvider>
      <AuthFormContextProvider>
        <RouterProvider router={router} />
      </AuthFormContextProvider>
    </AuthUserContextProvider>
  );
}

export default App;
