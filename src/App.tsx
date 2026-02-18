import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { NotFound } from "./components/NotFound";
import { AuthProvider } from "./components/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UserMenu } from "./components/UserMenu";
import { WebSocketProvider } from "./components/WebSocketProvider";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { TodoDetails } from "./components/TodoDetails";
import { SimpleTest } from "./components/SimpleTest";
import { ErrorTestPage } from "./pages/ErrorTestPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Todo App</h1>
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </a>
              <a
                href="/error-test"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Error Test
              </a>
              <UserMenu />
            </div>
          </nav>
        </div>
      </header>

      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <WebSocketProvider>
                    <HomePage />
                  </WebSocketProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/todos/:id"
              element={
                <ProtectedRoute>
                  <WebSocketProvider>
                    <TodoDetails />
                  </WebSocketProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <WebSocketProvider>
                    <ProfilePage />
                  </WebSocketProvider>
                </ProtectedRoute>
              }
            />
            <Route path="/simple-test" element={<SimpleTest />} />
            <Route path="/error-test" element={<ErrorTestPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <AppLayout />
          </Router>
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
