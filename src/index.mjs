import express from 'express';
import { routes } from './routes/index.mjs';

const app = express();

app.use(express.json())
app.use(routes)

const PORTA = 5050
app.listen(PORTA,() => console.log(`Server up => http://localhost:${PORTA}`))