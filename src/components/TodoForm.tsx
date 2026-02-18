import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useCreateTodo } from "../hooks/useTodos";
import { useToast } from "../hooks/useToast";
import type { CreateTodoRequest } from "../types/todo";

interface TodoFormProps {
  onSuccess?: () => void;
}

export const TodoForm = ({ onSuccess }: TodoFormProps) => {
  const createTodoMutation = useCreateTodo();
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const todoData: CreateTodoRequest = {
      name: title.trim(),
      description: description.trim() || null,
      status: "TODO",
      priority: "LOW",
      archived: false,
    };

    createTodoMutation.mutate(todoData, {
      onSuccess: () => {
        toast.success("Todo created successfully!");
        setTitle("");
        setDescription("");
        setIsOpen(false);
        onSuccess?.();
      },
      onError: () => {
        toast.error("Failed to create todo. Please try again.");
      },
    });
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span>Add New Todo</span>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Create New Todo</h2>
        <button
          onClick={handleCancel}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter todo title..."
            required
            autoFocus
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter todo description (optional)..."
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!title.trim() || createTodoMutation.isPending}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {createTodoMutation.isPending ? "Creating..." : "Create Todo"}
          </button>
        </div>
      </form>
    </div>
  );
};
