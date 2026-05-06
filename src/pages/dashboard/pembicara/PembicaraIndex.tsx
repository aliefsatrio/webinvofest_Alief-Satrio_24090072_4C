import { Link } from "react-router-dom";

export default function PembicaraIndex() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pembicara</h1>
      <p>Daftar pembicara yang tersedia.</p>

      <Link
        to="/dashboard/pembicara/create"
        className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded"
      >
        Tambah Pembicara
      </Link>
    </div>
  );
}