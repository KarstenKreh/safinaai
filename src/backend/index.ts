import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendEmail } from './api/send-email.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/send-email', sendEmail);




export default app; 