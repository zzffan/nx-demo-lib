import { Meta, StoryObj } from '@storybook/react';
import { SpeechTest } from './index';

const meta: Meta<typeof SpeechTest> = {
  title: '语音/短语音测试',
  component: SpeechTest,
  tags: ['autodocs']
};

export default meta;

export const Primary: StoryObj<typeof SpeechTest> = {
  args: {
    children: 'Click Me'
  },
};
