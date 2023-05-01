const UserModel = require("../Models/UserModel");

// GET SINGLE USER  API
exports.GetSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findOne({ _id: id }).select("-password");
    console.log(user);
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "The user is not found" });
    } else {
      res.status(200).json({ success: true, message: "success", user });
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
    res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
