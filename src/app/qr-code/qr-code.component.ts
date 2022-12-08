import {Component, ViewChild, AfterViewInit} from "@angular/core";
import {BarcodeScannerLivestreamComponent} from "ngx-barcode-scanner";
import {HttpClient} from '@angular/common/http';
// @ts-ignore
import AOS, {refresh} from "aos";
import {FormBuilder, Validators} from "@angular/forms";


@Component({
  selector: "app-qr-code",
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent implements AfterViewInit {
  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent | undefined;

  qrCode: any;
  data: any
  product: any;
  productAr: any;
  toggle7 = true;
  toggle6 = true;
  toggle5 = false;
  toggle4 = true;
  toggle3 = false;
  toggle2 = true;
  toggle = true;
  audio: any;
  AOS: any;
  isSubmitted = false;
  Condit: any = ['Plastique', 'Verre', 'Papier', 'Ordure Ménagères'];
  categoryName: any;
  name: any;
  productCode: any;


  ngAfterViewInit() {
    new Promise((resolve, reject) => {
      // @ts-ignore
      resolve(this.barcodeScanner.start())
    }).then(() => {
      this.toggle4 = false;

    })
    AOS.init();
  }

  onValueChanges(result: { codeResult: { code: any; }; }) {
    this.toggle2 = true;
    this.data = result.codeResult.code;
    this.httpClient.get('https://world.openfoodfacts.org/api/v2/search?code=' + this.data).subscribe((data: any) => {
      if (data.products.length != 0) {
        this.audio = new Audio();
        this.audio.src = "../assets/Apple-Sound.mp4";
        this.audio.load();
        this.audio.play();
        this.product = data.products[0] ?? null;
        this.toggle3 = false;
      }
      // @ts-ignore
      this.barcodeScanner.stop();

      this.productAr = {
        marque: this.product.brands ?? null,
        packaging: this.product.packaging ?? null,
        image: this.product.image_front_small_url ?? null
      }

      if (this.productAr.brands == null || this.productAr.brands == "") {
        this.toggle5 = true;
      } else {
        this.toggle5 = false;
      }

      if (this.productAr.packaging == null || this.productAr.packaging == "") {
        this.toggle5 = true;
      } else {
        this.toggle5 = false;
      }
      if (this.productAr.brands == "") {
        this.toggle6 = false;
      }
      if (this.productAr == null) {
        this.toggle3 = true;
      }
    });
  }

  constructor(private httpClient: HttpClient, public fb: FormBuilder) {}

  codebarForm = this.fb.group({
    categoryName: ['', [Validators.required]],
  });

  changeCategory(event: any) {
    this.categoryName?.setValue(event.target.value, {
      onlySelf: true,
    });
  }

  productForm = this.fb.group({
    productName: ['', [Validators.required]],
  });

  changeProduct(event: any) {
    this.categoryName?.setValue(event.target.value, {
      onlySelf: true,
    });
  }

  getProductName() {
    return this.codebarForm.get('productName');
  }

  again() {
    location.reload()
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (!this.codebarForm.valid) {
      false;
    }
  }

  ngOnInit(): void {
    this.productAr = null;
  }

  onSubmit2(): void {
    this.productAr = null;
    this.productCode = JSON.stringify(this.productForm.value.productName);
    if (this.productCode) {
      this.toggle7 = true;
    }
    this.httpClient.get('https://world.openfoodfacts.org/api/v2/search?code=' + this.productCode).subscribe((data: any) => {
      if (data.products.length != 0) {
        this.audio = new Audio();
        this.audio.src = "../assets/Apple-Sound.mp4";
        this.audio.load();
        this.audio.play();
        this.product = data.products[0];
        this.toggle3 = false;
      }
      // @ts-ignore
      this.barcodeScanner.stop();

      this.product = data.products[0];
      this.productAr = {
        marque: this.product.brands,
        packaging: this.product.packaging,
        image: this.product.image_front_small_url
      }

    });

    if (this.productAr == null) {
      this.toggle3 = true;
    } else {
      this.toggle3 = false;
    }

  }
}

