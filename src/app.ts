import express from "express";
import cors from "cors";
import "dotenv/config";
import usersRouter from "./routes/usersRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT ?? 3000;

app.use("/users", usersRouter);

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`App listening on http://localhost:${PORT}`);
});
