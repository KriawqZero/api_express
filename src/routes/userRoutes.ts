import { Router } from "express";
import { UserController } from "../entities/User/userController";
import { Request, Response } from "express";
import { auth } from "../middlewares/auth";

const userRoutes = Router();
const userController = new UserController();

/**
 * @swagger
 * /api/user/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 */
userRoutes.post('/user/create', auth, (req: Request, res: Response) => {userController.createUser(req, res)});

/**
 * @swagger
 * /api/user/{username}:
 *   get:
 *     summary: Get user by username
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the user
 *     responses:
 *       200:
 *         description: User found
 */
userRoutes.get('/user/:username', auth, (req: Request, res: Response) => {userController.getUserByUsername(req, res)});

/**
 * @swagger
 * /api/user/id/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User found
 */
userRoutes.get('/user/id/:id', auth, (req: Request, res: Response) => {userController.getUserById(req, res)});

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 */
userRoutes.get('/users/all', auth, (req: Request, res: Response) => {userController.getAllUsers(req, res)});

/**
 * @swagger
 * /api/user/id/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
userRoutes.delete('/user/id/:id', auth, (req: Request, res: Response) => {userController.deleteUserById(req, res)});

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
userRoutes.post('/user/login', (req: Request, res: Response) => {userController.login(req, res)});

export default userRoutes;