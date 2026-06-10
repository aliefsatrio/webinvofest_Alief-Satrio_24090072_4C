import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Beranda from "./pages/Beranda";
import Competition from "./pages/Competition";
import Seminar from "./pages/Seminar";
import Workshop from "./pages/Workshop";
import Talkshow from "./pages/Talkshow";
import Login from "./pages/Login";
import Register from "./pages/Register";

import DashboardIndex from "./pages/dashboard/DashboardIndex";

import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

import CategoryIndex from "./pages/dashboard/category/CategoryIndex";
import CategoryCreate from "./pages/dashboard/category/CategoryCreate";

import PembicaraIndex from "./pages/dashboard/pembicara/PembicaraIndex";
import PembicaraCreate from "./pages/dashboard/pembicara/PembicaraCreate";
import PembicaraEdit from "./pages/dashboard/pembicara/PembicaraEdit";

import EventIndex from "./pages/dashboard/event/EventIndex";
import EventCreate from "./pages/dashboard/event/EventCreate";
import CategoryEdit from "./pages/dashboard/category/CategoryEdit";
import EventEdit from "./pages/dashboard/event/EventEdit";
import BiodataIndex from "./pages/dashboard/Biodata/BiodataIndex";
import UserIndex from "./pages/dashboard/user/UserIndex";
import UserCreate from "./pages/dashboard/user/UserCreate";
import UserEdit from "./pages/dashboard/user/UserEdit";

function App() {
  return (
    <Routes>

      {/* MAIN WEBSITE */}
      <Route element={<MainLayout />}>

        <Route path="/" element={<Beranda />} />
        <Route path="/competition" element={<Competition />} />
        <Route path="/seminar" element={<Seminar />} />
        <Route path="/workshop" element={<Workshop />} />
        <Route path="/talkshow" element={<Talkshow />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Route>

      {/* DASHBOARD */}
      <Route element={<ProtectedRoute />}>

        <Route element={<DashboardLayout />}>

          <Route
            path="/dashboard"
            element={<DashboardIndex />}
          />

          {/* CATEGORY */}
          <Route
            path="/dashboard/category"
            element={<CategoryIndex />}
          />

          <Route
            path="/dashboard/category/create"
            element={<CategoryCreate />}
          />

          <Route
            path="/dashboard/category/edit/:id"
            element={<CategoryEdit />}
          />

          {/* PEMBICARA */}
          <Route
            path="/dashboard/pembicara"
            element={<PembicaraIndex />}
          />

          <Route
            path="/dashboard/pembicara/create"
            element={<PembicaraCreate />}
          />

          <Route
            path="/dashboard/pembicara/edit/:id"
            element={<PembicaraEdit />}
          />

          {/* EVENT */}
          <Route
            path="/dashboard/event"
            element={<EventIndex />}
          />

          <Route
            path="/dashboard/event/create"
            element={<EventCreate />}
          />

          <Route
            path="/dashboard/event/edit/:id"
            element={<EventEdit />}
          />

          {/* <Biodata*/}
          <Route
            path="/dashboard/biodata"
            element={<BiodataIndex />}
          />

          <Route 
            path="/dashboard/user" 
            element={<UserIndex />} />

          <Route 
            path="/dashboard/user/create" 
            element={<UserCreate />} />

          <Route 
            path="/dashboard/user/edit/:id" 
            element={<UserEdit />} />

        </Route>

      </Route>

    </Routes>
  );
}

export default App;