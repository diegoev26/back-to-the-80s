import { Env } from "./env";

export type ControllerHandler = (req: Request, env: Env) => Promise<Response>;
