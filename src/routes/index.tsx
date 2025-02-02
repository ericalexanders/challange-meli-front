import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout";
import App from "@/pages/home/App";
import Items from "@/pages/items/Items";
import ItemDetails from "@/pages/itemDetail/itemDetails";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/items",
        element: <Items />,
      },
      {
        path: "/items/:id",
        element: <ItemDetails />,
      },
    ],
  },
]);
