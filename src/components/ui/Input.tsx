import type {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  label: string;
  nama: Path<T>;
  error?: string;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T>;
  type?: string;
  placeholder?: string;
}

export const Input = <T extends FieldValues>({
  label,
  nama,
  error,
  register,
  rules,
  type = "text",
  placeholder,
}: InputProps<T>) => {
  return (
    <div className="flex flex-col gap-1 mb-3">

      <label className="font-medium">
        {label}
      </label>

      <input
        autoComplete="off"
        type={type}
        {...register(nama, rules)}
        placeholder={placeholder}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

    </div>
  );
};