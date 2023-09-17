import {
  create,
  get,
  getById,
  update,
  deleteU,
  getByEmail,
} from "./userService.js";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const { sign } = jwt;

dotenv.config();

export const createUser = (req, res) => {
  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  create(body, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        mssg: "Database connection error",
      });
    }
    return res.status(200).json({
      data: results,
    });
  });
};

export const getUserById = (req, res) => {
  const id = req.params.id;
  getById(id, (err, results) => {
    if (err) {
      console.error(err);
      err;
    }
    if (!results) {
      return res.json({
        mssg: "Record not found",
      });
    }
    return res.json({
      data: results,
    });
  });
};

export const getUsers = (req, res) => {
  get((err, results) => {
    if (err) {
      console.error(err);
      return;
    }

    return res.json({
      data: results,
    });
  });
};

export const updateUsers = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;

  if (password) {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    const updatedUserData = {
      id,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    update(updatedUserData, (err, results) => {
      if (err) {
        console.error(err);
        return;
      }
      if (!results) {
        return res.json({
          mssg: "Failed to update user",
        });
      }
      return res.json({
        mssg: "Updated successfully",
      });
    });
  }
};

export const deleteUser = (req, res) => {
  const id = req.params.id;
  deleteU(id, (err, results) => {
    if (err) {
      console.error(err);
      return;
    }

    if (!results) {
      return res.json({
        mssg: "Record not found",
      });
    }

    return res.json({
      mssg: "User deleted successfully",
    });
  });
};

export const login = (req, res) => {
  const body = req.body;
  getByEmail(body.email, (err, results) => {
    if (err) {
      console.error(err);
    }
    if (!results) {
      return res.json({
        mssg: "Invalid email or password",
      });
    }
    const result = compareSync(body.password, results.password);
    if (result) {
      results.password = undefined;
      const jsontoken = sign({ result: results }, process.env.JSON_WEB_TOKEN, {
        expiresIn: "7d",
      });
      return res.json({
        mssg: "Succesfully Login",
        token: jsontoken,
      });
    } else {
      return res.json({
        mssg: "Invalid email or password",
      });
    }
  });
};
