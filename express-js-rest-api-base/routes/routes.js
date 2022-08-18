const express = require("express")
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController")
router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.put('/user', UserController.update);
router.delete('/user/:id', UserController.deleteById);
router.get('/user', UserController.getAll);
router.get('/user/:id', UserController.getById);
module.exports = router;