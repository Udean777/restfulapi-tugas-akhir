import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const { verify } = jwt;

dotenv.config();

export const verifyToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    verify(token, process.env.JSON_WEB_TOKEN, (err, decoded) => {
      if (err) {
        res.json({
          mssg: "Invalid token",
        });
      } else {
        next();
      }
    });
  } else {
    res.json({
      mssg: "Access denied",
    });
  }
};
