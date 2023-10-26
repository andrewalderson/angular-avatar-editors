import type { Meta, StoryObj } from '@storybook/angular';
import { NgxAvatarEditorComponent } from './avatar-editor.component';

const meta: Meta<NgxAvatarEditorComponent> = {
  component: NgxAvatarEditorComponent,
  title: 'Components/BasicAvatarEditor',
};
export default meta;
type Story = StoryObj<NgxAvatarEditorComponent>;

export const Primary: Story = {
  args: {},
};
