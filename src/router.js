import { createBrowserRouter } from "react-router-dom";
import { App } from './App';
import { Administration } from "./Components/EyewearAdministration/Administration";
import { LoginPage } from "./Components/LoginPage/LoginPage";


/* function createBrowserRouter(
  routes: RouteObject [],
  opts?: {
    basename?: string;
    window?: Window;
  }
): RemixRouter ; */

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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

      /* {
        path: "/managelenses",
        element: <LensesAdministration />,
        children: [
          {
            path: "/managelenses/:id",
            element: <LensesAdministration />,
          }
        ]
      }, */

    ],
  },

]
)



