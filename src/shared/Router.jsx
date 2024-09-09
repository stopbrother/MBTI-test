import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import { LayOut } from "../components/LayOut";
import { Profile } from "../pages/Profile";
import ProtectedRoute from "../components/ProtectedRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LayOut />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <ProtectedRoute>
            <Route path="/profile" element={<Profile />} />
          </ProtectedRoute>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
