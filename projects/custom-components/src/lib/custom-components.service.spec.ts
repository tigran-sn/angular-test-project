import { TestBed } from '@angular/core/testing';

import { CustomComponentsService } from './custom-components.service';

xdescribe('CustomComponentsService', () => {
  let service: CustomComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
