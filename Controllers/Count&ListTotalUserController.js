const UserModel = require("../Models/UserModel");

// GET Get User List  API
exports.GetUserList = async (req, res) => {
  try {
    const userList = await UserModel.find().select("name email phone");
    if (!userList) {
      res.status(500).json({ success: false });
    } else {
      res.send(userList);
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
// Total User Count API
exports.TotalUserCount = async (req, res) => {
  try {
    const userCount = await UserModel.countDocuments();
    if (!userCount) {
      res.status(500).json({ success: false });
    } else {
      res.status(200).send({ count: userCount });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

// USER REQUEST API
exports.UserRequestCount = async (req, res) => {
  try {
    const RequestCount = await UserModel.countDocuments({ status: "Request" });
    if (!RequestCount) {
      res.status(500).json({ success: false });
    } else {
      res.status(200).json({ RequestCount });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
// USER REQUEST LIST API
exports.UserRequestList = async (req, res) => {
  try {
    const RequestList = await UserModel.find({ status: "Request" });
    if (!RequestList) {
      res
        .status(500)
        .json({ success: false, message: "Not found Request List" });
    } else {
      res.status(200).json({ RequestList });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

// USER REQUEST COUNT API
exports.UserApprovedCount = async (req, res) => {
  try {
    const ApprovedCount = await UserModel.countDocuments({
      status: "Approve",
    });
    if (!ApprovedCount) {
      res.status(500).json({ success: false });
    } else {
      res.status(200).json({ ApprovedCount });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
// USER APPROVED LIST
exports.UserApprovedList = async (req, res) => {
  try {
    const ApprovedList = await UserModel.find({ status: "Approve" });
    if (!ApprovedList) {
      res
        .status(500)
        .json({ success: false, message: "Not found Approved List" });
    } else {
      res.status(200).json({ ApprovedList });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

// USER STUDENT LIST API
exports.StudentList = async (req, res) => {
  try {
    const StudentList = await UserModel.find({ role: "student" });
    if (!StudentList) {
      res
        .status(500)
        .json({ success: false, message: "Not found Student List" });
    } else {
      res.status(200).json({ StudentList });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
// USER STUDENT COUNT API
exports.StudentCount = async (req, res) => {
  try {
    const StudentCount = await UserModel.countDocuments({ role: "student" });
    if (!StudentCount) {
      res.status(500).json({ success: false });
    } else {
      res.status(200).json({ StudentCount });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

// USER TEACHER LIST API
exports.TeacherList = async (req, res) => {
  try {
    const TeacherList = await UserModel.find({ role: "teacher" });
    if (!TeacherList) {
      res
        .status(500)
        .json({ success: false, message: "Not found Teacher List" });
    } else {
      res.status(200).json({ TeacherList });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
// USER TEACHER COUNT API
exports.TeacherCount = async (req, res) => {
  try {
    const TeacherCount = await UserModel.countDocuments({
      role: "teacher",
    });
    if (!TeacherCount) {
      res.status(500).json({ success: false });
    } else {
      res.status(200).json({ TeacherCount });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
