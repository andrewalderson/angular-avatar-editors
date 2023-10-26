import { type Meta, type StoryObj } from '@storybook/angular';
import { NgxAvatarEditorComponent } from './avatar-editor.component';

const meta: Meta<NgxAvatarEditorComponent> = {
  component: NgxAvatarEditorComponent,
  title: 'Components/BasicAvatarEditor',
  parameters: {
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<NgxAvatarEditorComponent>;

const Template: Story = {
  render: (args) => ({
    props: args,
    template: `<ngx-avatar-editor style="width: 256px; height: 256px;" [src]="src" />`,
  }),
};

export const Primary: Story = {
  ...Template,
  args: {
    src: 'grace-hilty-uvAhJHLul_Q-unsplash.jpg',
  },
};
