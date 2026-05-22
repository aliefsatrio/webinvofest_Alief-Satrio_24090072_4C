import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../../api/axios";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";

type FormData = {
  name: string;
  role: string;
  image: string;
};

export default function PembicaraEdit() {

  const navigate = useNavigate();

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  // GET DETAIL
  useEffect(() => {

    const getPembicara = async () => {

      try {

        const response = await api.get(
          `/pembicara/${id}`
        );

        setValue("name", response.data.name);
        setValue("role", response.data.role);
        setValue("image", response.data.image);

      } catch (error) {

        console.log(error);

        alert("Gagal mengambil data");

      }

    };

    getPembicara();

  }, [id, setValue]);

  // UPDATE
  const onSubmit = async (data: FormData) => {

    try {

      await api.put(
        `/pembicara/${id}`,
        data
      );

      alert("Pembicara berhasil diupdate");

      navigate("/dashboard/pembicara");

    } catch (error) {

      console.log(error);

      alert("Gagal update pembicara");

    }

  };

  return (

    <div className="p-6 flex justify-center">

      <div className="bg-white p-6 rounded-lg shadow w-96">

        <h1 className="text-2xl font-bold mb-4">
          Edit Pembicara
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >

          <Input
            label="Nama"
            nama="name"
            register={register}
            rules={{
              required: "Nama wajib diisi",
            }}
            error={errors.name?.message}
          />

          <Input
            label="Role"
            nama="role"
            register={register}
            rules={{
              required: "Role wajib diisi",
            }}
            error={errors.role?.message}
          />

          <Input
            label="Image URL"
            nama="image"
            register={register}
            rules={{
              required: "Image wajib diisi",
            }}
            error={errors.image?.message}
          />

          <Button
            label="Update"
            type="submit"
            variant="primary"
            className="w-full"
          />

        </form>

      </div>

    </div>

  );

}