import { Request, Response } from "express";
import Task from "../models/task";

export const getTasks = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const tasks = await Task.findAll({ where: { userId } });
  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { title, description } = req.body;
  const task = await Task.create({ userId, title, description });
  res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const task = await Task.findByPk(id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  if (title) task.title = title;
  if (description) task.description = description;
  if (completed !== undefined) task.completed = completed;

  await task.save();
  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  await task.destroy();
  res.json({ message: "Task deleted" });
};
