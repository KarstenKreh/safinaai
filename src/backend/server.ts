import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendEmail } from './api/send-email';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/send-email', sendEmail);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 