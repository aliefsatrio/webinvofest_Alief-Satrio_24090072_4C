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
import EventIndex from "./pages/dashboard/event/EventIndex";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* HALAMAN UTAMA */}
        <Route path="/" element={<Beranda />} />
        <Route path="/competition" element={<Competition />} />
        <Route path="/seminar" element={<Seminar />} />
        <Route path="/workshop" element={<Workshop />} />
        <Route path="/talkshow" element={<Talkshow />} />

        {/* AUTH (TETAP PAKAI HEADER) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      //halaman yang diakses setelah login
        <Route element={<ProtectedRoute />}>
          <Route element= {<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardIndex />} />

            <Route path="/dashboard/category" element={<CategoryIndex />} />
            <Route path="/dashboard/category/create" element={<CategoryCreate />} />

            <Route path="/dashboard/pembicara" element={<PembicaraIndex />} />

            <Route path="/dashboard/event" element={<EventIndex />} />
          </Route>
        </Route>
    </Routes>
  );
}

export default App;