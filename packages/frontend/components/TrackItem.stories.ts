import type { StoryObj, Meta } from "@storybook/vue3";
import StoryComponent from "./TrackItem.vue";

type Story = StoryObj<typeof StoryComponent>;

const meta: Meta<typeof StoryComponent> = {
  component: StoryComponent,
  title: "TrackItem",
  argTypes: {
    type: {
      control: {
        type: "select",
        options: ["track", "album", "playlist"],
      },
    },
    coverSrc: {
      control: {
        type: "text",
      },
    },
    title: {
      control: {
        type: "text",
      },
    },
    subTitle: {
      control: {
        type: "text",
      },
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    type: "track",
    coverSrc: "https://source.unsplash.com/random/56x56",
    title: "Track Title",
    subTitle: "Artist Name",
  },
};
