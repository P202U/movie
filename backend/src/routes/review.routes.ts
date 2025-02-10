import express from 'express';
import { createReview } from '@controllers/review.controller'; 

const router = express.Router();

router.post('/', createReview);

export default router;
