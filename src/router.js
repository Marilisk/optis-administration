import { createBrowserRouter } from "react-router-dom";
import { App } from './App';
import { ErrorPage } from "./Components/ErrorPage/ErrorPage";
import Administration from "./Components/EyewearAdministration/Administration";
import { Eyewears } from "./Components/Goods/Eyewears";
import { LensesAdministration } from "./Components/LensesAdministration/LensesAdministration";
import { LoginPage } from "./Components/LoginPage/LoginPage";
import { NoAdminPage } from "./Components/NoAdminPage/NoAdminPage";
import { Orders } from "./Components/OrderAdministration/Orders";
import { Photos } from "./Components/Photos/Photos";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Eyewears />,
      },
      
      {
        path: "/orders/:step",
        element: <Orders />,
      },

      {
        path: "/login",
        element: <LoginPage />,
      },

      {
        path: "/manage",
        element: <Administration />,
        children: [
          {
            path: "/manage/:id",
            element: <Administration />,
          }
        ]
      },

      {
        path: "/managelenses",
        element: <LensesAdministration />,
        children: [
          {
            path: "/managelenses/:id",
            element: <LensesAdministration />,
          }
        ]
      },

      {
        path: "/photo",
        element: <Photos />,
      },

      {
        path: "goods/eyewears",
        element: <Eyewears />,
      },

      {
        path: "/noadminerror",
        element: <NoAdminPage />,
      },

    ],
  },
]
)



