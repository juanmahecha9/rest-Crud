import express from "express";
const router = express.Router();

//Configuration of routes into the project
import indexCtrl from "../controller/render.index.controller";
//Import rutes test mongoDB
import {
  testDbPost,
  testDbGet,
} from "../controller/mongo/test/data.contoller.test";
//Import routes products mongoDb
import {
  indexPost,
  indexGet,
} from "../controller/mongo/products/products.controller";

//varibale to api init in authtentication rules
const mongoRoute = "/api/rest/mongo";

//Test
router.get("/", indexCtrl.renderYuem);
router.get("/yuem", indexCtrl.response);
router.get("/testGetMongoDb", testDbGet);
router.post("/testPostMongoDb", testDbPost);

//mongo
router.post(`${mongoRoute}/create`, indexPost);
router.get(`${mongoRoute}/show`, indexGet);

module.exports = router;
