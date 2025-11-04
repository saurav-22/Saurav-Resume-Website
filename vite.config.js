/* export default {
  root: "src",
  build: {
    outDir: "../dist"
  }
};
 */

import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: "src/index.html",
        projects: "src/projects.html"
      }
    }
  }
});
