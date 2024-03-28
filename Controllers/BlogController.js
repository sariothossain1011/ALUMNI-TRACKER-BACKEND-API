const BlogModel = require("../Models/BlogModel");

exports.CreateBlog = async (req, res) => {
  try {
    const blogData = await BlogModel({
      position: req.body.position,
      company: req.body.company,
      deadline: req.body.deadline,
      vacancy: req.body.vacancy,
      gender: req.body.gender,
      location: req.body.position,
      salary: req.body.salary,
      author: req.user.id,
      education: req.body.education,
      experience: req.body.experience,
      jobContext: req.body.jobContext,
      responsibilitics: req.body.responsibilitics,
      employmentStatus: req.body.employmentStatus,
      age: req.body.age,
    });

    const blog = await blogData.save();
    if (!blog) {
      return res
        .status(400)
        .send({ success: false, message: "Blog Create Fail!" });
    }
    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

exports.GetAllBlog = async (req, res) => {
  try {
    const blog = await BlogModel.find().populate()

    if (!blog) {
      res
        .status(400)
        .json({ success: false, message: "Not found blog" });
    } else {
      res.status(200).json({ success: true, message: blog });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

exports.GetBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await BlogModel.findOne({ _id: id })

    if (!blog) {
      res
        .status(400)
        .json({ success: false, message: "The blog is not found" });
    } else {
      res.status(200).json({ success: true, message: blog });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

exports.UpdateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const postBody = req.body;
    const blog = await BlogModel.findByIdAndUpdate(id, postBody, {
      new: true,
    });
    if (!blog) {
      return res
        .status(404)
        .send({ success: false, message: "Blog update fail!" });
    }
    res.status(200).send({ success: true, message: "Blog update success" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

exports.DeleteBlog = async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
    if (!blog) return res.status(400).send("Not found blog!");
    await BlogModel.deleteOne({ id: req.params.id }).then((blog) => {
      if (blog) {
        return res
          .status(200)
          .send({ success: true, message: "Blog is deleted!" });
      } else {
        return res
          .status(400)
          .send({ success: false, message: "Blog delete fail!" });
      }
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};


exports.FindBlogByUserId = async (req, res) => {
  try {
    const id = req.user.id;
    const blog = await BlogModel.find({ author: id })

    if (!blog) {
      res
        .status(400)
        .json({ success: false, message: "you have no blog post" });
    } else {
      res.status(200).json({ success: true, message: blog });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};