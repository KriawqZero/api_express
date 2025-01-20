import { PrismaClient } from '@prisma/client';
import { CreatePostDTO, UpdatePostDTO } from './posts';

export class PostsService {
    private readonly db: PrismaClient;

    constructor() {
        this.db = new PrismaClient();
    }

    public async createPost(input: CreatePostDTO): Promise<any> {
        const post = await this.db.posts.create({
            data: {
                content: input.content,
                userId: input.userId
            },
        });

        return post;
    }

    public async getPostById(id: number): Promise<any> {
        return await this.db.posts.findUnique({
            where: {
                id,
            },
        });
    }

    public async getPostsByUserId(userId: number): Promise<any> {
        return await this.db.posts.findMany({
            where: {
                userId,
            },
        });
    }

    public async deletePostById(id: number): Promise<void> {
        await this.db.posts.delete({
            where: {
                id,
            },
        });
    }

    public async updatePostById({id, content}: UpdatePostDTO): Promise<any> {
        return await this.db.posts.update({
            where: {
                id,
            },
            data: {
                content,
            },
        });
    }

    public async getAllPosts(): Promise<any> {
        return await this.db.posts.findMany();
    }
}