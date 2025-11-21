import { TestBed } from '@angular/core/testing';

import {  ResourcesService } from './resources';

describe('Resources', () => {
  let service: ResourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
