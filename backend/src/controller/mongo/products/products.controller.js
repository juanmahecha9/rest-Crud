import Product from "../../../model/data/mongo/products/model.products";
import {
  state400,
  state500,
} from "../../../common/error/errors.register.database";

export const indexPost = async (req, res) => {
  let data = new Product(req.body);
  try {
    await data.save();
    res.send({
      message: "The product was been created",
      status: 200,
      data: data,
    });
  } catch (error) {
    res.status(500).send(state500);
    console.log(error);
  }
};

export const indexGet = async (req, res) => {
  try {
    const data = await Product.find();
    res.send(data);
  } catch (error) {
    res.status(500).send(state500);
    console.log(error);
  }
};

export const indexGetId = async (req, res) => {
  let id = req.params.id;
  const product = await Product.findById(id);
  res.send(product);
};

//Upgrade data
export const indexPut = (req, res) => {
  let Id = req.params.id;
  let newData = req.body; // in this case will can be the password
  Product.findByIdAndUpdate(Id, newData, (err, upgradeData) => {
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
export const indexDelete = (req, res) => {
  let dataId = req.params.id;
  Product.findByIdAndDelete(dataId, (err, deleteData) => {
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
export const indexDeleteAll = async (req, res) => {
  await Product.remove((err, findedData) => {
    try {
      if (!findedData) {
        res.status(200).send(errors.state400);
      } else {
        res.status(200).send({
          status: "Drop all data saved",
          Data: findedData,
          statusCode: 200,
        });
      }
    } catch (err) {
      res.status(500).send(errors.state500);
    }
  });
};
