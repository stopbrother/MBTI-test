import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import { LayOut } from "../components/LayOut";
import { Profile } from "../pages/Profile";
import ProtectedRoute from "../components/ProtectedRoute";
import Test from "../pages/Test";
import TestResult from "../pages/TestResult";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LayOut />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/test"
            element={
              <ProtectedRoute>
                <Test />
              </ProtectedRoute>
            }
          />

          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <TestResult />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
