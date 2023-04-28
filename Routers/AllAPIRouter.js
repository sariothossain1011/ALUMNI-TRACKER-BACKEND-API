const express = require("express");
const router = express.Router();
// const multer = require("multer");
const {
  Registration,
  Login,
  GetSingleUser,
  UpdateUser,
  GetUserList,
  DeleteUser,
  TotalUserCount,
  UserRequestCount,
  UserApprovedCount,
  UserRequestList,
  UserApprovedList,
  UpdateUserStatus,
  // UserImageUpdate,
  StudentList,
  StudentCount,
  UpdateUserRole,
  TeacherCount,
  TeacherList,
  SearchByDepartment,
  SearchBySession,
  SearchByTeacherAndStudent,
  SearchByName,
  ListByComputerDepartment,
  ListByCivilDepartment,
  ListByRACDepartment,
  ListByElectricalDepartment,
  ListByTourismDepartment,
  ListByFoodDepartment,
  CountByComputerDepartment,
  CountByRACDepartment,
  CountByCivilDepartment,
  CountByElectricalDepartment,
  CountByTourismDepartment,
  CountByFoodDepartment,
  UpdateIsAdmin,
} = require("../Controllers/UserController");

const { uploadImages } = require("../Controllers/profileImageUpload");
const imageUpload = require("../Middleware/imageUpload");

// // MANAGE PHOTO WITH MULTER NPM PACKAGE
// const FILE_TYPE_MAP = {
//   "image/png": "png",
//   "image/jpeg": "jpeg",
//   "image/jpg": "jpg",
// };

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const IsValid = FILE_TYPE_MAP[file.mimetype];
//     let UploadError = new Error("Invalid Image Type ");
//     if (IsValid) {
//       UploadError = null;
//     }
//     cb(UploadError, "Public/Uploads");
//   },
//   filename: function (req, file, cb) {
//     const fileName = file.originalname.split(" ").join("-");
//     const extension = FILE_TYPE_MAP[file.mimetype];
//     cb(null, `${fileName}-${Date.now()}.${extension}`);
//   },
// });
// const UploadOptions = multer({ storage: storage });

router.post("/Registration", Registration);
router.get("/Login", Login);
router.get("/User/GetSingleUser/:id", GetSingleUser);
router.post("/User/UpdateUser/:id", UpdateUser);
// router.post(
//   "/User/UserImageUpdate/:Id",
//   UploadOptions.single("image"),
//   UserImageUpdate
// );


router.post("/Admin/DeleteUser/:Id", DeleteUser);
router.get("/User/GetUserList", GetUserList);
router.get("/User/TotalUserCount", TotalUserCount);

// CHANGE USER STATUS (REQUEST/APPROVED)
router.post("/Admin/UpdateUserStatus/:id/:status", UpdateUserStatus);

// CHANGE USER ROLE (STUDENT/TEACHER)
router.post("/Admin/UpdateUserRole/:id/:role", UpdateUserRole);

// CHANGE IS ADMIN
router.post("/Admin/UpdateIsAdmin/:id/:isAdmin", UpdateIsAdmin);

router.post("/User/profileImage", imageUpload, uploadImages);

router.post("/DeleteUser/:Id", DeleteUser);


// REQUEST COUNT AND LIST
router.get("/User/UserRequestCount", UserRequestCount);
router.get("/User/UserRequestList", UserRequestList);

// APPROVED COUNT AND LIST
router.get("/User/UserApprovedCount", UserApprovedCount);
router.get("/User/UserApprovedList", UserApprovedList);

// STUDENT COUNT AND LIST
router.get("/User/StudentCount", StudentCount);
router.get("/User/StudentList", StudentList);

// TEACHER COUNT AND LIST
router.get("/User/TeacherCount", TeacherCount);
router.get("/User/TeacherList", TeacherList);

// SEARCH BY DEPARTMENT / SESSION / (TEACHER / STUDENT) / NAME
router.get("/User/SearchByDepartment/:keyword", SearchByDepartment);
router.get("/User/SearchBySession/:session", SearchBySession);
router.get("/User/SearchByTeacherAndStudent/:keyword",SearchByTeacherAndStudent);
router.get("/User/SearchByName/:keyword", SearchByName);

//  LIST BY SINGLE DEPARTMENT
router.get("/User/ListByComputerDepartment", ListByComputerDepartment);
router.get("/User/ListByRACDepartment", ListByRACDepartment);
router.get("/User/ListByCivilDepartment", ListByCivilDepartment);
router.get("/User/ListByElectricalDepartment", ListByElectricalDepartment);
router.get("/User/ListByTourismDepartment", ListByTourismDepartment);
router.get("/User/ListByFoodDepartment", ListByFoodDepartment);

//  COUNT BY SINGLE DEPARTMENT
router.get("/User/CountByComputerDepartment", CountByComputerDepartment);
router.get("/User/CountByRACDepartment", CountByRACDepartment);
router.get("/User/CountByCivilDepartment", CountByCivilDepartment);
router.get("/User/CountByElectricalDepartment", CountByElectricalDepartment);
router.get("/User/CountByTourismDepartment", CountByTourismDepartment);
router.get("/User/CountByFoodDepartment", CountByFoodDepartment);

module.exports = router;
