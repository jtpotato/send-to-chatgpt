export default {
  input: "src/index.js", // Replace 'src/main.js' with the path to your entry point file
  output: {
    file: "dist/index.js",
    format: "cjs", // Replace 'cjs' with the desired output format (e.g., 'umd', 'iife', 'esm')
    inlineDynamicImports: true,
  },
};
