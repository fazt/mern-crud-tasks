import { Router } from "express";
import { profile, signin, signup } from "../controllers/auth.controller.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { signinSchema, signupSchema } from "../schemas/auth.schema.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/signup", schemaValidator(signupSchema), signup);

router.post("/signin", schemaValidator(signinSchema), signin);

router.get("/profile", authRequired, profile);

export default router;
