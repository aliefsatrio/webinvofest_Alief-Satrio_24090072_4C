import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

type FormData = {
  name: string;
  role: string;
  photo: FileList;
};

export default function SpeakerCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Data pembicara:", data);
    alert("Pembicara berhasil dibuat!");
  };

  return (
    <div className="p-6 flex justify-center items-start min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 border">
        {/* Title */}
        <h2 className="text-lg font-semibold mb-4">
          Add New Pembicara
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Nama"
            nama="name"
            register={register}
            error={errors.name?.message}
          />

          <Input
            label="Role"
            nama="role"
            register={register}
            error={errors.role?.message}
          />

          <div>
            <label className="block text-sm mb-1">Foto</label>
            <input
              type="file"
              {...register("photo")}
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