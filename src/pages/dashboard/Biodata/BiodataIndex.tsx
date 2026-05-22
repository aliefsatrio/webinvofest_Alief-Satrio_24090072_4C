import profileImage from "../../../assets/ProfileBiodata.jpeg"; 
export default function BiodataIndex() {

  return (

    <div className="w-full min-h-screen bg-linear-to-br from-red-100 via-white to-red-50 p-10">

      {/* HEADER */}
      <div className="text-center mb-10">

        <h1 className="text-5xl font-extrabold text-red-900 tracking-wide">
          Biodata Mahasiswa
        </h1>

        <p className="text-gray-600 mt-3 text-lg">
          Data pembuat website Invofest
        </p>

      </div>

      {/* CARD */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="grid md:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="bg-linear-to-br from-red-900 to-red-700 flex flex-col justify-center items-center p-12 text-white">

            <img
              src={profileImage}
              alt="profile"
              className="w-72 h-72 rounded-full object-cover border-8 border-white shadow-xl"
            />

            <h2 className="mt-8 text-4xl font-bold">
              ALIEF SATRIO
            </h2>

            <p className="text-red-100 text-lg mt-2">
              Frontend Developer
            </p>

          </div>

          {/* RIGHT SIDE */}
          <div className="p-12 flex flex-col justify-center gap-6">

            <div className="border-b pb-4">

              <h3 className="text-gray-500 text-sm uppercase tracking-widest">
                Nama
              </h3>

              <p className="text-2xl font-semibold text-gray-800 mt-1">
                Alief Satrio
              </p>

            </div>

            <div className="border-b pb-4">

              <h3 className="text-gray-500 text-sm uppercase tracking-widest">
                NIM
              </h3>

              <p className="text-2xl font-semibold text-gray-800 mt-1">
                24090072
              </p>

            </div>

            <div className="border-b pb-4">

              <h3 className="text-gray-500 text-sm uppercase tracking-widest">
                Kelas
              </h3>

              <p className="text-2xl font-semibold text-gray-800 mt-1">
                4C
              </p>

            </div>

            <div className="border-b pb-4">

              <h3 className="text-gray-500 text-sm uppercase tracking-widest">
                Program Studi
              </h3>

              <p className="text-2xl font-semibold text-gray-800 mt-1">
                D4 Teknik Informatika
              </p>

            </div>

            <div className="border-b pb-4">

              <h3 className="text-gray-500 text-sm uppercase tracking-widest">
                Email
              </h3>

              <p className="text-2xl font-semibold text-gray-800 mt-1">
                alifsatrio757@gmail.com
              </p>

            </div>

            <div>

              <h3 className="text-gray-500 text-sm uppercase tracking-widest">
                Skill
              </h3>

              <p className="text-2xl font-semibold text-gray-800 mt-1">
                React JS, TypeScript, Tailwind CSS
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}