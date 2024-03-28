const express = require("express");
const { CreateBlog, UpdateBlog, GetBlog, DeleteBlog } = require("../Controllers/BlogController");
const { RequireSignIn } = require("../Middleware/AuthMiddleware");

const router = express.Router();


router.post("/create-blog",RequireSignIn, CreateBlog);
router.get("/get-blog/:id",RequireSignIn, GetBlog);
router.put("/update-blog/:id",RequireSignIn, UpdateBlog);
router.delete("/delete-blog/:id",RequireSignIn, DeleteBlog);







module.exports = router;