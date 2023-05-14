const express = require("express");
const { RequireSignIn, IsAdmin } = require("../Middleware/AuthMiddleware");
const { DeleteUser, UpdateUserStatus, UpdateUserRole, UpdateIsAdmin } = require("../Controllers/AdminController");
const { AdminList } = require("../Controllers/AdminController");
const router = express.Router();



router.post("/DeleteUser/:id",RequireSignIn,IsAdmin, DeleteUser);

// CHANGE USER STATUS (REQUEST/APPROVED)
router.post("/UpdateUserStatus/:id/:status",RequireSignIn,IsAdmin, UpdateUserStatus);

// CHANGE USER ROLE (STUDENT/TEACHER)
router.post("/UpdateUserRole/:id/:role",RequireSignIn,IsAdmin, UpdateUserRole);

// CHANGE IS ADMIN
router.post("/UpdateIsAdmin/:id/:isAdmin",RequireSignIn,IsAdmin, UpdateIsAdmin);

//  ADMIN LIST 
router.get("/AdminList",RequireSignIn,IsAdmin, AdminList);

router.get("/auth-check", RequireSignIn, (req, res) => {
    res.json({ ok: true });
  });
  router.get("/admin-check", RequireSignIn, IsAdmin, (req, res) => {
    res.json({ ok: true });
  });


module.exports = router;