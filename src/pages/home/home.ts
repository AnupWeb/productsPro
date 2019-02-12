import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductProvider} from "../../providers/product/product";
import { ProductDetailPage } from "../product-detail/product-detail";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public allProducts=[];

  constructor(public navCtrl: NavController, private productServices: ProductProvider) {

  }

  ionViewDidLoad(){
    this.productServices.getProducts().subscribe((response) => {this.allProducts= response});
  }
  goToProductDetailPage(product){
    this.navCtrl.push(ProductDetailPage,{productDetails:product});
  }

}
