import { Component } from '@angular/core';
import { SidebarExpandService } from 'src/app/services/sidebar-expand.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(
    public sidebarExpandService: SidebarExpandService,
  ) {}
}
