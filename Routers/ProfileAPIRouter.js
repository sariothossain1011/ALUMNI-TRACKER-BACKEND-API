const express = require("express");
const { GetSingleUser, UpdateUser } = require("../UserControllers/ProfileController");
const { RequireSignIn } = require("../Middleware/AuthMiddleware");
const { uploadImages } = require("../UserControllers/profileImageUpload");
const imageUpload = require("../Middleware/imageUpload");
const router = express.Router();




router.get("/GetSingleUser/:id",RequireSignIn, GetSingleUser);
router.post("/UpdateUser/:id",RequireSignIn, UpdateUser);
router.post("/profileImage",RequireSignIn, imageUpload, uploadImages);


module.exports = router;