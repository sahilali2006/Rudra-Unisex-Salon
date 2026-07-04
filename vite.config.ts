import { defineConfig } from "@Lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/",
  },

  tanstackStart: {
    server: {
      entry: "server",
    },
  },
});