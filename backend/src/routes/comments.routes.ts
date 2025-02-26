import express from 'express';
import { createComment, getComments } from '@controllers/comment.controller';
import { authenticateJWT } from '@middleware/jwtAuth.middleware';

const router = express.Router();

router.post('/create-comment', authenticateJWT, createComment);
router.get('/:movieId', getComments);

export default router;
