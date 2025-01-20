import { UserService } from "./userService";
import { CreateUserDTO, CreateUserOutputDTO } from "./user";
import { HashManager } from "../../helpers/hashManager";

export class UserRepository {
    private readonly _userService: UserService;

    constructor() {
        this._userService = new UserService();
    }

    public async createUser(login: CreateUserDTO): Promise<CreateUserOutputDTO> {
        if(!login.name || !login.username || !login.password) 
            throw new Error("Invalid input");

        return await this._userService.createUser(login);
    }

    public async getUserByUsername(username: string): Promise<any> {
        if(!username) throw new Error("Invalid input");

        const user = await this._userService.getUserByUsername(username);

        if (!user) throw new Error("User not found");

        return user;
    }

    public async getUserById(id: number): Promise<any> {
        if(!id) throw new Error("Invalid input");

        const user = await this._userService.getUserById(id);

        if (!user) throw new Error("User not found");

        return user;
    }

    public async deleteUserById(id: number): Promise<void> {
        if(!id) throw new Error("Invalid input");

        await this._userService.deleteUserById(id);
    }

    public async getAllUsers(): Promise<any> {
        return await this._userService.getAllUsers();
    }
}