import { Link } from "react-router-dom";

export default function EventIndex() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Event</h1>
      <p>Daftar event yang tersedia.</p>

      <Link
        to="/dashboard/event/create"
        className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded"
      >
        Tambah Event
      </Link>
    </div>
  );
}