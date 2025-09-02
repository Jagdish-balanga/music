import express from 'express';
import uploadsRouter from './routes/uploads';

const app = express();
app.use(express.json());
app.use('/uploads', uploadsRouter);

app.listen(4000, () => console.log('API running on http://localhost:4000'));
