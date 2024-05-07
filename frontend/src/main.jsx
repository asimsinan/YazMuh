import "./App.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Template from "./components/Template";
import Home from "./components/Home";
import VenueDetail from "./components/VenueDetail";
import AddComment from "./components/AddComment";
import About from "./components/About";
import Admin from "./components/Admin";
import AddUpdateVenue from "./components/AddUpdateVenue";
import PageNotFound from "./components/PageNotFound";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Template />}>
        <Route path="/" element={<Home />} />
        <Route path="venue/:id" element={<VenueDetail />} />
        <Route
          path="venue/:id/comment/new"
          element={
            <ProtectedRoute
              role="user"
              pageToReturn={<AddComment />}
            />
          }
        />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="unauthorized" element={<Unauthorized/>} />
        <Route
          path="admin"
          element={
            <ProtectedRoute role="admin" pageToReturn={<Admin />} />
          }
        />
        <Route
          path="admin/addupdate/venue/:id"
          element={
            <ProtectedRoute role="admin"
              pageToReturn={<AddUpdateVenue />}
            />
          }
        />
        <Route
          path="admin/addupdate/venue/new"
          element={
            <ProtectedRoute role="admin"
              pageToReturn={<AddUpdateVenue />}
            />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
