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