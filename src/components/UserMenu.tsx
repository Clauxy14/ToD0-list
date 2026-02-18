import { useState } from "react";
import { Link } from "react-router-dom";
import { User, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "./AuthContext";
import { useLogout } from "../hooks/useAuth";

export const UserMenu = () => {
  const { user } = useAuth();
  const logoutMutation = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
    setIsMenuOpen(false);
  };

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link
          to="/login"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Sign In
        </Link>
        <Link
          to="/login?mode=register"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <User className="w-5 h-5" />
        <span className="text-sm font-medium">{user.name || user.email}</span>
        {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">
              {user.name || "User"}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>

          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            <span>
              {logoutMutation.isPending ? "Signing out..." : "Sign Out"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
