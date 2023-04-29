const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// USERS REGISTRATION API
exports.Registration = async (req, res) => {
  try {
    const existUser = await UserModel.findOne({ email: req.body.email });
    if (existUser) {
      return res
        .status(400)
        .json({ message: "This email already exist. Try another one." });
    }

    const userItem = await UserModel({
      name: req.body.name,
      fatherName: "",
      motherName: "",
      rollNumber: req.body.roll,
      registrationNumber: req.body.registration,
      email: req.body.email,
      session: "",
      mobile: req.body.mobile,
      whatsappNumber: "",
      facebookLink: "",
      password: bcrypt.hashSync(req.body.password, 10),
      companyName: "",
      jobPosition: "",
      jobLocation: "",
      role: req.body.role,
      isAdmin: false,
    });

    const user = await userItem.save();
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Registration fail" });
    }
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "3d" }
    );
    res.status(200).json({
      id: user._id,
      image: user.image,
      name: user.name,
      token: token,
      email: user.email,
      role: user.role,
      status: user.status,
      isAdmin: user.isAdmin,
      message: "success",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

// USERS LOGIN API
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json("This user not found");
    }
    const check = await bcrypt.compareSync(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid credentials. Please try again",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "3d" }
    );

    res.send({
      id: user._id,
      image: user.image,
      name: user.name,
      token: token,
      email: user.email,
      role: user.role,
      status: user.status,
      isAdmin: user.isAdmin,
      message: "success",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

// GET SINGLE USER  API
exports.GetSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id).select("-password");
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "The user is not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

// // GET UPDATE USER  API
exports.UpdateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const postBody = req.body;
    const user = await UserModel.findByIdAndUpdate(id, postBody, {
      new: true,
    }).select("-password");
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "The user not update !" });
    }
    res.status(200).json({
      id: user._id,
      image: user.image,
      name: user.name,
      token: token,
      email: user.email,
      role: user.role,
      status: user.status,
      isAdmin: user.isAdmin,
      message: "success",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

// // Create Product API
// exports.UserImageUpdate = async (req, res) => {
//   try {
//     const file = req.file;
//     if (!file) return res.status(400).send("No image in the request");
//     const fileName = req.file.filename;
//     const BasePath = `${req.protocol}://${req.get("host")}/Public/Uploads/`; //"http://localhost:3000/Public/Upload/

//     const user = await UserModel.updateOne({
//       image: `${BasePath}${fileName}`, //"http://localhost:3000/Public/Upload/image-210423"
//     });
//     if (!user) {
//       return res
//         .status(400)
//         .send({ success: false, message: "Image update fail " });
//     }
//     return res
//       .status(200)
//       .json({ success: true, message: "Image update Success " });
//   } catch (error) {
//     return res.status(400).json({ success: false, message: error });
//   }
// };

// Delete User API
exports.DeleteUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.Id);
    if (!user) return res.status(400).send("Invalid User");
    await UserModel.deleteOne({ id: req.params.Id }).then((user) => {
      if (user) {
        return res
          .status(200)
          .send({ success: true, message: "User is deleted!" });
      } else {
        return res
          .status(400)
          .send({ success: false, message: "User delete fail!" });
      }
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

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
      status: "Approved",
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
    const ApprovedList = await UserModel.find({ status: "Approved" });
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
    const StudentList = await UserModel.find({ role: "Student" });
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
    const StudentCount = await UserModel.countDocuments({
      role: "Student",
    });
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
    const TeacherList = await UserModel.find({ role: "Teacher" });
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
      role: "Teacher",
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

// UPDATE USER STATUS REQUEST/APPROVED API
exports.UpdateUserStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;

  UserModel.findByIdAndUpdate(id, { $set: { status: status } }, { new: true })
    .then((updatedUserStatus) => {
      res.status(200).json(updatedUserStatus);
    })
    .catch((error) => {
      return res.status(400).json({ success: false, message: error });
    });
};

// UPDATE IS ADMIN (USER TO ADMIN /ADMIN OT USER) API
exports.UpdateIsAdmin = async (req, res) => {
  const id = req.params.id;
  const isAdmin = req.body.isAdmin;

  UserModel.findByIdAndUpdate(id, { $set: { isAdmin: isAdmin } }, { new: true })
    .then((UpdateIsAdmin) => {
      res.status(200).json(UpdateIsAdmin);
    })
    .catch((error) => {
      return res.status(400).json({ success: false, message: error });
    });
};

// UPDATE USER ROLE STUDENT/TEACHER API
exports.UpdateUserRole = async (req, res) => {
  const id = req.params.id;
  const role = req.body.role;

  UserModel.findByIdAndUpdate(id, { $set: { role: role } }, { new: true })
    .then((updatedUserRole) => {
      res.status(200).json(updatedUserRole);
    })
    .catch((error) => {
      return res.status(400).json({ success: false, message: error });
    });
};

// SEARCH BY DEPARTMENT API
exports.SearchByDepartment = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await UserModel.find({
      $or: [{ departmentName: { $regex: keyword, $options: "i" } }],
    }).select("-password");
    res.json(results);
  } catch (error) {
    console.log(error.message);
  }
};

