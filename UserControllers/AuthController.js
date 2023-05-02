const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// USER REGISTRATION API
exports.Registration = async (req, res) => {
  try {
    console.log(`req.body: ${req.body}`);
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

// USER LOGIN API
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
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
        id: user.id,
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
