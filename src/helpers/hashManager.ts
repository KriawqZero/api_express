import bcrypt from "bcryptjs";
import { config } from "../config";

export class HashManager {
    private rounds: number;

    constructor() {
        if (!config.bcrypt_rounds)
            throw new Error("Missing BCRYPT_COST");

        this.rounds = config.bcrypt_rounds;
    }

    public async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.rounds);
        return bcrypt.hash(password, salt);
    }

    public async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
