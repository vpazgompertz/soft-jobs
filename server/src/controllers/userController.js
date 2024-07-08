import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getUserModel, createUserModel } from "../models/userModel.js";

export const getUser = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await getUserModel(email);

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};


export const createUser = async (req, res) => {
  try {
    const { email, password, rol, lenguage } = req.body;
    const newUser = await createUserModel({ email, password, rol, lenguage });
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: `Error al crear usuario: ${error.message}` });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserModel(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' }); 
      console.log("Token generado:", token);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: `Error en el login: ${error.message}` });
  }
};
