import Product from "../../model/data/postgreSQL/category.model";
import { state500 } from "../../common/error/errors.register.database";

export async function createData(req, res) {
  const { name, category, quantity, price } = req.body;
  try {
    let product = await Product.create({
      name,
      category,
      quantity,
      price,
    });
    if (product) {
      res.send({ message: "The product was been created!", data: product });
    }
  } catch (e) {
    res.status(500).send(state500);
  }
}
