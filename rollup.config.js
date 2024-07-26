import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import autoExternal from "rollup-plugin-auto-external";
import { glob } from "glob";
import MagicString from "magic-string";
import dts from "rollup-plugin-dts";
import path from "path";

const srcPath = "src";

// 获取所有需要打包的文件
const allFiles = glob.sync(path.join(srcPath, "**/*.{ts,tsx}"), {
  ignore: [
    // 忽略测试文件
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.spec.ts",
    "**/*.spec.tsx",
    // 忽略类型定义文件
    "**/*.d.ts",
    // 忽略其他不需要打包的文件，比如配置文件
    "**/setupTests.ts",
    "**/reportWebVitals.ts",
  ],
});

function preserveDirectives() {
  const directivesMap = new Map();

  return {
    name: "preserve-directives",
    transform(code, id) {
      const lines = code.split("\n");
      let directiveLines = [];

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (
          trimmedLine.startsWith('"use ') ||
          trimmedLine.startsWith("'use ")
        ) {
          directiveLines.push(line);
        } else if (trimmedLine !== "") {
          break;
        }
      }

      if (directiveLines.length > 0) {
        directivesMap.set(id, directiveLines.join("\n") + "\n\n");
      }

      return null; // 不修改代码，让其他插件正常处理
    },
    renderChunk(code, chunk) {
      const magicString = new MagicString(code);
      const directives = directivesMap.get(chunk.facadeModuleId);

      if (directives) {
        magicString.prepend(directives);
        return {
          code: magicString.toString(),
          map: magicString.generateMap({ hires: true }),
        };
      }

      return null;
    },
  };
}

const jsConfig = {
  input: allFiles,
  output: {
    dir: "dist",
    format: "esm",
    preserveModules: true,
    preserveModulesRoot: ".",
    entryFileNames: "[name].js",
  },
  plugins: [
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
