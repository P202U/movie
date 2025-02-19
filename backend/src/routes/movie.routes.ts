import express from 'express';
import { getMovies, getMovieDetails, createMovie } from '@controllers/movie.controller';
import { authenticateJWT } from '@middleware/jwtAuth.middleware';

const router = express.Router();

router.get('/all-movies', getMovies);
router.get('/:movieId', getMovieDetails);
router.post('/add-movie', authenticateJWT, createMovie);

export default router;
