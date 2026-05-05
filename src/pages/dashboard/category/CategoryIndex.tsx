import { Link } from "react-router-dom";

export default function DashboardIndex() {
  return (
    <div>
      <h1>Category</h1>
      <p>Selamat Datang di halaman Category</p>

      <Link
        to="/dashboard/category/create"
        className="p-2 bg-red-500 text-white rounded"
      >
        Tambah Category
      </Link>
    </div>
  );
}