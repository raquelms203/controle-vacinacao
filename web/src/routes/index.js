import Home from "../pages/Home/index";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Admin from "../pages/Admin";

export default function RoutesApp() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}
