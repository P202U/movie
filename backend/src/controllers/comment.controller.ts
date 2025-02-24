import prisma from "@prismaClient";
import { Request, Response } from "express";

interface commentRequestBody {
    userId: string;
    movieId: string;
    content: string;
    parentId?: string;
}

const createComment = async (req: Request<{}, {}, commentRequestBody>, res: Response): Promise<any> => {
    const { userId, movieId, content, parentId } = req.body;

    try {
        const newComment = await prisma.comment.create({
            data: {
                userId,
                movieId,
                content,
                parentId: parentId || null,
            }
        })

        res.status(201).json(newComment);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
            res.status(500).json({ message: "Error creating comment", error: error.message });
        } else {
            console.error("An unknown error occurred.");
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}

const getMovieComments = async (req: Request, res: Response): Promise<any> => {
    const { movieId } = req.params;
  
    try {
      const comments = await prisma.comment.findMany({
        where: {
          movieId: movieId,
          parentId: null, 
        },
        include: {
          user: true,
          replies: {     
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc', 
        },
      });
  
      res.json(comments);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
            res.status(500).json({ message: "Error creating comment", error: error.message });
        } else {
            console.error("An unknown error occurred.");
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
  };
  

export { createComment, getMovieComments };