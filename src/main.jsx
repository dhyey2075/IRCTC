import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'
import TicketDetails from './components/TicketDetails.jsx';
import FindTrains from './components/FindTrains.jsx';
import Home from './components/Home.jsx';


import {
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

import TrainRoute from './components/TrainRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/pnr",
    element: <TicketDetails/>,
  },
  {
    path: "/gettrains",
    element: <FindTrains/>,
  },
  {
    path: "/getroute",
    element: <TrainRoute/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-6b3vd1ymu6088typ.us.auth0.com"
    clientId="wodHTBUK2n6ET8ZSAifLJEe75eaO00TY"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <RouterProvider router={router} />
  </Auth0Provider>,
)
