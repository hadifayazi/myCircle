import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import Home from "./pages/Home";
import Profile from "./features/user/Profile";
import AuthRequiredRoutes from "./features/auth/AuthRequiredRoutes";
import Feeds from "./features/user/Feeds";
import Layout from "./components/Layout";
import Search from "./components/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <AuthRequiredRoutes />,
        children: [
          { path: "feeds", element: <Feeds /> },
          {
            path: "profile",
            element: <Profile />,
            children: [{ path: "user/:username", element: <Profile /> }],
          },
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "search",
            element: <Search />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
