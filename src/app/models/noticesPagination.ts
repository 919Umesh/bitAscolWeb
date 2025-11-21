export interface NoticeModelPagination {
  $id: string;
  topic: string;
  file: string;
  $createdAt: string;
  $updatedAt: string;
  $sequence: number;
  $permissions: string[];
  $databaseId: string;
  $tableId: string;
}

export interface NoticesResponsePagination {
  data: NoticeModelPagination[];
  message: string;
  total: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}