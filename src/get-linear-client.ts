import { LinearClient } from "@linear/sdk";

import { env } from "./env.js";

export const getLinearClient = () => new LinearClient({ apiKey: env().linearApiKey })
