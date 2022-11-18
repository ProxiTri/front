import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { BarcodeScannerLivestreamComponent } from "ngx-barcode-scanner";
import { HttpClient } from '@angular/common/http';
import AOS from "aos";


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
  toggle4 = true;
  toggle3 = false;
  toggle2 = true;
  toggle = true;
  audio:any;
  AOS: any;

  ngAfterViewInit() {
    new Promise((resolve, reject) => {
      // @ts-ignore
      resolve(this.barcodeScanner.start())
    }).then(()=>{
      this.toggle4 = false;
    })
    AOS.init();
  }

  onValueChanges(result: { codeResult: { code: any; }; }) {
    this.toggle2 = true;
    this.data = result.codeResult.code;
    this.httpClient.get('https://world.openfoodfacts.org/api/v2/search?code='+this.data).subscribe((data:any)=>{
  //  this.product = data.products[0];
    if(data.products.length != 0 )
    {
      this.audio = new Audio();
      this.audio.src = "../assets/Apple-Sound.mp4";
      this.audio.load();
      this.audio.play();
      this.product = data.products[0];
      this.toggle3 = false;
    }
      // @ts-ignore
      this.barcodeScanner.stop();

    this.productAr = {
      marque: this.product.brands,
      packaging: this.product.packaging,
      image: this.product.image_front_small_url
    }});
    if (this.productAr == null){
      console.log("loading")
      this.toggle3 = true;
    }
  }

  constructor(private httpClient: HttpClient) { }

  again(){
    console.log("test")
    this.productAr = null;
    if (this.barcodeScanner instanceof BarcodeScannerLivestreamComponent) {
      this.barcodeScanner.start()
    }
  }

  ngOnInit(): void {
    this.productAr = null;
  }

}

