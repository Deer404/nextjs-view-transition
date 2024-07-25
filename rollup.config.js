import preserveDirectives from "rollup-preserve-directives";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "esm",
        preserveDirectives: true,
      },
    ],
    plugins: [
      preserveDirectives(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
