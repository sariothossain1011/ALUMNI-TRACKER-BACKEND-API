const UserModel = require("../Models/UserModel");

// LIST BY DEPARTMENT (COMPUTER/RAC/CIVIL/ELECTRICAL/TOURISM/FOOD)
exports.ListByComputerDepartment = async (req, res) => {
  try {
    const List = await UserModel.find({ departmentName: "Computer" });
    if (!List) {
      res
        .status(500)
        .json({ success: false, message: "Not found Computer List" });
    } else {
      res.status(200).json(List);
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
exports.ListByRACDepartment = async (req, res) => {
  try {
    const List = await UserModel.find({ departmentName: "RAC" });
    if (!List) {
      res.status(500).json({ success: false, message: "Not found RAC List" });
    } else {
      res.status(200).json(List);
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
exports.ListByCivilDepartment = async (req, res) => {
  try {
    const List = await UserModel.find({ departmentName: "Civil" });
    if (!List) {
      res.status(500).json({ success: false, message: "Not found Civil List" });
    } else {
      res.status(200).json(List);
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
exports.ListByElectricalDepartment = async (req, res) => {
  try {
    const List = await UserModel.find({ departmentName: "Electrical" });
    if (!List) {
      res
        .status(500)
        .json({ success: false, message: "Not found Electrical List" });
    } else {
      res.status(200).json(List);
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
exports.ListByTourismDepartment = async (req, res) => {
  try {
    const List = await UserModel.find({ departmentName: "Tourism" });
    if (!List) {
      res
        .status(500)
        .json({ success: false, message: "Not found Tourism List" });
    } else {
      res.status(200).json(List);
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
exports.ListByFoodDepartment = async (req, res) => {
  try {
    const List = await UserModel.find({ departmentName: "Food" });
    if (!List) {
      res.status(500).json({ success: false, message: "Not found Food List" });
    } else {
      res.status(200).json(List);
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

// COUNT BY DEPARTMENT (COMPUTER/RAC/CIVIL/ELECTRICAL/TOURISM/FOOD)
exports.CountByComputerDepartment = async (req, res) => {
  try {
    const Count = await UserModel.countDocuments({
      departmentName: "Computer",
    });
    if (!Count) {
      res
        .status(500)
        .json({ success: false, message: "Not found Computer department" });
    } else {
      res.status(200).json({ Count });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
exports.CountByRACDepartment = async (req, res) => {
  try {
    const Count = await UserModel.countDocuments({ departmentName: "RAC" });
    if (!Count) {
      res
        .status(500)
        .json({ success: false, message: "Not found RAC department" });
    } else {
      res.status(200).json({ Count });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
exports.CountByCivilDepartment = async (req, res) => {
  try {
    const Count = await UserModel.countDocuments({ departmentName: "Civil" });
    if (!Count) {
      res
        .status(500)
        .json({ success: false, message: "Not found Civil department" });
    } else {
      res.status(200).json({ Count });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
exports.CountByElectricalDepartment = async (req, res) => {
  try {
    const Count = await UserModel.countDocuments({
      departmentName: "Electrical",
    });
    if (!Count) {
      res
        .status(500)
        .json({ success: false, message: "Not found Electrical department" });
    } else {
      res.status(200).json({ Count });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
exports.CountByTourismDepartment = async (req, res) => {
  try {
    const Count = await UserModel.countDocuments({ departmentName: "Tourism" });
    if (!Count) {
      res
        .status(500)
        .json({ success: false, message: "Not found Tourism department" });
    } else {
      res.status(200).json({ Count });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
exports.CountByFoodDepartment = async (req, res) => {
  try {
    const Count = await UserModel.countDocuments({ departmentName: "Food" });
    if (!Count) {
      res
        .status(500)
        .json({ success: false, message: "Not found Food department" });
    } else {
      res.status(200).json({ Count });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
