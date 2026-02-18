import { Link } from "react-router-dom";
import { Check, Edit, Trash2, Calendar, User } from "lucide-react";
import { LoadingSpinner } from "./LoadingSpinner";
import {
  useTodos,
  useToggleTodoStatus,
  useDeleteTodo,
} from "../hooks/useTodos";
import type { Todo } from "../types/todo";

interface TodoListProps {
  page: number;
  filters?: {
    search?: string;
    completed?: "all" | "complete" | "incomplete";
  };
  onPageChange: (page: number) => void;
}

export const TodoList = ({ page, filters, onPageChange }: TodoListProps) => {
  const { data, isLoading, error } = useTodos(page, filters);

  const todos = data?.data || [];
  const pagination = data?.meta;

  const toggleTodoMutation = useToggleTodoStatus();
  const deleteTodoMutation = useDeleteTodo();

  const handleToggleTodo = (id: string, currentStatus: string) => {
    toggleTodoMutation.mutate({ id, currentStatus });
  };

  const handleDeleteTodo = (id: string) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      deleteTodoMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">Failed to load todos</div>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!todos?.length) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">No todos found</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {todos.map((todo: Todo) => (
          <div
            key={todo.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <button
                  onClick={() => handleToggleTodo(todo.id, todo.status)}
                  className="mt-1 shrink-0"
                  aria-label={
                    todo.status === "COMPLETED"
                      ? "Mark as incomplete"
                      : "Mark as complete"
                  }
                >
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      todo.status === "COMPLETED"
                        ? "bg-blue-600 border-blue-600"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    {todo.status === "COMPLETED" && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                </button>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-lg font-medium truncate ${
                      todo.status === "COMPLETED"
                        ? "text-gray-500 line-through"
                        : "text-gray-900"
                    }`}
                  >
                    {todo.name}
                  </h3>
                  {todo.description && (
                    <p
                      className={`text-sm mt-1 line-clamp-2 ${
                        todo.status === "COMPLETED"
                          ? "text-gray-400"
                          : "text-gray-600"
                      }`}
                    >
                      {todo.description}
                    </p>
                  )}
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {todo.createdAt
                          ? new Date(todo.createdAt).toLocaleDateString()
                          : "No date"}
                      </span>
                    </span>
                    {todo.owner && (
                      <span className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{todo.owner}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Link
                  to={`/todos/${todo.id}`}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  aria-label="View details"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  aria-label="Delete todo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 pt-4 border-t border-gray-200">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={!pagination.hasPreviousPage}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={!pagination.hasNextPage}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
