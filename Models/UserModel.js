const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter your name!"],
    },
    fatherName: {
      type: String,
      default:"",
    },
    motherName: {
      type: String,
      default:"",
    },
    image: {
      type: String,
      default: "https://res.cloudinary.com/db8l1ulfq/image/upload/v1682591922/user-profile_tfugwz.png",
    },
    departmentName: {
      type: String,
      required: [true, "Enter your department name!"],
    },
    rollNumber: {
      type: Number,
      default:0,
    },
    registrationNumber: {
      type: Number,
      default:0,
    },
    email: {
      type: String,
      required: [true, "Enter your e-mail!"],
    },
    session: {
      type: String,
      required: [true, "Enter your session!"],
    },
    mobile: {
      type: String,
      required: [true, "Enter your mobile number!"],
    },
    whatsappNumber:{
      type: Number,
      default:0,
    },
    facebookLink:{
      type: String,
      default:"",
    },
    password: {
      type: String,
      required: [true, "Enter your password!"],
    },
    status: {
      type: String,
      default: "Request",
    },
    companyName: {
      type: String,
      default:"",
    },
    jobPosition: {
      type: String,
      default:"",
    },
    jobLocation: {
      type: String,
      default:"",
    },
    role:{
      type:String,
      default:"Student"
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: false, versionKey: false }
);

UserSchema.virtual("id").get(function () {
  // Use regular function declaration
  return this._id.toHexString();
});
UserSchema.set("toJSON", {
  // Remove virtuals: true
  getters: true, // Use getters option instead
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
