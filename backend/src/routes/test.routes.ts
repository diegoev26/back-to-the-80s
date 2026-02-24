import { Router } from "express";
import config from "config/config.js";
import { testApi } from "controllers/test.controller.js";
const router = Router();

if (config?.routes?.test) router.get(config?.routes?.test, testApi);

export default router;
