import { TestBed } from '@angular/core/testing';

import { GenerateImageService } from './generate-image.service';

describe('GenerateImageService', () => {
  let service: GenerateImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
