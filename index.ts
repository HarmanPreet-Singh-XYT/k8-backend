import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for all origins
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello, World!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
