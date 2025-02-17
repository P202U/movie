import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import movieRoutes from '@routes/movie.routes';
import reviewRoutes from '@routes/review.routes';
import userRoutes from '@routes/user.routes';
import { authenticateJWT } from '@middleware/jwtAuth.middleware';
import path from 'path';
import cors from 'cors';
import seedAdminUser from 'seedAdminUser';

dotenv.config();

const app = express();

// Initialize database with an admin user on startup
seedAdminUser();

app.use(cors());

const port = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', authenticateJWT, reviewRoutes);
app.use('/api/auth', userRoutes);

// Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));

  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  })
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

