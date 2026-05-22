import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/axios";

interface Category {
  id: number;
  name: string;
}

export default function CategoryIndex() {

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loading, setLoading] =
    useState(true);

  // GET DATA
  const getCategories = async () => {

    try {

      setLoading(true);

      const response =
        await api.get("/categories");

      setCategories(response.data);

    } catch (error) {

      console.log(error);

      alert("Gagal mengambil data category");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    const fetchData = async () => {

      await getCategories();

    };

    fetchData();

  }, []);

  // DELETE
  const handleDelete = async (
    id: number
  ) => {

    const confirmDelete =
      confirm("Yakin ingin hapus category?");

    if (!confirmDelete) return;

    try {

      await api.delete(`/categories/${id}`);

      alert("Category berhasil dihapus");

      getCategories();

    } catch (error) {

      console.log(error);

      alert("Gagal hapus category");

    }

  };

  return (

    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-red-100 p-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-10">

        <div>

          <h1 className="text-5xl font-extrabold text-red-900">
            Category Event
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Kelola semua kategori event Invofest
          </p>

        </div>

        <Link
          to="/dashboard/category/create"
          className="bg-red-600 hover:bg-red-700 transition-all duration-300 text-white px-8 py-4 rounded-2xl shadow-lg font-bold text-lg"
        >
          + Tambah Category
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
      {!loading && categories.length === 0 && (

        <div className="bg-white rounded-3xl shadow-xl p-16 text-center">

          <h2 className="text-4xl font-bold text-gray-700">
            Belum Ada Category
          </h2>

          <p className="text-gray-500 mt-4 text-xl">
            Tambahkan category pertama untuk event Invofest
          </p>

        </div>

      )}

      {/* LIST CATEGORY */}
      {!loading && categories.length > 0 && (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {categories.map((category) => (

            <div
              key={category.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
            >

              {/* TOP */}
              <div className="bg-linear-to-r from-red-900 to-red-600 p-6 text-white">

                <div className="flex justify-between items-start mb-6">

                  <div className="bg-white/20 p-4 rounded-2xl text-3xl">
                    🎯
                  </div>

                  <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                    Category
                  </span>

                </div>

                <h2 className="text-4xl font-bold leading-tight">
                  {category.name}
                </h2>

              </div>

              {/* CONTENT */}
              <div className="p-6">

                <p className="text-gray-500 text-lg leading-relaxed">
                  Category event untuk website Invofest
                </p>

                {/* BUTTON */}
                <div className="flex gap-4 mt-8">

                  <Link
                    to={`/dashboard/category/edit/${category.id}`}
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white py-4 rounded-2xl font-bold text-center text-lg transition-all"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(category.id)
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