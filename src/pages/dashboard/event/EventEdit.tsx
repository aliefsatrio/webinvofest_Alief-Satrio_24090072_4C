import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import api from "../../../api/axios";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

type FormData = {
    name: string;
    categoryId: number;
    pembicaraId: number;
    location: string;
    dateEvent: string;
    description: string;
};

interface Category {
    id: number;
    name: string;
}

interface Pembicara {
    id: number;
    name: string;
}

export default function EventEdit() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [categories, setCategories] =
        useState<Category[]>([]);

    const [pembicaras, setPembicaras] =
        useState<Pembicara[]>([]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>();

    // GET DATA
    useEffect(() => {

        const fetchData = async () => {

            try {

                // EVENT
                const eventResponse =
                    await api.get(`/events/${id}`);

                // CATEGORY
                const categoryResponse =
                    await api.get("/categories");

                // PEMBICARA
                const pembicaraResponse =
                    await api.get("/pembicara");

                // SET DATA
                setCategories(categoryResponse.data);

                setPembicaras(pembicaraResponse.data);

                // SET FORM
                setValue(
                    "name",
                    eventResponse.data.name
                );

                setValue(
                    "categoryId",
                    eventResponse.data.categoryId
                );

                setValue(
                    "pembicaraId",
                    eventResponse.data.pembicaraId
                );

                setValue(
                    "location",
                    eventResponse.data.location
                );

                setValue(
                    "description",
                    eventResponse.data.description
                );

                // FIX DATE FORMAT
                setValue(
                    "dateEvent",
                    eventResponse.data.dateEvent
                        ?.slice(0, 16)
                );

            } catch (error) {

                console.log(error);

                alert("Gagal mengambil data");

            }

        };

        fetchData();

    }, [id, setValue]);

    // UPDATE
    const onSubmit = async (
        data: FormData
    ) => {

        try {

            await api.put(
                `/events/${id}`,
                {
                    name: data.name,

                    categoryId:
                        Number(data.categoryId),

                    pembicaraId:
                        Number(data.pembicaraId),

                    location:
                        data.location,

                    // FIX DATE
                    dateEvent:
                        new Date(data.dateEvent),

                    description:
                        data.description,
                }
            );

            alert("Event berhasil diupdate");

            navigate("/dashboard/event");

        } catch (error) {

            console.log(error);

            alert("Gagal update event");

        }

    };

    return (

        <div className="p-6 flex justify-center">

            <div className="bg-white p-6 rounded-lg shadow-md w-125 border">

                <h2 className="text-2xl font-semibold mb-4">
                    Edit Event
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                    autoComplete="off"
                >

                    {/* NAMA */}
                    <Input
                        label="Nama Event"
                        nama="name"
                        register={register}
                        rules={{
                            required:
                                "Nama event wajib diisi"
                        }}
                        error={errors.name?.message}
                    />

                    {/* CATEGORY */}
                    <div>

                        <label className="block mb-1 font-medium">
                            Category
                        </label>

                        <select
                            {...register("categoryId", {
                                required:
                                    "Category wajib dipilih"
                            })}
                            className="w-full border rounded px-3 py-2"
                        >

                            <option value="">
                                -- Pilih Category --
                            </option>

                            {categories.map((category) => (

                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>

                            ))}

                        </select>

                        {errors.categoryId && (

                            <p className="text-red-500 text-sm">
                                {errors.categoryId.message}
                            </p>

                        )}

                    </div>

                    {/* PEMBICARA */}
                    <div>

                        <label className="block mb-1 font-medium">
                            Pembicara
                        </label>

                        <select
                            {...register("pembicaraId", {
                                required:
                                    "Pembicara wajib dipilih"
                            })}
                            className="w-full border rounded px-3 py-2"
                        >

                            <option value="">
                                -- Pilih Pembicara --
                            </option>

                            {pembicaras.map((pembicara) => (

                                <option
                                    key={pembicara.id}
                                    value={pembicara.id}
                                >
                                    {pembicara.name}
                                </option>

                            ))}

                        </select>

                        {errors.pembicaraId && (

                            <p className="text-red-500 text-sm">
                                {errors.pembicaraId.message}
                            </p>

                        )}

                    </div>

                    {/* LOKASI */}
                    <Input
                        label="Lokasi"
                        nama="location"
                        register={register}
                        rules={{
                            required:
                                "Lokasi wajib diisi"
                        }}
                        error={errors.location?.message}
                    />

                    {/* TANGGAL */}
                    <div>

                        <label className="block mb-1 font-medium">
                            Tanggal Event
                        </label>

                        <input
                            type="datetime-local"
                            {...register("dateEvent", {
                                required:
                                    "Tanggal wajib diisi"
                            })}
                            className="w-full border rounded px-3 py-2"
                        />

                        {errors.dateEvent && (

                            <p className="text-red-500 text-sm">
                                {errors.dateEvent.message}
                            </p>

                        )}

                    </div>

                    {/* DESCRIPTION */}
                    <div>

                        <label className="block mb-1 font-medium">
                            Description
                        </label>

                        <textarea
                            {...register("description")}
                            rows={4}
                            className="w-full border rounded px-3 py-2"
                        />

                    </div>

                    <Button
                        label="Update Event"
                        type="submit"
                        variant="primary"
                        className="w-full"
                    />

                </form>

            </div>

        </div>

    );

}