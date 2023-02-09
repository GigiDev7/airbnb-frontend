import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import SingleResultPage from "./pages/SingleResultPage";
import Root from "./Root";
import { AuthFormContextProvider } from "./context/authFormContext";
import { AuthUserContextProvider } from "./context/authUserContext";
import { action as authAction } from "./components/AuthForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    action: authAction,
    children: [
      { index: true, element: <Home /> },
      { path: "property", element: <SearchResults /> },
      { path: "property/:propertyId", element: <SingleResultPage /> },
    ],
  },
]);

function App() {
  return (
    <AuthUserContextProvider>
      <AuthFormContextProvider>
        <RouterProvider router={router} />
      </AuthFormContextProvider>
    </AuthUserContextProvider>
  );
}

export default App;
