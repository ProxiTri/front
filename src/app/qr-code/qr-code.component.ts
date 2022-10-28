import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { BarcodeScannerLivestreamComponent } from "ngx-barcode-scanner";
import { HttpClient } from '@angular/common/http';



@Component({
  selector: "app-qr-code",
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent implements AfterViewInit {
  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent | undefined;

  qrCode:any;
  data:any
  product:any;
  productAr:any;

  ngAfterViewInit() {
    // @ts-ignore
    this.barcodeScanner.start();
  }

  onValueChanges(result: { codeResult: { code: any; }; }) {
    this.data = result.codeResult.code;
    this.httpClient.get('https://world.openfoodfacts.org/api/v2/search?code='+this.data).subscribe((data:any)=>{
  //  this.product = data.products[0];
    if(data.products.length != 0)     this.product = data.products[0];

      console.log(data)
    this.productAr = {
      marque: this.product.brands,
      packaging: this.product.packaging,
      image: this.product.image_front_small_url
    }});
    console.log(this.productAr)
  }

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.productAr = null;
  }

}

