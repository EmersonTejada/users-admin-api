import { RequestHandler } from "express";
import { validationResult, matchedData } from "express-validator";
import { User } from "../types/user.js";
import * as userModel from "../models/userModel.js";

export const usersListGet: RequestHandler<
  {},
  { users: User[] },
  {},
  {}
> = async (_req, res) => {
  const users = await userModel.getAllUsers();
  res.json({ users });
};

export const usersCreatePost: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const user: User = await matchedData(req);
    await userModel.createUser(user);
    res.send(`Usuario Creado Exitosamente`);
  }
};

export const usersUpdateGet: RequestHandler<
  { id: string },
  { user: User }
> = async (req, res) => {
  const id = Number(req.params.id);
  const user = await userModel.getUserById(id);
  res.json({ user });
};

export const usersUpdatePost: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }

  const updatedUser: User = await matchedData(req);
  const userFromDB = await userModel.updateUser(id, updatedUser);
  res.json({
    message: "Usuario Actualizado",
    user: userFromDB,
  });
};

export const usersDeletePost: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const userDeleted = await userModel.deleteUserById(id);
  res.json({ message: "Usuario Eliminado", user: userDeleted });
};

export const usersSearchGet: RequestHandler<
  {},
  {},
  {},
  { searchQuery: string }
> = async (req, res) => {
  const { searchQuery } = req.query;
  const usersList = await userModel.searchUser(searchQuery);
  res.json({ users: usersList });
};

export const deleteAllUsersGet: RequestHandler = async (_req, res) => {
  await userModel.deleteAllUsers();
  res.json({message: `Usuarios Eliminados`})
}
