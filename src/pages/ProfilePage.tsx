import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Calendar, User as UserIcon } from 'lucide-react';
import { useAuth } from '../components/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const ProfilePage = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">Please log in to view your profile</div>
        <Link to="/login" className="text-blue-600 hover:text-blue-800 underline">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
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
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <UserIcon className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user.name || 'User'}
            </h1>
            <p className="text-gray-600">Profile Information</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Name</h3>
              <div className="flex items-center space-x-2">
                <UserIcon className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">
                  {user.name || 'Not provided'}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Email</h3>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{user.email}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">User ID</h3>
              <span className="text-sm text-gray-600 font-mono">{user.id}</span>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Member Since</h3>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {user.updatedAt !== user.createdAt && (
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-1">Last Updated</h3>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">
                  {new Date(user.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            This is your profile page. In a real application, you could update your profile information,
            change your password, or manage your account settings here.
          </div>
        </div>
      </div>
    </div>
  );
};
