import jwt from "jsonwebtoken";
import { key_jwt } from "../../../security/jwt.key.json";
import User from "../../../model/data/mongo/auth/model.auth";
import errors from "../../../common/error/errors.register.database";



//Creation of users
export const createUser = async (req, res) => {
  //create with mongo
  const { name, userName, email, password } = req.body;
  const data = new User({
    name,
    userName,
    email,
    password,
  });

  await data.save((err, newData) => {
    try {
      if (!newData) {
        res.status(200).send(errors.state400);
      } else {
        const token = jwt.sign({ _id: newData._id }, key_jwt);
        res.status(200).send({
          status: "Data user was been saved into the DB",
          token: token,
          producto: newData,
          statusCode: 200,
        });
      }
    } catch (err) {
      res.status(500).send(errors.state500);
    }
  });
};

//Show users
export const showUsers = (req, res) => {
  // View de users collection
  User.find((err, findedData) => {
    try {
      if (!findedData) {
        res.status(200).send(errors.state400);
      } else {
        res.status(200).send({
          status: "User Data finded",
          Data: findedData,
          statusCode: 200,
        });
      }
    } catch (err) {
      res.status(500).send(errors.state500);
    }
  });
};

//Upgrade data users
export const modifyUser = (req, res) => {
  let Id = req.params.id;
  let newData = req.body; // in this case will can be the password
  User.findByIdAndUpdate(Id, newData, (err, upgradeData) => {
    try {
      if (!upgradeData) {
        res.status(200).send(errors.state500);
      } else {
        res.status(200).send({
          status: "Upgrade user!",
          data: newData,
          statusCode: 200,
        });
      }
    } catch (err) {
      res.status(500).send(errors.state500);
    }
  });
};

//Delete Data by ID
export const deleteUserById = (req, res) => {
  let dataId = req.params.id;
  User.findByIdAndDelete(dataId, (err, deleteData) => {
    try {
      if (!deleteData) {
        res.status(200).send(errors.state400);
      } else {
        res.status(200).send({
          status: `Delete user idetify by ID: ${dataId}`,
          Data: deleteData,
          statusCode: 200,
        });
      }
    } catch (err) {
      res.status(500).send(errors.state500);
    }
  });
};

//Delete all users
export const deleteUsers = async (req, res) => {
  await User.remove((err, findedData) => {
    try {
      if (!findedData) {
        res.status(200).send(errors.state400);
      } else {
        res.status(200).send({
          status: "Drop all users",
          Data: findedData,
          statusCode: 200,
        });
      }
    } catch (err) {
      res.status(500).send(errors.state500);
    }
  });
};

//Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send("Not registered");

  if (user) {
    user.compararPassword(password, function (err, isMatch) {
      if (err) throw err;
      if (isMatch == true) {
        const token = jwt.sign({ _id: user._id }, key_jwt);
        const name = user.name;
        // localStorage.setItem("usuario", user.name);
        return res.status(200).send({
          value: "Valid Password",
          token: token,
          name: name,
          id: user._id,
        });
      }
      if (isMatch != true) return res.status(401).send("Invalid Password");
    });
  }
};

//verify Json Web Token
export const verifyToken = (req, res, next) => {
  //create the authentication header
  if (!req.headers.authorization) {
    return res.status(401).send("No uthorized");
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token == "null") {
    return res.status(401).sen("Not authorized");
  }
  const data = jwt.verify(token, );
  req.userId = data._id;
  next();
};

