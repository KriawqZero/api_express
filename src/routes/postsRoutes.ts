import { Router } from "express";
import { PostsController } from "../entities/Posts/postsController";
import { auth } from "../middlewares/auth";

const postsRoutes = Router();
const postsController = new PostsController();

/**
 * @swagger
 * /api/post/create:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post created successfully
 */
postsRoutes.post('/post/create', auth, (req, res) => {postsController.createPost(req, res)});

/**
 * @swagger
 * /api/posts/all:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of all posts
 */
postsRoutes.get('/posts/all', auth, (req, res) => {postsController.getAllPosts(req, res)});

/**
 * @swagger
 * /api/post/{id}:
 *   get:
 *     summary: Get post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post
 *     responses:
 *       200:
 *         description: Post found
 */
postsRoutes.get('/post/:id', auth, (req, res) => {postsController.getPostById(req, res)});

/**
 * @swagger
 * /api/post/{id}:
 *   delete:
 *     summary: Delete post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post
 *     responses:
 *       200:
 *         description: Post deleted successfully
 */
postsRoutes.delete('/post/:id', auth, (req, res) => {postsController.deletePostById(req, res)});

/**
 * @swagger
 * /api/post/user/{userId}:
 *   get:
 *     summary: Get posts by user ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of posts by user
 */
postsRoutes.get('/post/user/:userId', auth, (req, res) => {postsController.getPostsByUserId(req, res)});

export default postsRoutes;