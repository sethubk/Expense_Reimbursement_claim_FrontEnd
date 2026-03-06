import { Component } from '@angular/core';
import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ClarityModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

opened = false;
  size: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen' = 'md';

  openPanel(sz: typeof this.size = 'md') {
    this.size = sz;
    this.opened = true;
  }

}
