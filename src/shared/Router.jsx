import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import { useState } from "react";

const Router = () => {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
