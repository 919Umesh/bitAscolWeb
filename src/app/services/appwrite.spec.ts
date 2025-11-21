import { TestBed } from '@angular/core/testing';
import { AppwriteBaseService } from './appwrite';



describe('Appwrite', () => {
  let service: AppwriteBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppwriteBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
