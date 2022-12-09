import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ScanProductService } from './scan-product.service';
import {CommuneService} from "./commune.service";

describe('ScanProductService', () => {
  let service: ScanProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ScanProductService]
    });
    service = TestBed.inject(ScanProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(
    'should get one product by barcode',
    inject(
      [HttpTestingController, ScanProductService],
      (httpMock: HttpTestingController, scanProductService: ScanProductService) => {
        scanProductService.getProduct('barcode').subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Response:
              expect(event.body).toEqual({
                id: 1,
              });
          }
        })
      }
    )
  );
});
