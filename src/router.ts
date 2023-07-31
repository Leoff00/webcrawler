import { Router } from "express";
import { Controller } from "./controller";

const router = Router();

const apiGroup = {
  submit: "/api/v1/submit",
};

router.post(apiGroup.submit, Controller.handler);

export { router };
