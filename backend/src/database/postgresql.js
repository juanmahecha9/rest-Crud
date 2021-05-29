import Sequalize from "sequelize";

 export const Sequalize =new Sequalize("postgres", "postgres", "", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000,
  },
});

