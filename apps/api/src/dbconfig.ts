import { Pool } from "pg";

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',  
    database: 'pingbay',
    password: 'postgres',
    port: 5432,
}); 

pool.on('connect', () => {
    console.log('Connected to PostgreSQL database');
});

pool.on('error', (err: any) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});