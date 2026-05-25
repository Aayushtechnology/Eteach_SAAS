import express from "express";
import InstituteController from "../../controller/institute/institute.js";
const router = express.Router();
router.route("/institute").post(InstituteController.createInstitute);
export default router;
