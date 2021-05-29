import Sequalize from "sequelize";
import { Sequalize } from "../../../database/postgresql";

sequelize.define("product", {
  id: {
    type: Sequalize.NUMBER,
    primaryKey: true,
  },
  name: { type: Sequalize.TEXT },
  category: { type: Sequalize.TEXT },
  quantity: { type: Sequalize.NUMBER },
  price: { type: Sequalize.NUMBER },
});
