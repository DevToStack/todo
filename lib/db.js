import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
})

export async function query(sql, params = []) {
    const [rows] = await pool.execute(sql, params)
    return rows
}