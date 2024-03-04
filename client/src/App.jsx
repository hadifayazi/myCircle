import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
// import Home from "./pages/Home";
import Profile from "./features/user/Profile";
import AuthRequiredRoutes from "./components/AuthRequiredRoutes";
import Feeds from "./features/user/Feeds";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRequiredRoutes />,
    children: [
      { path: "feeds", element: <Feeds /> },
      {
        path: "profile",
        element: <Profile />,
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
