import { Link } from "react-router-dom";

export default function CategoryIndex() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Kategori</h1>
      <p>Daftar kategori yang tersedia.</p>

      <Link
        to="/dashboard/category/create"
        className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded"
      >
        Tambah Kategori
      </Link>
    </div>
  );
}