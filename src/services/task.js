import { apiClient } from "./config";

export const apiGetTasks = async () => await apiClient.get(`/api/todos/`);
console.log(apiGetTasks);

export const apiGetSingleTask = async (id) => apiClient.get(`/api/todos/${id}`);

export const apiAddTask = async (payload) =>
  apiClient.post("/api/todos/", payload);

export const apiUpdateTask = async (id, payload) =>
  apiClient.patch(`/api/todos/${id}`, payload);

export const apiDeleteTask = async (id) => apiClient.delete(`/api/todos/${id}`);
