// For API GET 
export interface ArticleResponse {
    data: Article[]
    total: number
    page: number
    limit: number
}

export interface Article {
    id: string
    userId: string
    categoryId: string
    title: string
    content: string
    imageUrl: string
    createdAt: string
    updatedAt: string
    category: Category
    user: User
}

export interface Category {
    id: string
    userId: string
    name: string
    createdAt: string
    updatedAt: string
}

export interface User {
    id: string
    username: string
}

export interface ArticleQuery {
    page: number
    limit: number
    title: string
    category: string
    articleId?: string
}

// For API POST
export interface ArticlePayload {
    title: string
    content: string
    categoryId: string
    imageUrl: string
}

// For response POST 
export interface ArticlePayResp {
    id: string
    userId: string
    categoryId: string
    title: string
    content: string
    imageUrl: string
    createdAt: string
    updatedAt: string
}
