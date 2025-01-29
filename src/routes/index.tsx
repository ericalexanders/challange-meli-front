import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import App from "@/pages/home/App";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
    ],
  },
]);
