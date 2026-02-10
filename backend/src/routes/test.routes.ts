import { Router } from "express";
import { apiPublicRoutes } from "@project/shared";
import { testApi } from "controllers/test.controller.js";
const router = Router();

router.get(apiPublicRoutes.test, testApi);

export default router;
