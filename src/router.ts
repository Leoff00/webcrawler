import { Router } from "express";
import { Controller } from "./controller";
import { loginMiddleware } from "./middlewares";

const router = Router();

const apiGroup = {
  submit: "/api/v1/submit",
  benefits: "/api/v1/benefits",
  benefit: "/api/v1/benefit/:elasticId",
};

router.get(apiGroup.benefits, Controller.FindBenefitsHandler);
router.get(apiGroup.benefit, Controller.FindBenefitHandler);
router.post(apiGroup.submit, loginMiddleware, Controller.SubmitBenefitsHandler);

export { router };
