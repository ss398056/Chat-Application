import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Authentication/Login.jsx";
import Signup from "./pages/Authentication/Signup.jsx";
import { Provider } from "react-redux";
import { store } from "./store/Store.js";
import Home from "./pages/home/Home.jsx";
import ProtectedRoutes from "./utilities/ProtectedRoutes.jsx";

//This is new way to set up react router
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes child={<Home />} />
    ,
  },
  {
    path: "/login",
    element: <ProtectedRoutes child={<Login />} /> ,
  },
  {
    path: "/signup",
    element: <ProtectedRoutes child={<Signup />} />,
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router} />
      <App />
    </Provider>
  </>
);
