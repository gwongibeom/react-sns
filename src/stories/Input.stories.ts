import type { Meta, StoryObj } from '@storybook/react'

// import { Input } from "../components/auth-components";
import { Inputs as Input } from './Input'

const meta = {
  title: 'Example/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    value: '', // Provide a default or leave it empty if not needed
    placeholder: 'Edit Input',
  },
}

export const Value: Story = {
  args: {
    value: 'Change Input',
    placeholder: 'Edit Input',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    value: 'test',
    placeholder: 'Password', // Provide placeholder for Password story
  },
}
