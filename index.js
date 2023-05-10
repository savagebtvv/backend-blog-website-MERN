import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import {
  loginValidation,
  postCreateValidation,
  regValidation,
} from "./validation.js";
import { postController, userController } from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
mongoose
  .connect(
    "mongodb+srv://savagebtvv:wwww@cluster0.ogoqzjw.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database ok!"))
  .catch((err) => console.log("Database error!", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  userController.login
);

app.post(
  "/auth/register",
  regValidation,
  handleValidationErrors,
  userController.reg
);

app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  postController.create
);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({ url: `/uploads/${req.file.originalname}` });
});

app.get("/auth/me", checkAuth, userController.getMe);

app.get("/posts", postController.getAll);

app.get("/posts/:id", postController.getOne);

app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  postController.update
);

app.delete("/posts/:id", checkAuth, postController.remove);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server ok!");
});
