import { pool } from "../../database/config.js";
import bcrypt from "bcryptjs";

// GET
export const getUserModel = async (email) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al obtener un usuario: ${error.message}`);
  }
};

// POST
export const createUserModel = async ({ email, password, rol, lenguage }) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const SQLquery = {
    text: 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *',
    values: [email, hashedPassword, rol, lenguage],
  };

  try {
    const response = await pool.query(SQLquery);
    return response.rows[0];
  } catch (error) {
    throw new Error(`Error al crear el usuario: ${error.message}`);
  }
};
