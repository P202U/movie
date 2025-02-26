import express from 'express';
import { createComment, getComments, deleteComment, editComment } from '@controllers/comment.controller';
import { authenticateJWT } from '@middleware/jwtAuth.middleware';

const router = express.Router();

router.post('/create-comment', authenticateJWT, createComment);
router.get('/:movieId', authenticateJWT, getComments);
router.delete('/:commentId', authenticateJWT, deleteComment);
router.patch('/:commentId', authenticateJWT, editComment);

export default router;
