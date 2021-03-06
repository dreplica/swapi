import connect, { sql } from '@databases/pg';
import dotenv from 'dotenv'
dotenv.config()

const db = connect();

const initializeDB = () => {
	console.log('Database created');
	db.query(sql`SELECT 1=1`);
	console.log('Database started');
};

export default {
	db,
	sql,
	initializeDB
};
