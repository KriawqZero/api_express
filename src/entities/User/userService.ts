import { CreateUserDTO, CreateUserOutputDTO } from "./user";
import { PrismaClient } from "@prisma/client";

export class UserService {
    private readonly db: PrismaClient;

    constructor() {
        this.db = new PrismaClient();
    }

    public async createUser(input: CreateUserDTO): Promise<CreateUserOutputDTO> {
        const user = await this.db.user.create({
            data: {
                name: input.name,
                username: input.username,
                password: input.password,
            },
        });

        const out: CreateUserOutputDTO = {
            name: user.name,
            username: user.username,
        };

        return out;
    }

    public async login(username: string, password: string): Promise<any> {
        return await this.db.user.findFirst({
            where: {
                username,
                password,
            },
        });
    }

    public async getUserByUsername(username: string): Promise<any> {
        return await this.db.user.findUnique({
            where: {
                username,
            },
        });
    }

    public async getUserById(id: number): Promise<any> {
        return await this.db.user.findUnique({
            where: {
                id,
            },
        });
    }

    public async deleteUserById(id: number): Promise<void> {
        await this.db.user.delete({
            where: {
                id,
            },
        });
    }

    public async getAllUsers(): Promise<any> {
        return await this.db.user.findMany();
    }
}