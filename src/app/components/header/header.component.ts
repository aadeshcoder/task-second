import { Component } from '@angular/core';
import { SidebarExpandService } from 'src/app/services/sidebar-expand.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private sidebarExpand:SidebarExpandService) {}

  isExpand:boolean = true;

  // method to handle the sidebar expansion
  handleClick () {
    this.isExpand = !(this.isExpand);
    this.sidebarExpand.isExpand = this.isExpand;
    console.log("Expanding sidebar", this.isExpand);
  }
}
