import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { generateServerClientUsingReqRes } from "@aws-amplify/adapter-nextjs/api";
import amplifyConfig from "@/amplifyconfiguration.json";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: amplifyConfig,
});

export const reqResBasedClient = generateServerClientUsingReqRes({
  config: amplifyConfig,
});
