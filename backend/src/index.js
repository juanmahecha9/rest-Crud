//Index file to the project
import express from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/routes";
import { middelwares } from "./lib/middlewares/middlewares";

//On/Off mongodb
import on_off from "./database/mongodb";

//network config
import network from "./config/start/network.confog";

const app = express();

//Initialization of mongoDB
on_off("ON", 1);
// 1 is to select the local db, and on is turn on the db

// concatenar el directorio de las vistas de motores de plantillas
// Load static files
app.use(express.static(path.join(__dirname, "/views")));
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "html");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:4200" }));
app.use(router);

app.set(
  "port",
  process.env.PORT ? process.env.PORT : network.port ? network.port : 3000
);
app.set(
  "bind",
  process.env.BIND
    ? process.env.BIND
    : network.bind
    ? network.bind
    : "127.0.0.1"
);
app.listen(app.get("port"), app.get("bind"), () => {
  console.log("server running at http://localhost:" + app.get("port"));
});
