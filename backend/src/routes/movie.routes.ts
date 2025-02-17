import express from 'express';
import { getMovies, createMovie } from '@controllers/movie.controller';
import { authenticateJWT } from '@middleware/jwtAuth.middleware';

const router = express.Router();

router.get('/all-movies', getMovies);
router.post('/add-movie', authenticateJWT, createMovie);

export default router;
