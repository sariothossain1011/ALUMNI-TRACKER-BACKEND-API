const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");

exports.RequireSignIn = (req, res, next) => {
  try {
    let tmp = req.header("Authorization");
    const token = tmp && tmp.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    console.log(req.user)
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.IsAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (user.isAdmin !== true) {
      return res.status(401).send("Unauthorized Admin");
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

