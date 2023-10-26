import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarEditorComponent } from './avatar-editor.component';

const meta: Meta<AvatarEditorComponent> = {
  component: AvatarEditorComponent,
  title: 'Components/BasicAvatarEditor',
};
export default meta;
type Story = StoryObj<AvatarEditorComponent>;

export const Primary: Story = {
  args: {},
};
