import { TestBed } from '@angular/core/testing';

import { SidebarExpandService } from './sidebar-expand.service';

describe('SidebarExpandService', () => {
  let service: SidebarExpandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarExpandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
