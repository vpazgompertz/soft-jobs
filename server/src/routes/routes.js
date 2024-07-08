import { Router } from 'express';
import { getUser, createUser, loginUser } from '../../src/controllers/userController.js';
import { validateToken } from '../../middlewares/validateToken.js';
import { validateUser } from '../../middlewares/validateUser.js';

const router = Router();

router.get('/', (req, res) => {
    res.send('Bienvenido a la API');
});

router.post('/usuarios', validateUser, createUser);
router.post('/login', loginUser);
router.get('/usuarios', validateToken, getUser);

export default router;
