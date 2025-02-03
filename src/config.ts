import dotenv from 'dotenv';

dotenv.config();

export interface Config {
    server_url: string;
    port: string;
    bcrypt_rounds: number;
    token_secret: string;
    token_time: string;
}

export const config: Config = {
    server_url: process.env.URL || 'http://localhost',
    port: process.env.PORT || '3000',
    bcrypt_rounds: Number(process.env.BCRYPT_ROUNDS || 12),
    token_secret: process.env.TOKEN_SECRET || 'secret',
    token_time: process.env.TOKEN_TIME || '15m',
};