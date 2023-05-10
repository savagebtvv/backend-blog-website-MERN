import { body } from "express-validator";

export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен состоять как минимум из 5 символов").isLength(
    { min: 5 }
  ),
];

export const regValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен состоять как минимум из 5 символов").isLength(
    { min: 5 }
  ),
  body("fullName", "Укажите имя").isLength({ min: 3 }),
  body("avatarUrl", "Неверная ссылка на изображение профиля")
    .optional()
    .isURL(),
];

export const postCreateValidation = [
  body("title", "Введите заголовок статьи").isLength({ min: 3 }).isString(),
  body("text", "Введите текст статьи").isLength({ min: 10 }).isString(),
  body("tags", "Неверный формат тегов (укажите массив)").optional().isArray(),
  body("imageUrl", "Неверная ссылка на изображение").optional().isString(),
];