// SEARCH BY SESSION API
exports.SearchBySession = async (req, res) => {
  try {
    const { session } = req.params;
    const results = await UserModel.find({ session: { $eq: session } }).select(
      "-password"
    );
    res.json(results);
  } catch (error) {
    console.log(error.message);
  }
};

// SEARCH BY TEACHER / STUDENT API
exports.SearchByTeacherAndStudent = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await UserModel.find({
      $or: [{ role: { $regex: keyword, $options: "i" } }],
    }).select("-password");
    res.json(results);
  } catch (error) {
    console.log(error.message);
  }
};

// SEARCH BY NAME API
exports.SearchByName = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await UserModel.find({
      $or: [{ name: { $regex: keyword, $options: "i" } }],
    }).select("-password");
    res.json(results);
  } catch (error) {
    console.log(error.message);
  }
};

// LIST BY DEPARTMENT (COMPUTER/RAC/CIVIL/ELECTRICAL/TOURISM/FOOD)
exports.ListByComputerDepartment = async (req, res) => {
  try {
    const List = await UserModel.find({ departmentName: "Computer" });
    if (!List) {
      res
        .status(500)
        .json({ success: false, message: "Not found Computer List" });
    } else {
      res.status(200).json(List);
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
exports.ListByRACDepartment = async (req, res) => {
  try {
    const List = await UserModel.find({ departmentName: "RAC" });
    if (!List) {
      res.status(500).json({ success: false, message: "Not found RAC List" });
    } else {
      res.status(200).json(List);
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
exports.ListByCivilDepartment = async (req, res) => {
  try {
    const List = await UserModel.find({ departmentName: "Civil" });
    if (!List) {
      res.status(500).json({ success: false, message: "Not found Civil List" });
    } else {
      res.status(200).json(List);
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
exports.ListByElectricalDepartment = async (req, res) => {
  try {
    const List = await UserModel.find({ departmentName: "Electrical" });
    if (!List) {
      res
        .status(500)
        .json({ success: false, message: "Not found Electrical List" });
    } else {
      res.status(200).json(List);
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
exports.ListByTourismDepartment = async (req, res) => {
  try {
    const List = await UserModel.find({ departmentName: "Tourism" });
    if (!List) {
      res
        .status(500)
        .json({ success: false, message: "Not found Tourism List" });
    } else {
      res.status(200).json(List);
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
exports.ListByFoodDepartment = async (req, res) => {
  try {
    const List = await UserModel.find({ departmentName: "Food" });
    if (!List) {
      res.status(500).json({ success: false, message: "Not found Food List" });
    } else {
      res.status(200).json(List);
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

// COUNT BY DEPARTMENT (COMPUTER/RAC/CIVIL/ELECTRICAL/TOURISM/FOOD)
exports.CountByComputerDepartment = async (req, res) => {
  try {
    const Count = await UserModel.countDocuments({
      departmentName: "Computer",
    });
    if (!Count) {
      res
        .status(500)
        .json({ success: false, message: "Not found Computer department" });
    } else {
      res.status(200).json({ Count });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
exports.CountByRACDepartment = async (req, res) => {
  try {
    const Count = await UserModel.countDocuments({ departmentName: "RAC" });
    if (!Count) {
      res
        .status(500)
        .json({ success: false, message: "Not found RAC department" });
    } else {
      res.status(200).json({ Count });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
exports.CountByCivilDepartment = async (req, res) => {
  try {
    const Count = await UserModel.countDocuments({ departmentName: "Civil" });
    if (!Count) {
      res
        .status(500)
        .json({ success: false, message: "Not found Civil department" });
    } else {
      res.status(200).json({ Count });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
exports.CountByElectricalDepartment = async (req, res) => {
  try {
    const Count = await UserModel.countDocuments({
      departmentName: "Electrical",
    });
    if (!Count) {
      res
        .status(500)
        .json({ success: false, message: "Not found Electrical department" });
    } else {
      res.status(200).json({ Count });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
exports.CountByTourismDepartment = async (req, res) => {
  try {
    const Count = await UserModel.countDocuments({ departmentName: "Tourism" });
    if (!Count) {
      res
        .status(500)
        .json({ success: false, message: "Not found Tourism department" });
    } else {
      res.status(200).json({ Count });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
exports.CountByFoodDepartment = async (req, res) => {
  try {
    const Count = await UserModel.countDocuments({ departmentName: "Food" });
    if (!Count) {
      res
        .status(500)
        .json({ success: false, message: "Not found Food department" });
    } else {
      res.status(200).json({ Count });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
