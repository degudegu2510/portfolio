import type { Preview } from "@storybook/react-vite";
import { useEffect } from "react";
import { MemoryRouter } from "react-router";
import "../src/style/index.css";

const ThemeWrapper = ({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: string;
}) => {
  useEffect(() => {
    document.documentElement.style.colorScheme =
      theme === "auto" ? "light dark" : theme;
  }, [theme]);

  return <>{children}</>;
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "auto";
      return (
        <MemoryRouter>
          <ThemeWrapper theme={theme}>
            <Story />
          </ThemeWrapper>
        </MemoryRouter>
      );
    },
  ],
  globalTypes: {
    theme: {
      name: "Theme",
      defaultValue: "auto",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
          { value: "auto", icon: "contrast", title: "Auto" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
