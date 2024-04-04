import React from "react";
import "./App.css";
import "./index.css"
import { Routes, Route, Link } from "react-router-dom";
import Markdown from "./Components/Markdown";
import CreateMarkdown from "./Components/CreateMardown";
import ViewMarkdown from "./Components/ViewMarkdown";
import { EditMarkdown } from "./Components/EditMarkdown";
import Home from "./Components/Home";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import { ProtectedRoute } from "./Auth/ProtectedRoute";
import Dashboard from "./Components/Dashboard";
import ForgotPassword from "./Auth/ForgotPassword";
import PasswordReset from "./Auth/PasswordReset";
import AboutUsContent from "./AboutUsContent"
import Layout from "./Layout";
import Navbar from "./Components/NavBar"
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";



function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    // <div>
    //   {location.pathname.startsWith('/dashboard') ? <Navbar /> : <Layout />}
    //   <Routes>
    //     <Route path="/" element={<AboutUsContent />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/register" element={<Signup />} />
    //     <Route path="/forgotpassword" element={<ForgotPassword />} />
    //     <Route path="/forgot-password-page/:id/:token" element={<PasswordReset />} />
    //     <Route path="/dashboard" element={<Dashboard />}>
    //       <Route path="home" element={<Home />} />
    //       <Route path="get" element={<Markdown />} />
    //       <Route path="create" element={<CreateMarkdown />} />
    //       <Route path="view/:id" element={<ViewMarkdown />} />
    //       <Route path="edit/:id" element={<EditMarkdown />} />
    //     </Route>
    //   </Routes>
    // </div>
    <div>
      {location.pathname.startsWith("/dashboard") ? <Navbar /> : <Layout />}
      <Routes>
        <Route path="/" element={<AboutUsContent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/forgot-password-page/:id/:token" element={<PasswordReset />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="get" element={<Markdown />} />
          <Route path="create" element={<CreateMarkdown />} />
          <Route path="view/:id" element={<ViewMarkdown />} />
          <Route path="edit/:id" element={<EditMarkdown />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;



