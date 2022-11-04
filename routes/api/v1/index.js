const userController = require("../../../controllers/user.controller");
const express = require("express");

const router = express.Router();

router.post("/users/add", userController.createUser);
router.put("/users/update/:id", userController.updateUser);
router.delete("/users/delete/:id", userController.deleteUser);
router.get("/users/all", userController.getAllUsers);
router.get("/users/:id", userController.getUserbyID);

router.get("/notifications/unsent", userController.getNotifications);

module.exports = router;
