// libs/your-ui-lib/src/lib/button/button.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3'
import Button from './index.vue'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'text']
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg']
    },
    onClick: { action: 'clicked' }
  }
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    type: 'primary',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Primary Action</Button>'
  })
}

export const Secondary: Story = {
  args: {
    type: 'secondary'
  }
}

export const LoadingState: Story = {
  args: {
    loading: true,
    children: 'Loading...'
  }
}

export const DisabledState: Story = {
  args: {
    disabled: true
  }
}

export const CustomContent: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: `
      <Button v-bind="args">
        <span class="text-red-500">🚀 Custom Content</span>
      </Button>
    `
  })
}
