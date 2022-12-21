import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarExpandService {

  constructor() { }

  isExpand:boolean = true;
}
