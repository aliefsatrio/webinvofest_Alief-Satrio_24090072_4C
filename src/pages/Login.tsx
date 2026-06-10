import { useState } from "react";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [data, setData] = useState({ email: "", password: "" }); // ← nim → email
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { // ← /auth/login
        email: data.email,
        password: data.password,
      });

      const result = response.data;
      // result: { message, user: { name, email }, token }

      login(result.user.name, result.token); // ← name + token
      navigate("/dashboard");

    } catch {
      setError("Email atau password salah.");
    } finally {
      setLoading(false);
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

          {error && (
            <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            {/* INPUT EMAIL */}
            <input
              type="email"
              placeholder="Masukkan Email"  
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />

            {/* INPUT PASSWORD */}
            <input
              type="password"
              placeholder="Masukkan Password"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />

            <Button label={loading ? "Memuat..." : "Masuk"} variant="primary" />

            <p className="text-sm text-center text-gray-600">
              Belum punya akun?{" "}
              <Link to="/register" className="text-red-900 font-semibold">
                Registrasi Sekarang
              </Link>
            </p>

          </form>
        </div>

      </div>
    </div>
  );
}