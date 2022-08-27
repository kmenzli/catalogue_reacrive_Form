import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { PageProduct, Product } from "../model/product.model";
import { AuthenticationService } from "../services/authentication.service";
import { ProductService } from "../services/product.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  products!: Array<Product>;
  errorMessage!: string;
  searchFormGroup!: FormGroup;
  currentPage: number = 0;
  size: number= 2;
  total: number = 0;
  mode: string = "all";

  constructor(private productService: ProductService, private fb: FormBuilder, 
    public authService: AuthenticationService,
    private router: Router) {}

  ngOnInit(): void {
    
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(null)
    });
    //this.loadData();
    this.loadDataByPage(this.currentPage,this.size);
  }
  filter() : void {
    this.mode = "search";
    this.currentPage = 0;
    
    this.productService.filterProducts(this.searchFormGroup.value.keyword,this.currentPage, this.size).subscribe( data => {
      console.log(JSON.stringify(data.content));
      this.products = data.content; 
      this.total = data.total;
    },
    error => {
      console.log("Erreur ", error);
    },
    () => {
      console.log("recherche terminée !!!")
    })

  }
  loadDataByPage(index: number, size: number) {
    this.mode = "all";
   
    this.productService.getPageProducts(index,size).subscribe(
      (data: PageProduct) => {
        this.products = data.content;
        this.total = data.total
      },
      e => {
        console.log(e);
        this.errorMessage = e;
      },
      () => {
        console.log("complete");
      }
    );
    console.log("======> Total,", this.total);
    console.log("======> products,", this.products);
  }
  loadData() {
    this.productService.getPageProducts(2,2).subscribe(data => {
      console.log(JSON.stringify(data));
    })
   
    this.productService.getAllproducts().subscribe(
      data => {
        this.products = data;
      },
      e => {
        console.log(e);
        this.errorMessage = e;
      },
      () => {
        console.log("complete");
      }
    );
  }
  handleDleteProduct(p: Product): void {
    let confirmation = confirm("Are you sur to delete ?");

    if (confirmation === true) {
      this.productService.deleteProduct(p.id).subscribe(data => {
        let index = this.products.indexOf(p);
        this.products.splice(index, 1);
      });
    }
  }
  handlePromotion(p: Product): void {
    let promo = p.promotion;
    this.productService.handlePromotion(p.id).subscribe(
      (data: boolean) => {
        p.promotion = !promo;
      },
      e => {
        this.errorMessage = e;
      }
    );
  }
  selectPage(index: number) {
    if (this.mode === "all")
    this.loadDataByPage(index, this.size);
    else 
    this.filter();
  }
  newProduct() : void {
    this.router.navigateByUrl("admin/new-product");
  }
  handleEditProduct(): void{

  }
}
