import { UpdatePostDTO, CreatePostDTO } from "./posts";
import { PostsService } from "./postsService";

export class PostsRepository {
    private readonly _postsService: PostsService;

    constructor() {
        this._postsService= new PostsService();
    }

    public async createPost(input: CreatePostDTO): Promise<any> {
        if(!input.content || !input.userId) 
            throw new Error("Invalid input");

        return await this._postsService.createPost(input);
    }

    public async getPostById(id: number): Promise<any> {
        if(!id) throw new Error("Invalid input");

        const post = await this._postsService.getPostById(id);

        if (!post) throw new Error("Post not found");

        return post;
    }

    public async getPostsByUserId(userId: number): Promise<any> {
        if(!userId) throw new Error("Invalid input");

        const posts = await this._postsService.getPostsByUserId(userId);

        if (!posts) throw new Error("Posts not found");

        return posts;
    }

    public async deletePostById(id: number): Promise<void> {
        if(!id) throw new Error("Invalid input");

        await this._postsService.deletePostById(id);
    }

    public async updatePostById({id, content}: UpdatePostDTO): Promise<any> {
        if(!id || !content) throw new Error("Invalid input");

        return await this._postsService.updatePostById({id, content});
    }

    public async getAllPosts(): Promise<any> {
        return await this._postsService.getAllPosts();
    }
}
