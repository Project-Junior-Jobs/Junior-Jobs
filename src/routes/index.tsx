import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { Company } from "../pages/company";
import { Register } from "../pages/register";
import { ProtectRoutes } from "../components/ProtectRoutes";
import { UserProfile } from "../pages/user";
import { Job } from "../pages/job";
import { MyUserContext } from "../components/ProtectRoutes/MyUserContext";
import { Home } from "../pages/home";
import { MyHomeContext } from "../components/ProtectRoutes/MyHomeContext";
import { NotFound } from "../components/NotFound";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectRoutes />}>
        <Route path="/company" element={<Company />} />
        <Route element={<MyUserContext />}>
          <Route element={<MyHomeContext />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/user" element={<UserProfile />} />
          <Route path="/job/:name" element={<Job />} />
        </Route>
      </Route>
      <Route path="not Found" element={<NotFound/>}/>
    </Routes>
  );
};
