const express = require("express");
const { RequireSignIn } = require("../Middleware/AuthMiddleware");
const { SearchByDepartment, SearchBySession, SearchByTeacherAndStudent, SearchByName } = require("../UserControllers/SearchController");
const router = express.Router();


// SEARCH BY DEPARTMENT / SESSION / (TEACHER / STUDENT) / NAME
router.get("/SearchByDepartment/:keyword",RequireSignIn, SearchByDepartment);
router.get("/SearchBySession/:session",RequireSignIn, SearchBySession);
router.get(
  "/SearchByTeacherAndStudent/:keyword",RequireSignIn,
  SearchByTeacherAndStudent
);
router.get("/SearchByName/:keyword",RequireSignIn, SearchByName);





module.exports = router;