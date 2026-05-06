import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  label: string;
  nama: Path<T>;
  error?: string;
  register: UseFormRegister<T>;
  type?: string;
  placeholder?: string;
}

export const Input = <T extends FieldValues>({
  label,
  nama,
  error,
  register,
  type = "text",
  placeholder,
}: InputProps<T>) => {
  return (
    <div className="flex flex-col gap-1 mb-3">
      <label className="font-medium">{label}</label>
      <input
        type={type}
        {...register(nama)}
        placeholder={placeholder}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};