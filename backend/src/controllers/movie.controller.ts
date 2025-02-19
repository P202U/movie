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
                ratings: true,  // Including ratings to calculate average
            },
            orderBy: {
              createdAt: 'desc',
            }
        });

        // Calculate the average user rating for each movie
        const moviesWithAvgRating = movies.map(movie => {
            const totalUserRatings = movie.ratings.length;
            let averageUserRating = 0;

            if (totalUserRatings > 0) {
                const sumOfRatings = movie.ratings.reduce((sum, rating) => sum + rating.value, 0);
                averageUserRating = sumOfRatings / totalUserRatings;
            }

            return {
                ...movie,
                averageUserRating, // Include average user rating in movie data
            };
        });

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


// Get movie details, including user ratings and admin rating
const getMovieDetails = async (req: Request, res: Response): Promise<any> => {
    const { movieId } = req.params;

    try {
        // Fetch movie with associated ratings
        const movie = await prisma.movie.findUnique({
            where: { id: movieId },
            include: {
                ratings: true, 
            },
        });

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // Average user rating
        const totalUserRatings = movie.ratings.length;
        let averageUserRating = 0;

        if (totalUserRatings > 0) {
            const sumOfRatings = movie.ratings.reduce((sum, rating) => sum + rating.value, 0);
            averageUserRating = sumOfRatings / totalUserRatings;
        }

        const movieDetails = {
            ...movie,
            averageUserRating,
        };

        return res.status(200).json(movieDetails);
    } catch (error) {
        console.error('Error fetching movie details:', error);
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
  
      return res.status(201).json(newMovie);
    } catch (error) {
      console.error('Error creating movie:', error);
      return res.status(500).json({ error: "Failed to create movie", details: error });
    }
  };
  

export { getMovies, getMovieDetails, createMovie };
