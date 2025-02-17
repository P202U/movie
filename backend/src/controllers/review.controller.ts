import { Request, Response } from 'express';
import prisma from '@prismaClient';

const addReview = async (req: Request, res: Response): Promise<any> => {
  const { movieId, content, rating, userId } = req.body;

  // Input validation
  if (!userId) return res.status(400).json({ error: 'Invalid userId' });
  if (!content) return res.status(400).json({ error: 'Invalid content' });

  const parsedRating = parseInt(rating);
  if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 10) {
    return res.status(400).json({ error: 'Rating must be a number between 1 and 10' });
  }

  try {
    // Check if the user exists (admin)
    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      return res.status(404).json({ error: 'Admin user not found' });
    }

    let reviewData: any = {
      content,
      rating: parsedRating,
      userId,
    };

    // Create the review
    const newReview = await prisma.review.create({
      data: reviewData,
    });

    return res.status(201).json(newReview);
  } catch (error) {
    console.error('Error creating review:', error);
    return res.status(500).json({ error: 'Failed to create review' });
  }
};

const updateReviewMovieId = async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const { movieId } = req.body;

  try {
    // Update the review to associate with the movie
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: { movieId },
    });

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update review' });
  }
};

export { addReview, updateReviewMovieId };
