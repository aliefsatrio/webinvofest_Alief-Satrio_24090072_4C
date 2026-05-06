import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

type FormData = {
  eventName: string;
  speaker: string;
  date: string;
  time: string;
};

export default function EventCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Data event:", data);
    alert("Event berhasil dibuat!");
  };

  return (
    <div className="p-6 flex justify-center items-start min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 border">
        {/* Title */}
        <h2 className="text-lg font-semibold mb-4">
          Add New Event
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Nama Event"
            nama="eventName"
            register={register}
            error={errors.eventName?.message}
          />

          <Input
            label="Pembicara"
            nama="speaker"
            register={register}
            error={errors.speaker?.message}
          />

          <div>
            <label className="block text-sm mb-1">Tanggal</label>
            <input
              type="date"
              {...register("date")}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Jam</label>
            <input
              type="time"
              {...register("time")}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <Button
            label="+ Simpan"
            type="submit"
            variant="primary"
            className="w-full"
          />
        </form>
      </div>
    </div>
  );
}