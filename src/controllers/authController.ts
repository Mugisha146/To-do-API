import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../middleware/auth";
import User from "../models/user";

export const signup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: hashedPassword });
    await user.save();
    const token = await generateToken(user);

    res.status(201).json({
        id: user.id,
        firstName: firstName,
        lastName: lastName,
        email: user.email,
        token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send("Invalid password");
    }
    const token = await generateToken(user);

    res.status(201).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
};


    export const logoutUser = (req: Request, res: Response) => {
      res.clearCookie("token");
      res.status(200).json({ message: "User logged out successfully" });
    };
