export interface Todo {
  id: string;
  name: string;
  description?: string | null;
  start?: string | null;
  end?: string | null;
  duration?: number | null;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  archived: boolean;
  isDefault?: boolean | null;
  parentId?: string | null;
  children?: string | null;
  owner?: string | null;
  tags?: string[] | null;
  completedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface CreateTodoRequest {
  name: string;
  description?: string | null;
  start?: string | null;
  end?: string | null;
  duration?: number | null;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  status?: "TODO" | "IN_PROGRESS" | "COMPLETED";
  archived?: boolean;
  isDefault?: boolean | null;
  parentId?: string | null;
  children?: string | null;
  owner?: string | null;
  tags?: string[] | null;
  completedAt?: string | null;
}

export interface UpdateTodoRequest {
  name?: string;
  description?: string | null;
  start?: string | null;
  end?: string | null;
  duration?: number | null;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  status?: "TODO" | "IN_PROGRESS" | "COMPLETED";
  archived?: boolean;
  isDefault?: boolean | null;
  parentId?: string | null;
  children?: string | null;
  owner?: string | null;
  tags?: string[] | null;
  completedAt?: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface TodoFilters {
  search?: string;
  completed?: "all" | "complete" | "incomplete";
}
