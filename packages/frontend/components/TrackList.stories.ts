import type { StoryObj, Meta } from "@storybook/vue3";
import StoryComponent from "./TrackList.vue";
import TrackItem from "./TrackItem.vue";

type Story = StoryObj<typeof StoryComponent>;

const meta: Meta<typeof StoryComponent> = {
  component: StoryComponent,
  render: (args) => {
    return {
      components: { StoryComponent, TrackItem },
      template: `
        <StoryComponent>
          <TrackItem v-for="i in 10" :key="i" type="track" coverSrc="https://source.unsplash.com/random/56x56" title="Track Title" subTitle="Artist Name" />
        </StoryComponent>
      `,
      props: Object.keys(args),
    };
  },
};

export default meta;

export const Default: Story = {};
