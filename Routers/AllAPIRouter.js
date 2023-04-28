const express = require("express");
const router = express.Router();
const multer = require("multer");

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
} = require("../Controllers/UserController");
const { uploadImages } = require("../Controllers/profileImageUpload");
const imageUpload = require("../Middleware/imageUpload");

// MANAGE PHOTO WITH MULTER NPM PACKAGE

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
router.get("/User/GetSingleUser/:Id", GetSingleUser);
router.post("/User/UpdateUser/:Id", UpdateUser);
router.post("/User/profileImage", imageUpload, uploadImages);

// router.post(
//   "/User/UserImageUpdate/:Id",
//   UploadOptions.single("image"),
//   UserImageUpdate
// );

router.post("/User/DeleteUser/:Id", DeleteUser);
router.get("/User/GetUserList", GetUserList);
router.get("/User/TotalUserCount", TotalUserCount);

// CHANGE USER STATUS
router.post("/User/UpdateUserStatus/:id/:status", UpdateUserStatus);

// REQUEST COUNT AND LIST
router.get("/User/UserRequestCount", UserRequestCount);
router.get("/User/UserRequestList", UserRequestList);

// APPROVED COUNT AND LIST
router.get("/User/UserApprovedCount", UserApprovedCount);
router.get("/User/UserApprovedList", UserApprovedList);

module.exports = router;
