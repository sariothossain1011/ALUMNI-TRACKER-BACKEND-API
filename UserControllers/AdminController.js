const UserModel = require("../Models/UserModel");

// Delete User API
exports.DeleteUser = async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) return res.status(400).send("Invalid User");
      const result =  await UserModel.findByIdAndRemove({_id: req.params.id})
      res.status(200).json({message: "successful", data:result})
    
    } catch (error) {
      return res.status(400).json({ success: false, message: error });
    }
  };

// UPDATE USER STATUS REQUEST/APPROVED API
exports.UpdateUserStatus = async (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
  
    UserModel.findByIdAndUpdate(id, { $set: { status: status } }, { new: true })
      .then((updatedUserStatus) => {
        res.status(200).json(updatedUserStatus);
      })
      .catch((error) => {
        return res.status(400).json({ success: false, message: error });
      });
  };
  
  // UPDATE IS ADMIN (USER TO ADMIN /ADMIN OT USER) API
  exports.UpdateIsAdmin = async (req, res) => {
    const id = req.params.id;
    const isAdmin = req.body.isAdmin;
  
    UserModel.findByIdAndUpdate(id, { $set: { isAdmin: isAdmin } }, { new: true })
      .then((UpdateIsAdmin) => {
        res.status(200).json(UpdateIsAdmin);
      })
      .catch((error) => {
        return res.status(400).json({ success: false, message: error });
      });
  };
  
  // UPDATE USER ROLE STUDENT/TEACHER API
  exports.UpdateUserRole = async (req, res) => {
    const id = req.params.id;
    const role = req.body.role;
  
    UserModel.findByIdAndUpdate(id, { $set: { role: role } }, { new: true })
      .then((updatedUserRole) => {
        res.status(200).json(updatedUserRole);
      })
      .catch((error) => {
        return res.status(400).json({ success: false, message: error });
      });
  };

