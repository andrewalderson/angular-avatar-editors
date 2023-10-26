import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NgxAvatarEditorImageDirective } from './avatar-editor-image.directive';
import { NgxAvatarEditorComponent } from './avatar-editor.component';

const meta: Meta<NgxAvatarEditorComponent> = {
  component: NgxAvatarEditorComponent,
  title: 'Components/BasicAvatarEditor',
  decorators: [
    moduleMetadata({
      imports: [NgxAvatarEditorImageDirective],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<NgxAvatarEditorComponent & HTMLImageElement>;

const Template: Story = {
  render: (args) => ({
    props: args,
    template: `<ngx-avatar-editor><img ngxAvatarEditorImage [src]="src"/></ngx-avatar-editor>`,
  }),
};

export const Primary: Story = {
  ...Template,
  args: {
    src: 'grace-hilty-uvAhJHLul_Q-unsplash.jpg',
  },
};
