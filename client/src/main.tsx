import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

//Pages
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import SignUp from "./pages/SignUp";
import MyPlaylists from "./pages/MyPlaylists";
import Home from "./pages/Home";
import Page404 from "./pages/404.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index path='/' element={<Home />} />,
      <Route path='/login' element={<Login />} />,
      <Route path='/logout' element={<Logout />} />,
      <Route path='/signup' element={<SignUp />} />,
      <Route path='/playlists' element={<MyPlaylists />} />
      <Route path='*' element={<Page404 />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
