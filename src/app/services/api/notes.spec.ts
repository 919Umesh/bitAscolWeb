import { TestBed } from '@angular/core/testing';
import { NoticesService } from './notices';

describe('Notes', () => {
  let service: NoticesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
