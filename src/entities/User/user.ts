export interface User {
    id: number;
    name: string;
    username: string;
    password: string;
}

export interface CreateUserDTO {
    name: string;
    username: string;
    password: string;
}

export interface CreateUserOutputDTO {
    name: string;
    username: string;
}

export interface LoginInputDTO {
    username: string;
    password: string;
}
