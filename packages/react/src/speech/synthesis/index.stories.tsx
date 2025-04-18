import { Meta, StoryObj } from "@storybook/react";
import { SpeechSynthesis } from "./index";

const meta: Meta<typeof SpeechSynthesis> = {
  title: "语音/短语音合成",
  component: SpeechSynthesis,
  tags: ["autodocs"]
};

export default meta;

export const Primary: StoryObj<typeof SpeechSynthesis> = {
  args: {
    children: "Click Me",
  },
};
