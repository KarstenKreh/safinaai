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
  let activeServer = null;

  while (!serverStarted && currentPort < BASE_PORT + 10) {
    try {
      activeServer = await new Promise((resolve, reject) => {
        const server = app.listen(currentPort, () => {
          console.log(`Server running on port ${currentPort}`);
          serverStarted = true;
          resolve(server);
        }).on('error', (err: ServerError) => {
          if (err.code === 'EADDRINUSE') {
            currentPort++;
            resolve(null);
          } else {
            reject(err);
          }
        });
      });

      if (activeServer) {
        break;
      }
    } catch (error) {
      console.error('Error starting server:', error);
      process.exit(1);
    }
  }

  if (!serverStarted || !activeServer) {
    console.error('Could not find an available port');
    process.exit(1);
  }

  console.log(`API available at http://localhost:${currentPort}/api/send-email`);
  return activeServer;
};

const server = startServer();

export default app; 