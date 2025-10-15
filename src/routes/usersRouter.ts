import { Router } from "express";
import * as usersController from "../controllers/usersController.js";
import { validateUser } from "../middlewares/validateUser.js";

const usersRouter = Router();

usersRouter.get("/", usersController.usersListGet);
usersRouter.post("/create", validateUser, usersController.usersCreatePost);
usersRouter.get("/search", usersController.usersSearchGet);
usersRouter.get("/:id/update", usersController.usersUpdateGet);
usersRouter.post("/:id/update", validateUser, usersController.usersUpdatePost);
usersRouter.post("/:id/delete", usersController.usersDeletePost);
usersRouter.get("/delete", usersController.deleteAllUsersGet)

export default usersRouter;
