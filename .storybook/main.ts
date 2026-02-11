import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
  ],
  framework: "@storybook/react-vite",
  viteFinal: async (config) => {
    return mergeConfig(config, {
      base: "/portfolio/storybook/",
      plugins: [tailwindcss()],
      define: { global: "globalThis" },
      resolve: { alias: { buffer: "buffer" } },
      optimizeDeps: { include: ["buffer"] },
    });
  },
};

export default config;
