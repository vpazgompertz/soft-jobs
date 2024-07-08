export const report = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message || 'Error en el servidor' });
  };
  