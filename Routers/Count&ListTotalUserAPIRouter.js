const express = require("express");
const { RequireSignIn } = require("../Middleware/AuthMiddleware");
const { GetUserList, TotalUserCount, UserRequestCount, UserRequestList, UserApprovedCount, UserApprovedList, StudentCount, StudentList, TeacherCount, TeacherList } = require("../UserControllers/Count&ListTotalUserController");
const router = express.Router();



// TOTAL USER COUNT AND LIST
router.get("/TotalUserCount",RequireSignIn, TotalUserCount);
router.get("/GetUserList",RequireSignIn, GetUserList);

// REQUEST COUNT AND LIST
router.get("/UserRequestCount",RequireSignIn, UserRequestCount);
router.get("/UserRequestList",RequireSignIn, UserRequestList);

// APPROVED COUNT AND LIST
router.get("/UserApprovedCount",RequireSignIn, UserApprovedCount);
router.get("/UserApprovedList",RequireSignIn, UserApprovedList);

// TOTAL STUDENT COUNT AND LIST
router.get("/StudentCount",RequireSignIn, StudentCount);
router.get("/StudentList",RequireSignIn, StudentList);

// TOTAL TEACHER COUNT AND LIST
router.get("/TeacherCount",RequireSignIn, TeacherCount);
router.get("/TeacherList",RequireSignIn, TeacherList);



module.exports = router;