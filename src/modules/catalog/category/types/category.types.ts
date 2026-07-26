export interface CategoryDto {
  id: string;
  name: string;
  code: string;
  description: string | null;
  parentId: string | null;
  sortOrder: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  code: string;
  description?: string;
  parentId?: string | null;
  sortOrder: number;
}

export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
  sortOrder?: number;
  active?: boolean;
}

export interface CategoryTreeDto {
  id: string;
  name: string;
  code: string;
  description?: string;
  parentId?: string;
  level: number;
  leaf: boolean;
  sortOrder: number;
  active: boolean;
  children: CategoryTreeDto[];
}

export interface MoveCategoryRequest {
  newParentId: string | null;
}
