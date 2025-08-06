export interface CategoryResponse {
    data: Category[]
    totalData: number
    currentPage: number
    totalPages: number
}

export interface Category {
    id: string
    name: string
    userId: string
    createdAt: string
    updatedAt: string
}

export interface CategoryParam {
    page: number
    limit: number
    search: string
}

export interface CategoryPayload {
    name: string
}

export interface UpdateCategoryPayload {
    name: string
}

export interface CategoryByIdResp {
    id: string
    name: string
    userId: string
    createdAt: string
    updatedAt: string
}