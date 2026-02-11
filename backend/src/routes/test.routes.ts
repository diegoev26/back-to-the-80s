import { Router } from "express";
import { publicRoutes } from "@project/shared";
import { testApi } from "controllers/test.controller.js";
const router = Router();

router.get(publicRoutes.test, testApi);

export default router;
