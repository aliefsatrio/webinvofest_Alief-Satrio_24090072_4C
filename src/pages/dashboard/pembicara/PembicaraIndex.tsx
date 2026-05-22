import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/axios";

interface Speaker {
  id: number;
  name: string;
  role: string;
  image: string;
}

export default function PembicaraIndex() {

  const [speakers, setSpeakers] =
    useState<Speaker[]>([]);

  const [loading, setLoading] =
    useState(true);

  // GET DATA
  const getSpeakers = async () => {

    try {

      setLoading(true);

      const response =
        await api.get("/pembicara");

      setSpeakers(response.data);

    } catch (error) {

      console.log(error);

      alert("Gagal mengambil data pembicara");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    const fetchData = async () => {

      await getSpeakers();

    };

    fetchData();

  }, []);

  // DELETE DATA
  const handleDelete = async (
    id: number
  ) => {

    const confirmDelete =
      confirm("Yakin ingin menghapus pembicara?");

    if (!confirmDelete) return;

    try {

      await api.delete(`/pembicara/${id}`);

      alert("Pembicara berhasil dihapus");

      await getSpeakers();

    } catch (error) {

      console.log(error);

      alert("Gagal menghapus pembicara");

    }

  };

  return (

    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-red-100 p-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-10">

        <div>

          <h1 className="text-5xl font-extrabold text-red-900">
            Pembicara Invofest
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Kelola semua pembicara event Invofest
          </p>

        </div>

        <Link
          to="/dashboard/pembicara/create"
          className="bg-red-600 hover:bg-red-700 transition-all duration-300 text-white px-8 py-4 rounded-2xl shadow-lg font-bold text-lg"
        >
          + Tambah Pembicara
        </Link>

      </div>

      {/* LOADING */}
      {loading && (

        <div className="bg-white rounded-3xl shadow-xl p-16 text-center">

          <h2 className="text-3xl font-bold text-gray-700">
            Loading...
          </h2>

        </div>

      )}

      {/* EMPTY */}
      {!loading && speakers.length === 0 && (

        <div className="bg-white rounded-3xl shadow-xl p-16 text-center">

          <h2 className="text-4xl font-bold text-gray-700">
            Belum Ada Pembicara
          </h2>

          <p className="text-gray-500 mt-4 text-xl">
            Tambahkan pembicara pertama untuk event Invofest
          </p>

        </div>

      )}

      {/* LIST DATA */}
      {!loading && speakers.length > 0 && (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {speakers.map((speaker) => (

            <div
              key={speaker.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
            >

              {/* TOP */}
              <div className="bg-linear-to-r from-red-900 to-red-600 p-8 text-white flex flex-col items-center">

                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />

                <h2 className="text-3xl font-bold mt-5 text-center">
                  {speaker.name}
                </h2>

                <p className="bg-white/20 px-5 py-2 rounded-full mt-4 text-sm">
                  {speaker.role}
                </p>

              </div>

              {/* CONTENT */}
              <div className="p-6">

                <div className="bg-red-50 border border-red-100 rounded-2xl p-4">

                  <p className="text-gray-500 text-sm">
                    Role Pembicara
                  </p>

                  <h3 className="text-2xl font-bold text-gray-800 mt-1">
                    {speaker.role}
                  </h3>

                </div>

                {/* BUTTON */}
                <div className="flex gap-4 mt-8">

                  <Link
                    to={`/dashboard/pembicara/edit/${speaker.id}`}
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white py-4 rounded-2xl font-bold text-center text-lg transition-all"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(speaker.id)
                    }
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-bold text-lg transition-all"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}