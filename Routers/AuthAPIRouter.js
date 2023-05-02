const express = require("express");
const { Registration, Login } = require("../UserControllers/AuthController");
const router = express.Router();


router.post("/Registration", Registration);
router.post("/Login", Login);






module.exports = router;