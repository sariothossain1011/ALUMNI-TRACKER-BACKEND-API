const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter your name!"],
    },
    fatherName: {
      type: String,
    },
    motherName: {
      type: String,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/db8l1ulfq/image/upload/v1682591922/user-profile_tfugwz.png",
    },
    department: {
      type: String,
      // required: [true, "Enter your department name!"],
    },
    rollNumber: {
      type: String,
    },
    registrationNumber: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Enter your e-mail!"],
    },
    session: {
      type: String,
    },
    mobile: {
      type: String,
    },
    whatsappNumber: {
      type: String,
    },
    facebookLink: {
      type: String,
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
    },
    jobPosition: {
      type: String,
    },
    jobLocation: {
      type: String,
    },
    gender: {
      type: String,
    },
    role: {
      type: String,
      default: "student",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

UserSchema.virtual("id").get(function () {
  // Use regular function declaration
  return this._id.toHexString();
});
UserSchema.set("toJSON", {
  // Remove virtuals: true
  getters: true, // Use getters option instead
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
