import { UserRepository } from "./userRepository";
import { CreateUserDTO, CreateUserOutputDTO } from "./user";
import { Request, Response } from "express";
import { HashManager } from "../../helpers/hashManager";
import jwt from 'jsonwebtoken';
import { config } from "../../config";
import { User } from "@prisma/client";

export class UserController {
    private readonly _userRepository: UserRepository;
    private hashManager: HashManager;

    constructor() {
        this._userRepository = new UserRepository();
        this.hashManager = new HashManager();
    }

    public async createUser(req: Request, res: Response): Promise<Response<CreateUserOutputDTO>> {
        if(!req.body.name || !req.body.username || !req.body.password) 
            return res.status(400).json({ message: "Invalid input" });

        let hashedPassword: string;

        try {
            hashedPassword = await this.hashManager.hash(req.body.password);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }

        const input: CreateUserDTO = {
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword, 
        }

        let user: CreateUserOutputDTO;

        try {
            user = await this._userRepository.createUser(input);
        } catch (error: any) {
            if(error.message === "Invalid input") 
                return res.status(400).json({ message: error.message });
            return res.status(500).json({ message: error.message });
        }

        return res.status(201).json(user);
    }

    public async login(req: Request, res: Response): Promise<Response<any>> {
        if(!req.body.username || !req.body.password) 
            return res.status(400).json({ message: "Invalid input" });

        let user: User;
        try {
            user = await this._userRepository.getUserByUsername(req.body.username);
        } catch (error: any) {
            if(error.message === "User not found") 
                return res.status(400).json({ message: error.message });
            return res.status(500).json({ message: error.message });
        }

       if(await this.hashManager.compare(req.body.password, user.password)) {
            // Gera o token JWT
           const token = jwt.sign({ id: user.id }, config.token_secret, {
               expiresIn: config.token_time, // token expira em 1 hora
           });

           return res.status(200).json({ token });
       }

       return res.status(400).json({ message: "Invalid password" });
    }

    // uso /api/user/:username
    public async getUserByUsername(req: Request, res: Response): Promise<Response<any>> {
        if(!req.params.username) return res.status(400).json({ message: "Invalid input" });

        let user: any;

        try {
            user = await this._userRepository.getUserByUsername(req.params.username);
        } catch (error: any) {
            if(error.message === "User not found") 
                return res.status(400).json({ message: error.message });
            return res.status(500).json({ message: error.message });
        }

        return res.status(200).json(user);
    }

    // uso /api/user/:id
    public async getUserById(req: Request, res: Response): Promise<Response<any>> {
        if(!req.params.id) return res.status(400).json({ message: "Invalid input" });

        let user: any;

        try {
            user = await this._userRepository.getUserById(parseInt(req.params.id));
        } catch (error: any) {
            if(error.message === "User not found") 
                return res.status(400).json({ message: error.message });
            return res.status(500).json({ message: error.message });
        }

        return res.status(200).json(user);
    }

    public async deleteUserById(req: Request, res: Response): Promise<Response<void>> {
        if(!req.params.id) return res.status(400).json({ message: "Invalid input" });

        try {
            await this._userRepository.deleteUserById(parseInt(req.params.id));
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }

        return res.status(200).json({
            id: req.params.id,
            message: `User deleted` 
        });
    } 

    public async getAllUsers(req: Request, res: Response): Promise<Response<any>> {
        let users;

        try {
            users = await this._userRepository.getAllUsers();
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }

        return res.status(200).json(users);
    }
}