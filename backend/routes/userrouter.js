import  express  from "express";
import { login, signup } from "../controllers/index.js";
const router = express.Router();

router.post("/signup", signup);
console.log("inrouter")
router.post("/login", login);
export default router;
