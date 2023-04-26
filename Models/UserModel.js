const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter your name!"],
    },
    fatherName: {
      type: String,
      required: [true, "Enter your father name!"],
    },
    motherName: {
      type: String,
      required: [true, "Enter your mother name!"],
    },
    image: {
      type: String,
      default: "",
    },
    departmentName: {
      type: String,
      required: [true, "Enter your department name!"],
    },
    rollNumber: {
      type: Number,
      required: [true, "Enter your roll number!"],
    },
    registrationNumber: {
      type: Number,
      required: [true, "Enter your registration number!"],
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
      type: Number,
      required: [true, "Enter your mobile number!"],
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
      required: [true, "Enter your company name!"],
    },
    jobPosition: {
      type: String,
      required: [true, "Enter your your job position!"],
    },
    divisionName: {
      type: String,
      required: [true, "Enter your division name!"],
    },
    district: {
      type: String,
      required: [true, "Enter your district name!"],
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
