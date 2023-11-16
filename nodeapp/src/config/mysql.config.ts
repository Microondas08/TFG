import dotenv from 'dotenv';
import { createPool } from "mysql2/promise";

dotenv.config();
export const connection = async() => {

    const pool = await createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        port: 3306 || process.env.DB_PORT,
        //open connections
        connectionLimit: 10 || process.env.DB_CONNECTION_LIMIT
    });

    return pool;
}