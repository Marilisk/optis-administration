import { createBrowserRouter } from "react-router-dom";
import { App } from './App';
import Administration from "./Components/EyewearAdministration/Administration";
import { LensesAdministration } from "./Components/LensesAdministration/LensesAdministration";
import { LoginPage } from "./Components/LoginPage/LoginPage";
import { Orders } from "./Components/OrderAdministration/Orders";
import { Photos } from "./Components/Photos/Photos";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Orders />,
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
        path: "//photo",
        element: <Photos />,
        /* children: [
          {
            path: "/managelenses/:id",
            element: <LensesAdministration />,
          }
        ] */
      },




    ],
  },
]
)



