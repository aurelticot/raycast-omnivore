import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/api/schema.graphql",
  documents: ["src/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./src/api/generated/": {
      preset: "client",
    },
  },
  hooks: { afterAllFileWrite: ["ray lint --fix"] },
};

export default config;
