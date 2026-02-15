import type { Meta, StoryObj } from "@storybook/react-vite"
import { GradientBackground } from "./GradientBackground"

const meta: Meta<typeof GradientBackground> = {
  title: "Atoms/GradientBackground",
  component: GradientBackground,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
