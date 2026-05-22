import { useEffect, useState } from "react";
import api from "../../api/axios";

interface EventType {
  id: number;
  name: string;
  dateEvent: string;
  location: string;

  category?: {
    name: string;
  };

  pembicara?: {
    name: string;
  };
}

interface CategoryType {
  id: number;
  name: string;
}

interface PembicaraType {
  id: number;
  name: string;
  role: string;
  image: string;
}

export default function DashboardIndex() {

  const [events, setEvents] =
    useState<EventType[]>([]);

  const [categories, setCategories] =
    useState<CategoryType[]>([]);

  const [speakers, setSpeakers] =
    useState<PembicaraType[]>([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // FETCH DATA
  // =========================

  const fetchDashboardData = async () => {

    try {

      const [
        eventResponse,
        categoryResponse,
        speakerResponse
      ] = await Promise.all([

        api.get("/events"),
        api.get("/categories"),
        api.get("/pembicara")

      ]);

      setEvents(eventResponse.data);
      setCategories(categoryResponse.data);
      setSpeakers(speakerResponse.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {

    fetchDashboardData();

  }, []);

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white">

        <div className="bg-white shadow-2xl rounded-3xl px-10 py-8">

          <h1 className="text-3xl font-bold text-red-900 animate-pulse">
            Loading Dashboard...
          </h1>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 p-8">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-extrabold text-red-900">
          Dashboard Invofest
        </h1>

        <p className="text-gray-500 text-lg mt-3">
          Kelola event, category, dan pembicara 🚀
        </p>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">

        {/* EVENT */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border-l-8 border-red-700">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-lg">
                Total Event
              </p>

              <h2 className="text-5xl font-extrabold text-red-900 mt-2">
                {events.length}
              </h2>

            </div>

            <div className="text-6xl">
              🎤
            </div>

          </div>

        </div>

        {/* CATEGORY */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border-l-8 border-red-700">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-lg">
                Total Category
              </p>

              <h2 className="text-5xl font-extrabold text-red-900 mt-2">
                {categories.length}
              </h2>

            </div>

            <div className="text-6xl">
              🎯
            </div>

          </div>

        </div>

        {/* PEMBICARA */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border-l-8 border-red-700">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-lg">
                Total Pembicara
              </p>

              <h2 className="text-5xl font-extrabold text-red-900 mt-2">
                {speakers.length}
              </h2>

            </div>

            <div className="text-6xl">
              👨‍🏫
            </div>

          </div>

        </div>

      </div>

      {/* CONTENT */}
      <div className="grid lg:grid-cols-2 gap-8 mb-10">

        {/* EVENT */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-3xl font-bold text-red-900 mb-6">
            Event Terbaru
          </h2>

          <div className="flex flex-col gap-5">

            {events.length > 0 ? (

              events.slice(0, 5).map((event) => (

                <div
                  key={event.id}
                  className="flex justify-between items-center bg-red-50 rounded-2xl p-5 hover:bg-red-100 transition-all duration-300"
                >

                  <div>

                    <h3 className="font-bold text-xl text-gray-800">
                      {event.name}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      {event.location}
                    </p>

                  </div>

                  <div>

                    <p className="bg-red-600 text-white px-4 py-2 rounded-full text-sm">

                      {event.category?.name}

                    </p>

                  </div>

                </div>

              ))

            ) : (

              <p className="text-gray-500">
                Belum ada event
              </p>

            )}

          </div>

        </div>

        {/* SPEAKER */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-3xl font-bold text-red-900 mb-6">
            Pembicara
          </h2>

          <div className="flex flex-col gap-5">

            {speakers.length > 0 ? (

              speakers.slice(0, 5).map((speaker) => (

                <div
                  key={speaker.id}
                  className="flex items-center gap-5 bg-red-50 rounded-2xl p-5 hover:bg-red-100 transition-all duration-300"
                >

                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-red-200"
                  />

                  <div>

                    <h3 className="text-2xl font-bold text-gray-800">
                      {speaker.name}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      {speaker.role}
                    </p>

                  </div>

                </div>

              ))

            ) : (

              <p className="text-gray-500">
                Belum ada pembicara
              </p>

            )}

          </div>

        </div>

      </div>

      {/* CATEGORY */}
      <div className="bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-red-900 mb-6">
          Category Event
        </h2>

        <div className="flex flex-wrap gap-4">

          {categories.length > 0 ? (

            categories.map((category) => (

              <div
                key={category.id}
                className="px-6 py-4 bg-gradient-to-r from-red-700 to-red-500 text-white rounded-2xl shadow-lg font-semibold hover:scale-105 transition-all duration-300"
              >

                {category.name}

              </div>

            ))

          ) : (

            <p className="text-gray-500">
              Belum ada category
            </p>

          )}

        </div>

      </div>

    </div>

  );

}