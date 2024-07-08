import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import routes from './src/routes/routes.js';
import { request } from './middlewares/request.js';
import { report } from './middlewares/reportError.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(request);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client')));

app.use('/', routes);

app.use(report);

app.listen(PORT, () => {
    console.log(`Servidor encendido en http://localhost:${PORT}`);
});
