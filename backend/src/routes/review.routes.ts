import express from 'express';
import { addReview, updateReviewMovieId } from '@controllers/review.controller'; 

const router = express.Router();

router.post('/add-review', addReview);
router.post('/update-review', updateReviewMovieId);

export default router;
