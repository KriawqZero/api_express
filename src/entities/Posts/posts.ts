export interface Post { 
    id: number;
    content: string;
    userId: number;
}

export interface CreatePostDTO {
    content: string;
    userId: number;
}

export interface UpdatePostDTO {
    id: number;
    content: string;
}