import { pool } from "../db/index.js";
import { User } from "../types/user.js";

const camelCaseFormat = `id, first_name AS "firstName", last_name AS "lastName", email, created_at AS "createdAt"`

export const createUser = async (user: User) => {
  await pool.query(
    "INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3)",
    [user.firstName, user.lastName, user.email]
  );
};

export const getAllUsers = async (): Promise<User[]> => {
  const result = await pool.query(`SELECT ${camelCaseFormat} FROM users`);
  return result.rows;
};

export const getUserById = async (id: number): Promise<User> => {
  const result = await pool.query(`SELECT ${camelCaseFormat} FROM users WHERE id = $1`, [id]);
  return result.rows[0];
};

export const updateUser = async (id: number, user: User): Promise<User> => {
  const result = await pool.query(
    `UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING ${camelCaseFormat}`,
    [user.firstName, user.lastName, user.email, id]
  );
  return result.rows[0];
};

export const deleteUserById = async (id: number): Promise<User> => {
  const result = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING ${camelCaseFormat}`,
    [id]
  );
  return result.rows[0];
};

export const searchUser = async (searchQuery: string): Promise<User[]> => {
  const result = await pool.query(
    `SELECT ${camelCaseFormat} FROM users WHERE first_name ILIKE $1 OR last_name ILIKE $1 OR email ILIKE $1`,
    [`%${searchQuery}%`]
  );
  return result.rows;
};

export const deleteAllUsers = async (): Promise<User[]> => {
    const result = await pool.query(`TRUNCATE TABLE users RESTART IDENTITY`)
    return result.rows
}