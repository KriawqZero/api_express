import { PostsRepository } from './postsRepository';
import { Request, Response } from 'express';
import { CreatePostDTO } from './posts';

export class PostsController {
    private readonly _postsRepository: PostsRepository;

    constructor() {
        this._postsRepository = new PostsRepository();
    }

    public async createPost(req: Request, res: Response): Promise<Response<any>> {
        if(!req.body.content || !req.body.userId) 
            return res.status(400).json({ message: "Invalid input" });

        const input: CreatePostDTO = {
            content: req.body.content,
            userId: req.body.userId,
        }

        let post;

        try {
            post = await this._postsRepository.createPost(input);
        } catch (error: any) {
            if(error.message === "Invalid input") 
                return res.status(400).json({ message: error.message });
            return res.status(500).json({ message: error.message });
        }

        return res.status(201).json(post);
    }

    public async getAllPosts(req: Request, res: Response): Promise<Response<any>> {
        let posts;

        try {
            posts = await this._postsRepository.getAllPosts();
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }

        return res.status(200).json(posts);
    }

    public async getPostById(req: Request, res: Response): Promise<Response<any>> {
        if(!req.params.id) 
            return res.status(400).json({ message: "Invalid input" });

        let post;

        try {
            post = await this._postsRepository.getPostById(Number(req.params.id));
        } catch (error: any) {
            if(error.message === "Post not found") 
                return res.status(400).json({ message: error.message });
            return res.status(500).json({ message: error.message });
        }

        return res.status(200).json(post);
    }

    public async deletePostById(req: Request, res: Response): Promise<Response<any>> {
        if(!req.params.id) 
            return res.status(400).json({ message: "Invalid input" });

        try {
            await this._postsRepository.deletePostById(Number(req.params.id));
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }

        return res.status(200).json({ message: "Post deleted" });
    }

    public async getPostsByUserId(req: Request, res: Response): Promise<Response<any>> {
        if(!req.params.userId) 
            return res.status(400).json({ message: "Invalid input" });

        let posts;

        try {
            posts = await this._postsRepository.getPostsByUserId(Number(req.params.userId));
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }

        return res.status(200).json(posts);
    }

}