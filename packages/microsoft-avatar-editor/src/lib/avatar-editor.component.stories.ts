import { provideAnimations } from '@angular/platform-browser/animations';
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { NgxAvatarEditorComponent } from './avatar-editor.component';

const meta: Meta<NgxAvatarEditorComponent> = {
  component: NgxAvatarEditorComponent,
  title: 'Components/MicrosoftAvatarEditor',
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<NgxAvatarEditorComponent>;

export const Primary: Story = {
  args: {
    src: 'grace-hilty-uvAhJHLul_Q-unsplash.jpg',
  },
};
