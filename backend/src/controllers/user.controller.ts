import { Request, Response } from 'express';
import prisma from '@prismaClient';
import argon2 from 'argon2';

const registerUser = async (req: Request, res: Response): Promise<any> => {
  const hashPassword = async (password: string) => {
    return await argon2.hash(password);
  };

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'Username or Email already in use.',
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return res.json({
      message: 'User successfully created.',
      user: {
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error registering user' });
  }
};


const loginUser = async (req: Request, res: Response): Promise<any> => {
    async function verifyPassword(storedHash: string, password: string) {
        try {
            return await argon2.verify(storedHash, password);
        } catch (error) {
            return false;
        }
    }

    const { usernameOrEmail, password } = req.body;

    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: usernameOrEmail },
                    { username: usernameOrEmail }
                ]
            }
        });

        if (user && await verifyPassword(user.password, password)) {
            return res.json({ message: 'Login successful', user: user });
        } else {
            return res.status(401).json({ error: 'Invalid email/username or password.' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error logging in user' });
    }
}


export { registerUser, loginUser }; 
