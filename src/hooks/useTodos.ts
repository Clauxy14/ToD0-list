import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "../lib/api";
import type { CreateTodoRequest, UpdateTodoRequest } from "../types/todo";

export const useTodos = (
  page = 1,
  filters?: {
    search?: string;
    status?: "all" | "todo" | "in_progress" | "completed";
  },
) => {
  return useQuery({
    queryKey: ["todos", page, filters],
    queryFn: () => todoApi.getTodos(page, 10, filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useTodo = (id: string) => {
  return useQuery({
    queryKey: ["todo", id],
    queryFn: () => todoApi.getTodoById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoData: CreateTodoRequest) => todoApi.createTodo(todoData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      todoData,
    }: {
      id: string;
      todoData: UpdateTodoRequest;
    }) => todoApi.updateTodo(id, todoData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["todo", id] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => todoApi.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useToggleTodoStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      currentStatus,
    }: {
      id: string;
      currentStatus: string;
    }) => {
      const newStatus = currentStatus === "COMPLETED" ? "TODO" : "COMPLETED";

      // API requires complete payload or specific fields
      return todoApi.updateTodo(id, {
        status: newStatus as "TODO" | "IN_PROGRESS" | "COMPLETED",
        // Include other required fields to avoid validation errors
        name: "", // This will be handled by the API call
        description: null,
        start: null,
        end: null,
        duration: null,
        priority: "LOW",
        archived: false,
        isDefault: null,
        parentId: null,
        children: "",
        owner: null,
        tags: null,
        completedAt: null,
      });
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["todo", id] });
    },
  });
};
