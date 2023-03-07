import { functions } from "@functions/index";
import { ServerlessFrameworkConfiguration } from "serverless-schema";

const serverlessConfiguration: ServerlessFrameworkConfiguration = {
  service: "typescript-template",
  useDotenv: true,
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      sourcemap: true,
    },
    stage: "${opt:stage, self:provider.stage}",
    stages: ["uat", "alpha", "prod"],
    prune: {
      automatic: true,
      number: 3,
    },
  },
  plugins: ["serverless-esbuild", "serverless-prune-plugin"],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    region: "us-west-2",
    stage: '${opt:stage, "uat"}',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
  },
  functions,
  package: {
    individually: true,
  },
};

module.exports = serverlessConfiguration;
