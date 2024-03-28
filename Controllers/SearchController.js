const UserModel = require("../Models/UserModel");

// SEARCH BY DEPARTMENT API
exports.SearchByDepartment = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await UserModel.find({
      $or: [{ departmentName: { $regex: keyword, $options: "i" } }],
    }).select("-password");
    res.json(results);
  } catch (error) {
    return res.status(400).send(error.message);
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
    return res.status(400).send(error.message);
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
    return res.status(400).send(error.message);
  }
};

// SEARCH BY NAME API
// exports.SearchByName = async (req, res) => {
//   try {
//     const { keyword } = req.params.keyword;
//     const results = await UserModel.find({
//       $or: [{ name: { $regex: keyword, $options: "i" } }],
//     }).select("-password");

//     res.status(200).json(results);
//   } catch (error) {
//     console.log(error.message);
//   }
// };


exports.SearchByName = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await UserModel.find({
      $or: [{ name: { $regex: keyword, $options: "i" } }],
    }).select("-password");
    res.json(results);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};


// exports.SearchByName = async (req, res) => {
//   try {
//     const { keyword } = req.params.keyword;
//     if (!keyword) {
//       return res.status(400).json({ message: "Keyword parameter is missing or null" });
//     }

//     const regexKeyword = keyword.toString(); // Convert the keyword parameter to a string
//     const results = await UserModel.find({
//       $or: [{ name: { $regex: regexKeyword, $options: "i" } }],
//     }).select("-password");

//     res.status(200).json(results);
//   } catch (error) {
//     console.log(error.message);
//   }
// };


