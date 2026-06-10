import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser, type UpdateUserPayload } from "../../../api/userService";

export default function UserEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    foto: "",
  });
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Ambil data user yang akan diedit
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserById(Number(id));
        setForm({
          name: user.name,
          email: user.email,
          password: "",
          foto: user.foto,
        });
      } catch {
        setError("Gagal memuat data user.");
      } finally {
        setLoadingData(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async () => {
    setError(null);
    const payload: UpdateUserPayload = {};
    if (form.name) payload.name = form.name;
    if (form.email) payload.email = form.email;
    if (form.foto) payload.foto = form.foto;
    if (form.password) payload.password = form.password;

    setSubmitting(true);
    try {
      await updateUser(Number(id), payload);
      navigate("/dashboard/user");
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      setError(
        apiError?.response?.data?.message ||
          (err instanceof Error ? err.message : "Gagal memperbarui user.")
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingData) {
    return (
      <div className="p-6 text-center text-gray-400 text-sm">
        Memuat data user...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/dashboard/user")}
          className="text-sm text-gray-500 hover:text-gray-700 mb-2 flex items-center gap-1"
        >
          ← Kembali
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Edit User</h1>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Nama
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nama lengkap"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="email@example.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Password{" "}
            <span className="text-gray-400">(kosongkan jika tidak diubah)</span>
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            URL Foto
          </label>
          <input
            type="text"
            value={form.foto}
            onChange={(e) => setForm({ ...form, foto: e.target.value })}
            placeholder="https://example.com/foto.jpg"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {form.foto && (
            <img
              src={form.foto}
              alt="preview"
              onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
              className="mt-2 w-12 h-12 rounded-full object-cover border border-gray-200"
            />
          )}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => navigate("/dashboard/user")}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50"
          >
            {submitting ? "Menyimpan..." : "Perbarui User"}
          </button>
        </div>
      </div>
    </div>
  );
}