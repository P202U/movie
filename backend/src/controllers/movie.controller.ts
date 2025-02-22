import { Request, Response } from 'express';
import prisma from '@prismaClient';

// Get all movies (without review)
const getMovies = async (req: Request, res: Response): Promise<any> => {
  const { page = 1, limit = 10 } = req.query; // Pagination: default page = 1, limit = 10

  try {
    const movies = await prisma.movie.findMany({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      select: {
        id: true,
        title: true,
        releaseYear: true,
        description: true,
        category: true,
        genre: true,
        imgUrl: true,
        adminRating: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    // Fetch the average ratings for each movie
    const moviesWithAvgRatingPromises = movies.map(async (movie) => {
      const ratingData = await prisma.rating.aggregate({
        _avg: {
          value: true,
        },
        where: {
          movieId: movie.id,
        },
      });

      const averageUserRating = ratingData._avg.value || 0;

      return {
        ...movie,
        averageUserRating,
      };
    });

    const moviesWithAvgRating = await Promise.all(moviesWithAvgRatingPromises);

    const totalMovies = await prisma.movie.count();

    return res.json({
      movies: moviesWithAvgRating,
      totalMovies,
      totalPages: Math.ceil(totalMovies / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching movies' });
  }
};


// Get a movie's details
const getMovieDetails = async (req: Request, res: Response): Promise<any> => {
  const { movieId } = req.params;
  const { userId } = req.query;  

  try {
    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const ratingData = await prisma.rating.aggregate({
      _avg: {
        value: true,
      },
      where: {
        movieId,
      },
    });

    const averageUserRating = ratingData._avg.value || 0;

    let userRating = null;
    if (userId) {
      const userRatingData = await prisma.rating.findUnique({
        where: {
          userId_movieId: {
            userId: String(userId),  // Ensure userId is a string
            movieId,
          },
        },
      });

      userRating = userRatingData ? userRatingData.value : null;
    }

    const movieDetails = {
      ...movie,
      averageUserRating,
      userRating,
    };

    return res.status(200).json({
      message: 'Movie details fetched successfully',
      movie: movieDetails,
    });
    
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching movie details' });
  }
};


// Create a new movie
const createMovie = async (req: Request, res: Response): Promise<any> => {
  const { title, description, imgUrl, releaseYear, category, genre, review, adminRating } = req.body;

  // Basic validation for required fields
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  // Ensure imgUrl is a valid string
  if (imgUrl && typeof imgUrl !== 'string') {
    return res.status(400).json({ error: "Invalid image URL" });
  }

  // Genre should be an array of strings
  if (!Array.isArray(genre)) {
    return res.status(400).json({ error: "Genre should be an array" });
  }

  // Ensure releaseYear and category are provided
  if (!releaseYear || !category) {
    return res.status(400).json({ error: "Release year and category are required" });
  }

  // Convert adminRating to float or provide a default value of 0
  const rating = adminRating ? Math.round(parseFloat(adminRating) * 10) / 10 : 0;

  try {
    // Create a new movie
    const newMovie = await prisma.movie.create({
      data: {
        title,
        description,
        imgUrl,
        releaseYear,
        category,
        genre,
        adminRating: rating,
        review,
      },
    });

    return res.status(201).json({
      message: 'Movie created successfully',
      movie: newMovie, 
    });
    
  } catch (error) {
    console.error('Error creating movie:', error);
    return res.status(400).json({error: 'Error creating movie'})
  }
};


export { getMovies, getMovieDetails, createMovie };
