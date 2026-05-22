import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../../api/axios";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";

type FormData = {
  name: string;
};

export default function CategoryEdit() {

  const { id } = useParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {

    const getCategory = async () => {

      try {

        const response =
          await api.get(`/categories/${id}`);

        setValue("name", response.data.name);

      } catch (error) {

        console.log(error);

      }

    };

    getCategory();

  }, [id, setValue]);

  const onSubmit = async (
    data: FormData
  ) => {

    try {

      await api.put(
        `/categories/${id}`,
        data
      );

      alert("Category berhasil diupdate");

      navigate("/dashboard/category");

    } catch (error) {

      console.log(error);

      alert("Gagal update category");

    }

  };

  return (

    <div className="p-6 flex justify-center">

      <div className="bg-white p-6 rounded-lg shadow w-96">

        <h1 className="text-2xl font-bold mb-4">
          Edit Category
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
              required: "Nama wajib diisi"
            }}
            error={errors.name?.message}
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