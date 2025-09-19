import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import ChatPage from "./Pages/ChatPage.jsx";
import UploadPage from "./Pages/UploadPage.jsx";
import AboutPage from "./Pages/AboutPage.jsx";
import ContactPage from "./Pages/ContactPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/upload",
    element: <UploadPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
