import { Component} from '@angular/core';
import { SidebarExpandService } from 'src/app/services/sidebar-expand.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor (public sidebarExpand: SidebarExpandService) {}
  
}
