import typescript from "@rollup/plugin-typescript";
import preserveDirectives from "rollup-preserve-directives";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "esm",
    },
  ],
  plugins: [preserveDirectives(), typescript({ tsconfig: "tsconfig.json" })],
  external: ["react", "react-dom"],
};
