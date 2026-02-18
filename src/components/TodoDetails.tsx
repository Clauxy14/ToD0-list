import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit2,
  Save,
  X,
  Check,
  Trash2,
  Calendar,
  User,
} from "lucide-react";
import { LoadingSpinner } from "./LoadingSpinner";
import { useTodo, useUpdateTodo, useDeleteTodo } from "../hooks/useTodos";

export const TodoDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: todo, isLoading, error } = useTodo(id!);
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !todo) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">Failed to load todo details</div>
        <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
          Back to todos
        </Link>
      </div>
    );
  }

  const handleToggleComplete = () => {
    updateTodoMutation.mutate({
      id: todo.id,
      todoData: { status: todo.status === "COMPLETED" ? "TODO" : "COMPLETED" },
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      deleteTodoMutation.mutate(todo.id, {
        onSuccess: () => {
          navigate("/");
        },
      });
    }
  };

  const handleEdit = () => {
    setEditedName(todo.name);
    setEditedDescription(todo.description || "");
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTodoMutation.mutate({
      id: todo.id,
      todoData: {
        name: editedName,
        description: editedDescription,
      },
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedName("");
    setEditedDescription("");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to todos
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-4 flex-1">
            <button
              onClick={handleToggleComplete}
              className="mt-1 shrink-0"
              aria-label={
                todo.status === "COMPLETED"
                  ? "Mark as incomplete"
                  : "Mark as complete"
              }
            >
              <div
                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                  todo.status === "COMPLETED"
                    ? "bg-blue-600 border-blue-600"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                {todo.status === "COMPLETED" && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </div>
            </button>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="text-2xl font-bold text-gray-900 border-b-2 border-blue-500 focus:outline-none w-full"
                  autoFocus
                />
              ) : (
                <h1
                  className={`text-2xl font-bold ${
                    todo.status === "COMPLETED"
                      ? "text-gray-500 line-through"
                      : "text-gray-900"
                  }`}
                >
                  {todo.name}
                </h1>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors"
                  aria-label="Save changes"
                >
                  <Save className="w-5 h-5" />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors"
                  aria-label="Cancel editing"
                >
                  <X className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                aria-label="Edit todo"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={handleDelete}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              aria-label="Delete todo"
              disabled={deleteTodoMutation.isPending}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-medium text-gray-700 mb-2">
              Description
            </h2>
            {isEditing ? (
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add a description..."
              />
            ) : (
              <p
                className={`text-gray-600 ${todo.status === "COMPLETED" ? "line-through" : ""}`}
              >
                {todo.description || "No description provided"}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Status</h3>
              <span
                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  todo.status === "COMPLETED"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {todo.status === "COMPLETED" ? "Completed" : "In Progress"}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">
                Created
              </h3>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>
                  {todo.createdAt
                    ? new Date(todo.createdAt).toLocaleDateString()
                    : "No date"}
                </span>
              </div>
            </div>
            {todo.updatedAt !== todo.createdAt && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">
                  Updated
                </h3>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {todo.updatedAt
                      ? new Date(todo.updatedAt).toLocaleDateString()
                      : "No date"}
                  </span>
                </div>
              </div>
            )}
            {todo.owner && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">User</h3>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>ID: {todo.owner}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
