const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/login",  userController.userLogin)
router.post("/register",  userController.userRegister)
router.post("/cancel",  userController.userCancel)
router.post("/update", userController.userUpdate)
router.delete("/delete",  userController.userDelete)
router.get("/detail",  userController.userInfo)

module.exports = router;