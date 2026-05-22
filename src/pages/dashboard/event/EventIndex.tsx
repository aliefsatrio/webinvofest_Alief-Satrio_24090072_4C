import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/axios";

interface EventType {
  id: number;
  name: string;
  location: string;

  category?: {
    name: string;
  };

  pembicara?: {
    name: string;
  };
}

export default function EventIndex() {

  const [events, setEvents] =
    useState<EventType[]>([]);

  const [loading, setLoading] =
    useState(true);

  // GET DATA
  const getEvents = async () => {

    try {

      setLoading(true);

      const response =
        await api.get("/events");

      setEvents(response.data);

    } catch (error) {

      console.log(error);

      alert("Gagal mengambil data event");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    const fetchData = async () => {

      await getEvents();

    };

    fetchData();

  }, []);

  // DELETE
  const handleDelete = async (
    id: number
  ) => {

    const confirmDelete =
      confirm("Yakin ingin hapus event?");

    if (!confirmDelete) return;

    try {

      await api.delete(`/events/${id}`);

      alert("Event berhasil dihapus");

      getEvents();

    } catch (error) {

      console.log(error);

      alert("Gagal hapus event");

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

        <div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-red-900">
            Event Invofest
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Kelola semua event seminar, workshop, dan talkshow
          </p>

        </div>

        <Link
          to="/dashboard/event/create"
          className="
            bg-red-600 hover:bg-red-700
            transition-all duration-300
            text-white px-8 py-4
            rounded-xl shadow-lg
            font-bold text-lg
            hover:scale-105
          "
        >
          + Tambah Event
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
      {!loading && events.length === 0 && (

        <div className="bg-white rounded-3xl shadow-xl p-16 text-center">

          <h2 className="text-4xl font-bold text-gray-700">
            Belum Ada Event
          </h2>

          <p className="text-gray-500 mt-4 text-xl">
            Tambahkan event pertama untuk Invofest
          </p>

        </div>

      )}

      {/* LIST EVENT */}
      {!loading && events.length > 0 && (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {events.map((event) => (

            <div
              key={event.id}
              className="
                bg-white rounded-3xl shadow-xl overflow-hidden
                hover:shadow-2xl hover:-translate-y-2
                transition-all duration-300
                flex flex-col
                min-h-[560px]
              "
            >

              {/* TOP */}
              <div
                className="
                  bg-gradient-to-br
                  from-red-900
                  via-red-700
                  to-red-500
                  p-6 text-white
                "
              >

                <div className="flex justify-between items-start mb-6">

                  <div className="
                    bg-white/20
                    p-4 rounded-2xl
                    text-3xl
                    backdrop-blur-sm
                  ">
                    🎤
                  </div>

                  <span className="
                    bg-white/20
                    px-4 py-2 rounded-full
                    text-sm font-medium
                    border border-white/20
                  ">
                    {event.category?.name || "Event"}
                  </span>

                </div>

                <h2
                  className="
                    text-3xl font-extrabold
                    leading-tight
                    min-h-[140px]
                    line-clamp-4
                    flex items-start
                  "
                >
                  {event.name}
                </h2>

              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col flex-1">

                {/* PEMBICARA */}
                <div className="flex items-start gap-4">

                  <div className="
                    bg-red-100
                    p-3 rounded-xl
                    shrink-0
                  ">
                    👨‍🏫
                  </div>

                  <div>

                    <p className="text-gray-500 text-sm">
                      Pembicara
                    </p>

                    <h3
                      className="
                        text-xl font-semibold text-gray-800
                        leading-snug
                        line-clamp-2
                        min-h-[56px]
                      "
                    >
                      {event.pembicara?.name || "-"}
                    </h3>

                  </div>

                </div>

                {/* LOKASI */}
                <div className="flex items-start gap-4 mt-5">

                  <div className="
                    bg-red-100
                    p-3 rounded-xl
                    shrink-0
                  ">
                    📍
                  </div>

                  <div>

                    <p className="text-gray-500 text-sm">
                      Lokasi
                    </p>

                    <h3
                      className="
                        text-xl font-semibold text-gray-800
                        leading-snug
                        line-clamp-2
                        min-h-[56px]
                      "
                    >
                      {event.location}
                    </h3>

                  </div>

                </div>

                {/* SPACE */}
                <div className="flex-1" />

                {/* BUTTON */}
                <div className="flex gap-4 mt-8">

                  <Link
                    to={`/dashboard/event/edit/${event.id}`}
                    className="
                      flex-1
                      bg-yellow-400 hover:bg-yellow-500
                      text-white
                      py-3 rounded-2xl
                      font-bold text-center text-lg
                      transition-all duration-300
                      hover:scale-[1.02]
                      shadow-md
                    "
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(event.id)
                    }
                    className="
                      flex-1
                      bg-red-600 hover:bg-red-700
                      text-white
                      py-3 rounded-2xl
                      font-bold text-lg
                      transition-all duration-300
                      hover:scale-[1.02]
                      shadow-md
                    "
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