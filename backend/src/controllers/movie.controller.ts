import { Request, Response } from 'express';
import prisma from '@prismaClient';

// Get all movies
export const getMovies = async (_req: Request, res: Response): Promise<any> => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        reviews: true,
        ratings: true,
      },
    });
    return res.json(movies);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching movies' });
  }
};

// Create a new movie
export const createMovie = async (req: Request, res: Response): Promise<any> => {
  const { title, description, imgUrl } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const newMovie = await prisma.movie.create({
      data: {
        title,
        description,
        imgUrl,
      },
    });

    return res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create movie" });
  }
};
