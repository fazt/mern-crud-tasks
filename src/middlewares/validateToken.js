import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const authRequired = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization)
      return res.status(401).send("Access denied. No token provided");

    const token = authorization.split(" ")[1];

    if (!token) return res.status(401).send("Access denied. No token provided");

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
