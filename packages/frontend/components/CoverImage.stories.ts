import type { StoryObj, Meta } from "@storybook/vue3";
import CoverImage from "./CoverImage.vue";

const StoryComponent = CoverImage;

type Story = StoryObj<typeof StoryComponent>;

const meta: Meta<typeof StoryComponent> = {
  component: StoryComponent,
  title: "CoverImage",
  argTypes: {
    size: {
      options: [undefined, 48, 56, 64, 112, 152],
      control: { type: "select" },
    },
    src: {
      control: { type: "text" },
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    size: 48,
    src: "https://source.unsplash.com/random/120x120",
  },
};
