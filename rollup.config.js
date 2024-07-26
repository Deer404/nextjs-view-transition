import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import autoExternal from "rollup-plugin-auto-external";
import dts from "rollup-plugin-dts";
import {
  multiEntry,
  preserveDirectives,
} from "@deer404/rollup-collection-plugin";

const jsConfig = {
  output: {
    dir: "dist",
    format: "esm",
    preserveModules: true,
    preserveModulesRoot: ".",
    entryFileNames: "[name].js",
  },
  plugins: [
    multiEntry({ src: "src" }),
    preserveDirectives(),
    autoExternal({
      builtins: true,
      dependencies: true,
      peerDependencies: true,
    }),
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
  ],
  external: [/node_modules/], // 将 node_modules 中的所有模块都视为外部依赖
};

const dtsConfig = {
  input: "src/index.ts",
  output: [{ file: "dist/index.d.ts", format: "es" }],
  plugins: [dts()],
};
export default [jsConfig, dtsConfig];
