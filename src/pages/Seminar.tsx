import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import SpeakerCard from "../components/ui/SpeakerCard";
import Collapse from "../components/ui/Collapse";
import { Calendar, Clock, MapPin, Building } from "lucide-react";
import api from "../api/axios";

interface Event {
  name: string;
  description: string;
  location?: string;
  dateEvent?: string;
}

interface Speaker {
  name: string;
  role: string;
  image: string;
}

export default function Seminar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ambil event
        const eventResponse = await api.get("/events");
        setEvents(eventResponse.data);

        // ambil pembicara
        const speakerResponse = await api.get("/pembicara");
        setSpeakers(speakerResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const seminar = events[0];

  // FAQ
  const faqItems = [
    {
      title: "Apa itu Infofest??",
      description:
        "Invofest (Informatics Vocational Festival) adalah festival tahunan yang diadakan oleh program studi sarjana terapan teknik informatika Universitas Harkat Negeri.",
    },
    {
      title: "Kapan dan dimana INVOFEST dilaksanakan?",
      description:
        "INVOFEST diselenggarakan mulai tanggal 21 Oktober 2025 sampai dengan tanggal 27 November 2025.",
    },
    {
      title: "Apakah ada biaya pendaftaran di INVOFEST?",
      description:
        "Semua kegiatan dipastikan berbayar ya teman-teman.",
    },
  ];

  return (
    <div className="bg-gray-50">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">

        <div className="flex-1">

          <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
            {seminar?.name || "IT Seminar"}
          </h1>

          <h2 className="text-xl md:text-2xl text-red-800 mb-6">
            "Human-AI Integration: Merancang Arsitektur Kolaboratif, Bukan Kompetitif"
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            {seminar?.description ||
              "Seminar nasional yang membahas strategi dan arsitektur teknologi AI."}
          </p>

          <div className="flex gap-4">
            <Button
              label="DAFTAR SEKARANG"
              variant="primary"
            />
          </div>

        </div>

        <div className="flex-1 flex justify-center">
          <img
            src="https://www.invofest-harkatnegeri.com/assets/Maskot-Seminar.png"
            alt="seminar"
            className="w-72 md:w-96"
          />
        </div>

      </section>

      {/* TENTANG */}
      <section className="py-20 px-6 text-center">

        <h2 className="text-2xl md:text-3xl font-bold text-red-900 mb-4">
          Tentang IT Seminar
        </h2>

        <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
          Seminar bertajuk “Human-AI Integration: Merancang Arsitektur Kolaboratif”.
          Seminar ini membahas bagaimana manusia dan AI dapat bekerja sama secara kolaboratif.
        </p>

      </section>

      {/* SPEAKER */}
      <section className="max-w-6xl mx-auto px-6 pb-20">

        <h2 className="text-2xl md:text-3xl font-bold text-center text-red-900 mb-10">
          Temui Pembicara Khusus Kami
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">

          {speakers.map((speaker, index) => (

            <SpeakerCard
              key={index}
              name={speaker.name}
              role={speaker.role}
              imageUrl={speaker.image}
            />

          ))}

        </div>

      </section>

      {/* PELAKSANAAN */}
      <section className="max-w-5xl mx-auto px-6 pb-20">

        <h2 className="text-2xl md:text-3xl font-bold text-center text-red-900 mb-10">
          Pelaksanaan IT Seminar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Tanggal */}
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">

            <Calendar className="text-red-900" />

            <div>
              <p className="text-gray-500 text-sm">
                Tanggal
              </p>

              <h3 className="text-lg font-semibold text-red-900">
                {
                  seminar?.dateEvent
                    ? new Date(seminar.dateEvent).toLocaleDateString("id-ID")
                    : "Belum tersedia"
                }
              </h3>
            </div>

          </div>

          {/* Waktu */}
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">

            <Clock className="text-red-900" />

            <div>
              <p className="text-gray-500 text-sm">
                Waktu
              </p>

              <h3 className="text-lg font-semibold text-red-900">
                08.00 WIB - 12.00 WIB
              </h3>
            </div>

          </div>

          {/* Lokasi */}
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">

            <MapPin className="text-red-900" />

            <div>
              <p className="text-gray-500 text-sm">
                Lokasi
              </p>

              <h3 className="text-lg font-semibold text-red-900">
                {seminar?.location || "Belum tersedia"}
              </h3>
            </div>

          </div>

          {/* Kampus */}
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">

            <Building className="text-red-900" />

            <div>
              <p className="text-gray-500 text-sm">
                Tempat Kampus
              </p>

              <h3 className="text-lg font-semibold text-red-900">
                Kampus 1 Universitas Harkat Negeri
              </h3>
            </div>

          </div>

        </div>

      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 pb-20">

        <h2 className="text-2xl md:text-3xl font-bold text-center text-red-900 mb-6">
          Punya Pertanyaan? Lihat Disini
        </h2>

        <div className="flex flex-col gap-3">

          {faqItems.map((item, index) => (

            <Collapse
              key={index}
              title={item.title}
              description={item.description}
            />

          ))}

        </div>

      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-600 text-sm">
        &copy; 2026 Invofest. All rights reserved.
      </footer>

    </div>
  );
}