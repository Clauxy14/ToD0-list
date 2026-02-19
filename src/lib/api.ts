import axios from "axios";
import type {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  PaginatedResponse,
  TodoFilters,
} from "../types/todo";

const API_BASE_URL = "https://api.oluwasetemi.dev";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const todoApi = {
  // GET /tasks?page=1&limit=10
  getTodos: async (
    page = 1,
    limit = 10,
    filters?: TodoFilters,
  ): Promise<PaginatedResponse<Todo>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (filters?.search) {
      params.append("search", filters.search);
    }

    if (filters?.completed && filters.completed !== "all") {
      params.append(
        "status",
        filters.completed === "complete" ? "COMPLETED" : "TODO",
      );
    }

    const response = await api.get(`/tasks?${params.toString()}`);
    return response.data;
  },

  // GET /tasks/{id}
  getTodoById: async (id: string): Promise<Todo> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // POST /tasks
  createTodo: async (todoData: CreateTodoRequest): Promise<Todo> => {
    const response = await api.post("/tasks", todoData);
    return response.data;
  },

  // PATCH /tasks/{id} (not PUT)
  updateTodo: async (
    id: string,
    todoData: UpdateTodoRequest,
  ): Promise<Todo> => {
    try {
      console.log("Updating todo:", id, "with data:", todoData);
      const response = await api.patch(`/tasks/${id}`, todoData);
      console.log("Update response:", response.status, response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Update error:",
        (error as { response?: { status?: number; data?: unknown } }).response
          ?.status,
        (error as { response?: { data?: unknown } }).response?.data,
      );
      throw error;
    }
  },

  // DELETE /tasks/{id}
  deleteTodo: async (id: string): Promise<void> => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      console.log("Delete response:", response.status, response.data);
      // API returns 204 with no content on successful deletion
      return;
    } catch (error) {
      console.error(
        "Delete error:",
        (error as { response?: { status?: number; data?: unknown } }).response
          ?.status,
        (error as { response?: { data?: unknown } }).response?.data,
      );
      throw error;
    }
  },
};

export default api;
