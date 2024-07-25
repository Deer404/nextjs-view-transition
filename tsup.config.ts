import { defineConfig } from "tsup";
import * as fs from "node:fs/promises";
const useClientPlugin = {
  name: "use-client",
  setup(build) {
    build.onLoad({ filter: /\.(js|ts|tsx)$/ }, async (args) => {
      const contents = await fs.readFile(args.path, "utf8");
      return {
        contents: `"use client";\n${contents}`,
        loader: "tsx",
      };
    });
  },
};
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  target: "node18",
  dts: {
    resolve: true,
    entry: "./src/index.ts",
  },
  esbuildPlugins: [useClientPlugin],
});
