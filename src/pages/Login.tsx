import { useState } from "react";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";

export default function Login() {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const [data, setData] = useState({
    nim: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // LOGIN DUMMY
    if (data.nim === "24090072" && data.password === "admin123") {
      alert("Login Berhasil");

      login(data.nim);
      navigate("/dashboard");
    } else {
      alert("NIM atau password anda salah");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden flex max-w-4xl w-full">

        {/* LEFT */}
        <div className="hidden md:flex w-1/2 items-center justify-center p-6">
          <img
            src="https://www.invofest-harkatnegeri.com/assets/Maskot-Hero.png"
            alt="login"
            className="w-72"
          />
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-2xl font-bold text-red-900 text-center mb-6">
            Login
          </h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            {/* INPUT NIM */}
            <input
              type="text"
              placeholder="Masukkan NIM"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              value={data.nim}
              onChange={(e) =>
                setData({ ...data, nim: e.target.value })
              }
              required
            />

            {/* INPUT PASSWORD */}
            <input
              type="password"
              placeholder="Masukkan Password"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              value={data.password}
              onChange={(e) =>
                setData({ ...data, password: e.target.value })
              }
              required
            />

            {/* BUTTON */}
            <Button label="Masuk" variant="primary" />

            {/* REGISTER */}
            <p className="text-sm text-center text-gray-600">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="text-red-900 font-semibold"
              >
                Registrasi Sekarang
              </Link>
            </p>

          </form>
        </div>

      </div>
    </div>
  );
}