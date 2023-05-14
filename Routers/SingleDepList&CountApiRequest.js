const express = require("express");
const { RequireSignIn } = require("../Middleware/AuthMiddleware");
const {
  ListByComputerDepartment,
  ListByRACDepartment,
  ListByCivilDepartment,
  ListByElectricalDepartment,
  ListByTourismDepartment,
  ListByFoodDepartment,
  CountByComputerDepartment,
  CountByRACDepartment,
  CountByCivilDepartment,
  CountByElectricalDepartment,
  CountByTourismDepartment,
  CountByFoodDepartment,
} = require("../Controllers/SingleDepList&CountController");

const router = express.Router();

//  LIST BY SINGLE DEPARTMENT
router.get(
  "/ListByComputerDepartment",
  RequireSignIn,
  ListByComputerDepartment
);
router.get("/ListByRACDepartment", RequireSignIn, ListByRACDepartment);
router.get("/ListByCivilDepartment", RequireSignIn, ListByCivilDepartment);
router.get(
  "/ListByElectricalDepartment",
  RequireSignIn,
  ListByElectricalDepartment
);
router.get("/ListByTourismDepartment", RequireSignIn, ListByTourismDepartment);
router.get("/ListByFoodDepartment", RequireSignIn, ListByFoodDepartment);

//  COUNT BY SINGLE DEPARTMENT
router.get(
  "/CountByComputerDepartment",
  RequireSignIn,
  CountByComputerDepartment
);
router.get("/CountByRACDepartment", RequireSignIn, CountByRACDepartment);
router.get("/CountByCivilDepartment", RequireSignIn, CountByCivilDepartment);
router.get(
  "/CountByElectricalDepartment",
  RequireSignIn,
  CountByElectricalDepartment
);
router.get(
  "/CountByTourismDepartment",
  RequireSignIn,
  CountByTourismDepartment
);
router.get("/CountByFoodDepartment", RequireSignIn, CountByFoodDepartment);

module.exports = router;
