import express ,{Router} from "express";
import InstituteController from "../../controller/institute/institute.js";

const router:Router = express.Router();

router.route("/institute").post(InstituteController.createInstitute)
export default router