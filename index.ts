import express, { Request, Response } from 'express';
import cors from 'cors';
import client from 'prom-client';
const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
import { createLogger } from "winston";
import LokiTransport from "winston-loki";

const options = {
  transports: [
    new LokiTransport({
      host: "http://127.0.0.1:3100"
    })
  ]
};
const logger = createLogger(options);

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for all origins
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  logger.info('request received');
  res.json({ message: 'Hello, World!' });
});

app.get('/slow', (req: Request, res: Response) => {
  // Randomly decide if the route succeeds or fails
  const shouldFail = Math.random() < 0.2; // 20% chance to fail

  if (shouldFail) {
      // Send a 500 error if the route fails
      logger.error('Slow route failed');
      return res.status(500).send({ error: 'An error occurred' });
  } else {
      // Simulate a delay for successful requests
      logger.info('Slow route succeeded');
      const delay = Math.floor(Math.random() * 900) + 10; // 10ms to 1000ms

      setTimeout(() => {
          res.send(`Heavy task completed in ${delay}ms`);
      }, delay);
  }
});

app.get('/metrics', async (req, res) => {
  logger.info('metrics claimed');
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
