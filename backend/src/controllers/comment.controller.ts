import prisma from "@prismaClient";
import { Request, Response } from "express-serve-static-core";

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

        return res.status(201).json(newComment);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Error creating comment", error: error.message });
        } else {
            console.error("An unknown error occurred.");
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}

const getComments = async (req: Request, res: Response): Promise<any> => {
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
  
      return res.json(comments);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Error creating comment", error: error.message });
        } else {
            console.error("An unknown error occurred.");
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }
  };
  

export { createComment, getComments };