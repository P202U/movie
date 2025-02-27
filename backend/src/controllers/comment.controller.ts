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

    return res.status(201).json({ message: 'Comment succesfully added', newComment });
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
  const movieId = req.query.movieId as string;

  if (!movieId) {
    return res.status(400).json({ message: "Movie ID is required." });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: {
        movieId: movieId,
        parentId: null,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        replies: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return res.json({ message: 'Comments successfully retrieved', comments });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return res.status(500).json({ message: "Error retrieving comments", error: error.message });
    } else {
      console.error("An unknown error occurred.");
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};


const deleteComment = async (req: Request, res: Response): Promise<any> => {
  const { commentId } = req.params;

  const deletedComment = await prisma.comment.update({
    where: { id: commentId },
    data: { deleted: true },
  });

  return res.json(deletedComment);
}

const editComment = async (req: Request, res: Response): Promise<any> => {
  const { commentId, content } = req.body;

  const editedComment = await prisma.comment.update({
    where: { id: commentId },
    data: { content: content }
  })

  return res.json(editedComment);
}

export { createComment, getComments, deleteComment, editComment };