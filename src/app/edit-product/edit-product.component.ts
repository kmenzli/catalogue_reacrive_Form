import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../model/product.model";
import { ProductService } from "../services/product.service";
import { UtilsService } from "../services/utils.service";

@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.scss"]
})
export class EditProductComponent implements OnInit {
  product_id!: string;
  product!: Product;
  productForm!: FormGroup;

  constructor(private router: Router,private actRoute: ActivatedRoute, private productService: ProductService, private fb: FormBuilder, public utils:UtilsService) {}

  ngOnInit(): void {
    this.product_id = this.actRoute.snapshot.params["id"];
    this.productService.findProductById(this.product_id).subscribe(
      (p: Product | undefined) => {
        console.log(p);
        this.product = p!;
        this.productForm = this.fb.group({
          name: this.fb.control(this.product.name, Validators.required),
          price: this.fb.control(this.product.price, Validators.minLength(2)),
          promotion: this.fb.control(this.product.promotion)
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  submit(): void {

    let p = this.productForm.value;
    p.id = this.product.id;
    this.productService.updateProduct(p).subscribe(
      (data) => {
        console.log("Updated produit succès");
        this.productForm.reset();
        this.router.navigateByUrl("/admin/products");
      },
      error => {
        console.log(error);
      }
    );
  }
}
