import { Request, Response } from 'express';
import prisma from '@prismaClient';

const createReview = async (req: Request, res: Response): Promise<any> => {
  const { movieId, userId, content, rating } = req.body;

  if (!movieId || !userId || !content || rating === undefined) {
    return res.status(400).json({ error: "All fields (movieId, userId, content, rating) are required" });
  }

  if (typeof rating !== 'number' || rating < 1 || rating > 10) {
    return res.status(400).json({ error: "Rating must be a number between 1 and 10" });
  }

  try {
    const movieExists = await prisma.movie.findUnique({ where: { id: movieId } });
    if (!movieExists) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingReview = await prisma.review.findFirst({
      where: { movieId, userId },
    });

    if (existingReview) {
      return res.status(400).json({ error: "User has already reviewed this movie" });
    }

    const newReview = await prisma.review.create({
      data: {
        movieId,
        userId,
        content,
        rating,
      },
    });

    return res.status(201).json(newReview);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating review:", error.message);
      return res.status(500).json({ error: "Error creating review", details: error.message });
    } else {
      console.error("Unexpected error:", error);
      return res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export { createReview };
