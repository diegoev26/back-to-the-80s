import { Router } from "express";
import config from "../../../config/config.js";
import { testApi } from "./test.controller.js";
const router = Router();

if (config?.routes?.test) router.get(config?.routes?.test?.url, testApi);

export default router;
