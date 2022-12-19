import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isExpand:boolean;

  // method to handle the sidebar expansion
  handleClick () {
    this.isExpand = !(this.isExpand);
    console.log("Expanding sidebar", this.isExpand);
  }
}
