export const request = (req, res, next) => {
  req.start = Date.now();  
  console.log(`Started ${req.method} ${req.url} for ${req.ip} at ${new Date(req.start)}`); 

  res.on('finish', () => {
    const duration = Date.now() - req.start; 
    console.log(`Completed: ${res.statusCode} message: ${res.statusMessage} Time response: ${duration} ms Request ID: [${req.id || 'N/A'}]`); 
  });

  next();
};
