import jwt from 'jsonwebtoken';

export const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    console.error("Token no proporcionado");
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  console.log("Token recibido:", token); 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decodificado:", decoded); 
    req.user = decoded;
    console.log("Usuario añadido:", req.user); 
    next();
  } catch (error) {
    console.error('Error en la verificación:', error);
    console.error('Token expirado en:', error.expiredAt); 
    return res.status(401).json({ error: 'Token inválido' });
  }
};


