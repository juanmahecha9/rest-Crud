//Index file to the project
import express from "express";
import morgan from "morgan";
import cors from "cors";

//Routes
import router from "../../routes/routes";
export function middelwares(app) {
 
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cors({ origin: "http://localhost:4200" }));
  app.use(router);
}
