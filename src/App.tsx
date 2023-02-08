import Footer from "./components/Footer";
import Header from "./components/Header";
import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import SingleResultPage from "./pages/SingleResultPage";
import Root from "./Root";
import { AuthFormContextProvider } from "./context/authFormContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "property", element: <SearchResults /> },
      { path: "property/:propertyId", element: <SingleResultPage /> },
    ],
  },
]);

function App() {
  return (
    <AuthFormContextProvider>
      <RouterProvider router={router} />
    </AuthFormContextProvider>
  );
}

export default App;
