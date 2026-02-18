import { Search, Filter } from 'lucide-react';
import type { TodoFilters } from '../types/todo';

interface SearchAndFilterProps {
  filters: TodoFilters;
  onFiltersChange: (filters: TodoFilters) => void;
}

export const SearchAndFilter = ({ filters, onFiltersChange }: SearchAndFilterProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      search: e.target.value,
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      completed: e.target.value as 'all' | 'complete' | 'incomplete',
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      completed: 'all',
    });
  };

  const hasActiveFilters = filters.search || filters.completed !== 'all';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={filters.search || ''}
              onChange={handleSearchChange}
              placeholder="Search todos..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={filters.completed || 'all'}
              onChange={handleStatusChange}
              className="appearance-none block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="all">All Status</option>
              <option value="incomplete">In Progress</option>
              <option value="complete">Completed</option>
            </select>
          </div>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          {filters.search && (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
              Search: {filters.search}
            </span>
          )}
          {filters.completed !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
              Status: {filters.completed === 'complete' ? 'Completed' : 'In Progress'}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
