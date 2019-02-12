import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ProductProvider} from "../../providers/product/product";
import { ProductDetailPage } from "../product-detail/product-detail";
import { FilterModalPage } from "../filter-modal/filter-modal";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public allProducts=[];

  constructor(private modalController: ModalController, public navCtrl: NavController, private productService: ProductProvider) {

  }

  ionViewDidLoad(){
    this.productService.getProducts().subscribe((response) => {this.allProducts = response});
  }
  goToProductDetailPage(product){
    this.navCtrl.push(ProductDetailPage,{productDetails:product});
  }
  openFilterModal(){

  let openFilterModal = this.modalController.create(FilterModalPage);
      openFilterModal.onDidDismiss((filterState)=>{
        this.productService.getProducts().subscribe((allProduct)=>{
          let products = allProduct;
          if(filterState.maleSelected && filterState.femaleSelected){
            this.allProducts = products;
            return;

          }else if(!filterState.maleSelected && !filterState.femaleSelected){
            this.allProducts=[];
            return;
          }else if(filterState.maleSelected && !filterState.femaleSelected){
                this.allProducts = products.filter((product)=>{
                  return product.gender !=="male";
                });
          }else {
            this.allProducts = products.filter((product)=>{
              return product.gender !=="female";
            });
          }
        })
      });
      openFilterModal.present();

  }

}
