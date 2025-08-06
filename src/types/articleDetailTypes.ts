export interface ArticleDetailResp {
    id: string
    userId: string
    categoryId: string
    title: string
    content: string
    imageUrl: string
    createdAt: string
    updatedAt: string
    user: User
    category: Category
}

export interface User {
    id: string
    username: string
    role: string
    password: string
    createdAt: string
    updatedAt: string
}

export interface Category {
    id: string
    userId: string
    name: string
    createdAt: string
    updatedAt: string
}
