import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting users" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ message: "No user ID provided" });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting user" });
  }
};


export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { firstName, lastName,email, password } = req.body;

    if (!firstName||!lastName||!email || !password) {
      return res.status(400).json({ message: "Fill all field is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.update(
      { firstName, lastName, email, password: hashedPassword },
      { where: { id: userId }, returning: true }
    );
    if (!user[1][0]) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated successfully", user: user[1][0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const user = await User.destroy({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

