const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// USERS REGISTRATION API
exports.Registration = async (req, res) => {
  try {
    const userItem = await UserModel({
      name: req.body.name,
      fatherName: req.body.fatherName,
      motherName: req.body.motherName,
      image: req.body.image,
      departmentName: req.body.departmentName,
      rollNumber: req.body.rollNumber,
      registrationNumber: req.body.registrationNumber,
      email: req.body.email,
      session: req.body.session,
      mobile: req.body.mobile,
      whatsappNumber: req.body.whatsappNumber,
      facebookLink: req.body.facebookLink,
      password: bcrypt.hashSync(req.body.password, 10),
      status: req.body.status,
      companyName: req.body.companyName,
      jobPosition: req.body.jobPosition,
      jobLocation: req.body.jobLocation,
      role: req.body.role,
      isAdmin: req.body.isAdmin,
    });
    const user = await userItem.save();
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Registration fail" });
    }
    res.status(200).send(user);
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

// USERS LOGIN API
exports.Login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    const secret = process.env.SECRET_KEY;
    if (!user) {
      return res.status(400).json("The user not found");
    }
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
        {
          userId: user.id,
          isAdmin: user.isAdmin,
        },
        secret,
        { expiresIn: "1d" }
      );

      return res.status(200).json({ user: user.email, token: token });
    } else {
      res.status(400).json("Password is wrong");
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

// GET SINGLE USER  API
exports.GetSingleUser = async (req, res) => {
  try {
    const user = await UserModel.findOne(req.params.id).select("-password");
    if (!user) {
      res
        .status(500)
        .json({ success: false, message: "The user is not found" });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

// // GET UPDATE USER  API
exports.UpdateUser = async (req, res) => {
  try {
    const id = req.params.Id;
    const postBody = req.body;
    const user = await UserModel.findByIdAndUpdate(id, postBody, {
      new: true,
    }).select("-password");
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "The user not update !" });
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
// Create Product API
exports.UserImageUpdate = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).send("No image in the request");
    const fileName = req.file.filename;
    const BasePath = `${req.protocol}://${req.get("host")}/Public/Uploads/`; //"http://localhost:3000/Public/Upload/

    const user = await UserModel.updateOne({
      image: `${BasePath}${fileName}`, //"http://localhost:3000/Public/Upload/image-210423"
    });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Image update fail " });
    }
    return res
      .status(200)
      .json({ success: true, message: "Image update Success " });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

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

// USER REQUEST API
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

// USER Approved List API
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

exports.UpdateUserStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;

  UserModel.findByIdAndUpdate(id, { $set: { status: status } }, { new: true })
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((error) => {
      return res.status(400).json({ success: false, message: error });
    });
};

// exports.SearchKeyword=async(req,res)=>{
//   try{
//       let pageNo = Number(req.params.pageNo);
//       let perPage = Number(req.params.perPage);
//       let searchValue = req.params.searchKeyword;
//       let skipRow = (pageNo - 1) * perPage;

//       let data;
//       if (searchValue!=="0") {

//           let SearchRgx = {"$regex": searchValue, "$options":"1"}
//           let SearchQuery = {$or: [{title: SearchRgx}]}

//           data = await ProductModel.aggregate([{
//               $facet:{
//                   Total:[{$match: SearchQuery},{$count: "count"}],
//                   Rows:[{$match: SearchQuery},{$skip: skipRow}, {$limit: perPage}],
//               }
//           }])
//       }
//       else {
//           data = await ProductModel.aggregate([{
//               $facet:{
//                   Total:[{$count: "count"}],
//                   Rows:[{$skip: skipRow}, {$limit: perPage}],
//               }
//           }])
//       }
//       res.status(200).json({status: "success",data:data})
//   }
//   catch (error) {
//       res.status(400).json({status: "fail",data:error})
//   }

// }

// exports.UpdateUser = async (req, res) => {
//   try {
//     // if (!mongoose.isValidObjectId(req.params.id)) {
//     //   return res.status(400).send("Invalid user Id");
//     // }
//     const user = await UserModel.updateOne(
//       {id:req.params.id},
//       {
//         name: req.body.name ,
//         fatherName: req.body.fatherName ,
//         motherName: req.body.motherName ,
//         departmentName: req.body.departmentName ,
//         rollNumber: req.body.rollNumber ,
//         registrationNumber:req.body.registrationNumber ,
//         email: req.body.email,
//         session: req.body.session ,
//         mobile: req.body.mobile ,
//         status: req.body.status ,
//         jobPosition: req.body.jobPosition ,
//         companyName: req.body.companyName ,
//         divisionName: req.body.divisionName ,
//         district: req.body.district,
//         isAdmin: req.body.isAdmin ,
//       },
//       { new: true }
//     ).select("-password");
//     console.log(req.params.id)

//     if (!user) {
//       return res
//         .status(404)
//         .send({ success: false, message: "The user not update !" });
//     }
//     res.statue(200).send(user);
//   } catch (error) {
//     return res.status(400).json({ success: false, message: error });
//   }
// };

// // USERS REGISTRATION API
// exports.Registration = async (req, res) => {
//   try {
//     const file = req.file;
//     if (!file) return res.status(400).send("No image in the request");
//     const fileName = req.file.filename;
//     const BasePath = `${req.protocol}://${req.get("host")}/Public/Uploads/`; //"http://localhost:3000/Public/Upload/

//     const userItem = await UserModel({
//       name: req.body.name,
//       fatherName: req.body.fatherName,
//       motherName: req.body.motherName,
//       image: `${BasePath}${fileName}`, //"http://localhost:3000/Public/Upload/image-210423"
//       departmentName: req.body.departmentName,
//       rollNumber: req.body.rollNumber,
//       registrationNumber: req.body.registrationNumber,
//       email: req.body.email,
//       session: req.body.session,
//       mobile: req.body.mobile,
//       password: bcrypt.hashSync(req.body.password, 10),
//       status: req.body.status,
//       jobPosition: req.body.jobPosition,
//       companyName: req.body.companyName,
//       divisionName: req.body.divisionName,
//       district: req.body.district,
//       isAdmin: req.body.isAdmin,
//     });
//     const user = await userItem.save();
//     if (!user) {
//       return res
//         .status(400)
//         .send({ success: false, message: "Registration fail" });
//     }
//     res.status(200).send(user);
//   } catch (error) {
//     return res.status(400).json({ success: false, message: error });
//   }
// };
