import { useState } from 'react';
import { TodoList } from '../components/TodoList';
import { TodoForm } from '../components/TodoForm';
import { SearchAndFilter } from '../components/SearchAndFilter';
import type { TodoFilters } from '../types/todo';

export const HomePage = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<TodoFilters>({
    search: '',
    completed: 'all',
  });

  const handleFiltersChange = (newFilters: TodoFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  const handleTodoCreated = () => {
    // Refresh the current page to show the new todo
    setPage(1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Todo Application</h1>
        <p className="text-gray-600">Manage your tasks efficiently</p>
      </div>

      <div className="space-y-6">
        <TodoForm onSuccess={handleTodoCreated} />
        
        <SearchAndFilter
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
        
        <TodoList
          page={page}
          filters={filters}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};
