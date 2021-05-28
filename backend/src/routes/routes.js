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
  indexPut,
  indexDelete,
  indexDeleteAll,
} from "../controller/mongo/products/products.controller";
//Import routes auth mongoDb
import {
  createUser,
  deleteUserById,
  deleteUsers,
  login,
  modifyUser,
  showUsers,
  verifyToken,
} from "../controller/mongo/auth/auth.controller";

//varibale to api init in authtentication rules
const mongoRoute = "/api/rest/mongo";

//Proxy router
router.get("/store/home", (req,res)=>{
  res.send("In home page.")
})

//Test
router.get("/", indexCtrl.renderYuem);
router.get("/yuem", indexCtrl.response);
router.get("/testGetMongoDb", testDbGet);
router.post("/testPostMongoDb", testDbPost);

//mongo product
router.get(`${mongoRoute}/get`, indexGet);
router.post(`${mongoRoute}/post`, indexPost);
router.put(`${mongoRoute}/put/:id`, indexPut);
router.delete(`${mongoRoute}/delete/:id`, indexDelete);
router.delete(`${mongoRoute}/delete`, indexDeleteAll);

//mongo auth
router.get(`${mongoRoute}/auth/get`, showUsers);
router.post(`${mongoRoute}/auth/post`, createUser);
router.delete(`${mongoRoute}/auth/delete/:id`, deleteUserById);
router.delete(`${mongoRoute}/auth/delete`, deleteUsers);
router.post(`${mongoRoute}/auth/login`, login);

module.exports = router;
