import { Request, Response } from 'express';
import prisma from '@prismaClient';

const addUserRating = async (req: Request, res: Response): Promise<any> => {
    const { movieId, userId, value } = req.body;

    try {
        // Check if the user has already rated this movie
        const existingRating = await prisma.rating.findUnique({
            where: {
                userId_movieId: {
                    userId,
                    movieId
                }
            }
        });

        if (existingRating) {
            // User has already rated, update rating
            const updatedRating = await prisma.rating.update({
                where: {
                    id: existingRating.id
                },
                data: {
                    value
                }
            });

            return res.status(200).json(updatedRating);
        } else {
            // If no rating exists, create a new one
            const newRating = await prisma.rating.create({
                data: {
                    userId,
                    movieId,
                    value
                }
            });

            return res.status(201).json(newRating);
        }

    } catch (error) {
        console.error('Error adding/updating rating:', error);
        return res.status(500).json({ error: 'Failed to add or update rating' });
    }
}


export { addUserRating };
