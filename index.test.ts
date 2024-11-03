import request from 'supertest';
import express, { Request, Response } from 'express';
import cors from 'cors';

// Set up the Express app
const app = express();
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello, World!' });
});

// Test suite for the root endpoint
describe('GET /', () => {
  it('should return 200 and a JSON response with "Hello, World!" message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello, World!' });
  });
});
