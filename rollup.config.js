import typescript from "@rollup/plugin-typescript";
import preserveDirectives from "rollup-plugin-preserve-directives";
const config = [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist",
        format: "esm",
        preserveModules: true,
      },
    ],
    plugins: [preserveDirectives(), typescript()],
    external: ["react", "react-dom"],
  },
];

export default config;
