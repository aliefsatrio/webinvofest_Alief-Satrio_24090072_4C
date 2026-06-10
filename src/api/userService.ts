import api from "./axios";

export interface User {
  id: number;
  name: string;
  email: string;
  foto: string;
  createdAt: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  foto: string;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  foto?: string;
}

export const getAllUsers = async (): Promise<User[]> => {
  const res = await api.get("/users");
  return res.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

export const createUser = async (payload: CreateUserPayload): Promise<void> => {
  await api.post("/users", payload);
};

export const updateUser = async (
  id: number,
  payload: UpdateUserPayload
): Promise<void> => {
  await api.put(`/users/${id}`, payload);
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};