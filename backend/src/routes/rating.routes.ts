import express from 'express';
import { addUserRating } from '@controllers/rating.controller';
import { authenticateJWT } from '@middleware/jwtAuth.middleware';

const router = express.Router();

router.post('/add-user-rating', authenticateJWT, addUserRating);

export default router;
