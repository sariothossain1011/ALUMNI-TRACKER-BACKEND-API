const express = require("express");
const {
  GetSingleUser,
  UpdateUser,
} = require("../UserControllers/ProfileController");
const { RequireSignIn } = require("../Middleware/AuthMiddleware");
const router = express.Router();

router.get("/GetSingleUser/:id", RequireSignIn, GetSingleUser);
router.post("/UpdateUser/:id", RequireSignIn, UpdateUser);

module.exports = router;
