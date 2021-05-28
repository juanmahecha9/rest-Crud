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
