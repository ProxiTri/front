import {Component, ViewChild, AfterViewInit, Input} from "@angular/core";
import {BarcodeScannerLivestreamComponent} from "ngx-barcode-scanner";
import {HttpClient} from '@angular/common/http';
// @ts-ignore
import AOS, {refresh} from "aos";
import {FormBuilder, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { exit } from "process";




@Component({
  selector: "app-qr-code",
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent implements AfterViewInit {
  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent | undefined;

  test:any;
  state: any = {};
  qrCode: any;
  data: any
  product: any;
  productAr: any;
  togglePla = true;
  toggleOm = true;
  toggleVerre = true;
  togglePapier = true;
  toggle9 = true;
  toggle8 = true;
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
  Condit: any = ['PLASTIQUE', 'VERRE', 'PAPIER', 'ORDURES MENAGERES'];
  categoryName: any;
  name: any;
  productCode: any;
  uppercaseParams: any;


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
        marque: this.product.brands || "",
        packaging: this.product.packaging || "",
        image: this.product.image_front_small_url || ""
      }

      if ( this.productAr.packaging == "") {
        this.toggle5 = true;
        
      } else {
        this.toggle5 = false;
      }
      if (this.productAr.marque == "") {
        this.toggle6 = false;
      }
      if (this.productAr == null) {
        this.toggle3 = true;
      }
      if(this.productAr.packaging.indexOf('plastique') > -1 || this.productAr.packaging.indexOf('Plastique') > -1 || this.productAr.packaging.indexOf('PLASTIQUE') > -1 ){
        this.uppercaseParams = "PLASTIQUE"
        this.togglePla = true;
        this.toggleVerre = false;
        this.togglePapier = false;
        this.toggleOm = false;

      }else if(this.productAr.packaging.indexOf('verre') > -1 || this.productAr.packaging.indexOf('Verre') > -1 || this.productAr.packaging.indexOf('VERRE') > -1){
        this.uppercaseParams = "VERRE"
        this.toggleVerre = true;
        this.togglePla = false;
        this.togglePapier = false;
        this.toggleOm = false;

      }else if(this.productAr.packaging.indexOf('papier') > -1 || this.productAr.packaging.indexOf('Papier') > -1 || this.productAr.packaging.indexOf('PAPIER') > -1 || this.productAr.packaging.indexOf('Papiers') > -1 || this.productAr.packaging.indexOf('papiers') > -1 || this.productAr.packaging.indexOf('PAPIERS') > -1){
        this.uppercaseParams = "PAPIER"
        this.togglePapier = true;
        this.togglePla = false;
        this.toggleVerre = false;
        this.toggleOm = false;
      }else{
        this.uppercaseParams = "ORDURES MENAGERES"
        console.log("OM")
        this.toggleOm = true;
        this.togglePla = false;
        this.toggleVerre = false;
        this.togglePapier = false;
      }
    });
  }

  constructor(private httpClient: HttpClient, public fb: FormBuilder, private router: Router, private upperCasePipe: UpperCasePipe ) {}

  codebarForm = this.fb.group({
    categoryName: ['', [Validators.required]],
  });

  changeCategory(event: any) {
    if(event.target.value.indexOf('plastique') > -1 || event.target.value.indexOf('Plastique') > -1 || event.target.value.indexOf('PLASTIQUE') > -1 ){
      this.togglePla = true;
      this.toggleVerre = false;
      this.togglePapier = false;
      this.toggleOm = false;

    }else if(event.target.value.indexOf('verre') > -1 || event.target.value.indexOf('Verre') > -1 || event.target.value.indexOf('VERRE') > -1){
      this.toggleVerre = true;
      this.togglePla = false;
      this.togglePapier = false;
      this.toggleOm = false;

    }else if(event.target.value.indexOf('papier') > -1 || event.target.value.indexOf('Papier') > -1 || event.target.value.indexOf('PAPIER') > -1 || event.target.value.indexOf('Papiers') > -1 || event.target.value.indexOf('papiers') > -1 || event.target.value.indexOf('PAPIERS') > -1){
      this.togglePapier = true;
      this.togglePla = false;
      this.toggleVerre = false;
      this.toggleOm = false;
    }else{
      this.uppercaseParams = "ORDURES MENAGERES"
      this.toggleOm = true;
      this.togglePla = false;
      this.toggleVerre = false;
      this.togglePapier = false;
    }






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
      try {
        if (data.products.length != 0) {
          this.toggle9 = true;

          this.audio = new Audio();
          this.audio.src = "../assets/Apple-Sound.mp4";
          this.audio.load();
          this.audio.play();
          this.product = data.products[0];
          this.toggle3 = false;
        
        // @ts-ignore
        this.barcodeScanner.stop();

      this.product = data.products[0];
      this.productAr = {
      id:this.product._id,
      count: this.product.count ,
      marque: this.product.brands,
      packaging: this.product.packaging,
      image: this.product.image_front_small_url
  }
        }else {
          this.toggle9 = false;
        }
      }catch(err){
        console.log(err)
      }
    });

  }

displayBin(){
  if (!this.product.packaging) {
    this.uppercaseParams = this.upperCasePipe.transform(this.codebarForm.value.categoryName)
    this.router.navigate(
      ['/map'],
      { queryParams: { search:  this.uppercaseParams} }
    );
    if (!this.codebarForm.valid) {
      false;
    }
  }

  if(this.productAr.packaging.indexOf('plastique') > -1 || this.productAr.packaging.indexOf('Plastique') > -1 || this.productAr.packaging.indexOf('PLASTIQUE') > -1 ){
    this.uppercaseParams = "PLASTIQUE"
    this.router.navigate(
      ['/map'],
      { queryParams: { search:  this.uppercaseParams} }
    );
  }else if(this.productAr.packaging.indexOf('verre') > -1 || this.productAr.packaging.indexOf('Verre') > -1 || this.productAr.packaging.indexOf('VERRE') > -1){
    this.uppercaseParams = "VERRE"
    this.router.navigate(
      ['/map'],
      { queryParams: { search:  this.uppercaseParams} }
    );
  }else if(this.productAr.packaging.indexOf('papier') > -1 || this.productAr.packaging.indexOf('Papier') > -1 || this.productAr.packaging.indexOf('PAPIER') > -1 || this.productAr.packaging.indexOf('Papiers') > -1 || this.productAr.packaging.indexOf('papiers') > -1 || this.productAr.packaging.indexOf('PAPIERS') > -1){
    this.uppercaseParams = "PAPIER"
    this.router.navigate(
      ['/map'],
      { queryParams: { search:  this.uppercaseParams} }
    );
  }else{
    this.uppercaseParams = "ORDURES MENAGERES"
    this.router.navigate(
      ['/map'],
      { queryParams: { search:  this.uppercaseParams} }
    );
  }
}

}

