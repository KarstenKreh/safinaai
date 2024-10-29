import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendEmail } from './api/send-email.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/send-email', sendEmail);

interface ServerError extends Error {
  code?: string;
}

const startServer = async () => {
  const BASE_PORT = 3001;
  let currentPort = BASE_PORT;
  let serverStarted = false;

  while (!serverStarted && currentPort < BASE_PORT + 10) {
    try {
      let server: any;
      await new Promise((resolve, reject) => {
        server = app.listen(currentPort, () => {
          console.log(`Server running on port ${currentPort}`);
          serverStarted = true;
          resolve(true);
        }).on('error', (err: ServerError) => {
          if (err.code === 'EADDRINUSE') {
            currentPort++;
            resolve(false);
          } else {
            reject(err);
          }
        });
      });
    } catch (error) {
      console.error('Error starting server:', error);
      process.exit(1);
    }
  }

  if (!serverStarted) {
    console.error('Could not find an available port');
    process.exit(1);
  }

  console.log(`API available at http://localhost:${currentPort}/api/send-email`);
};

startServer();

export default app; 