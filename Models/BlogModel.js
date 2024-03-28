const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    position:{
        type:String,
        required: [true, "Position is required!"],
    },
    company:{
        type:String,
        required: [true, "Company is required!"],
    },
    deadline:{
        type:String,
        required: [true, "Deadline is required!"],
    },
    vacancy:{
        type:String,
        required: [true, "Vacancy is required!"],
    },
    gender:{
        type:String,
        required: [true, "Gender is required!"],
    },
    location:{
        type:String,
        required: [true, "Location is required!"],
    },
    salary:{
      type:String,
      required: [true, "Salary is required!"],
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: [true, "Author id is required!"],
    },
    education:{
        type:String,
        required: [true, "Education is required!"],
    },
    experience:{
        type:String,
        required: [true, "Experience is required!"],
    },
    jobContext:{
        type:String,
        required: [true, "JobContext is required!"],
    },
    responsibilitics:{
        type:String,
        required: [true, "Responsibilitics is required!"],
    },
    employmentStatus:{
        type:String,
        required: [true, "EmploymentStatus is required!"],
    },
    age:{
        type:String,
        required: [true, "Age is required!"],
    },
    createDate:{
        type:Date,
        default:Date.now(),
    },
    updateDate:{
        type:Date,
        default:Date.now(),
    }
},{versionKey:false});

const BlogModel = mongoose.model("blog",BlogSchema);

module.exports = BlogModel ;