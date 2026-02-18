import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const AppMinimal = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Minimal Todo App</h1>
          <p className="mb-4">React is working!</p>
          <p className="text-gray-600">If you see this, the basic setup is working.</p>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default AppMinimal;
