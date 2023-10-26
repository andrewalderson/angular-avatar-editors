import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngx-avatar-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar-editor.component.html',
  styleUrls: ['./avatar-editor.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarEditorComponent {}
