import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { Product } from "../model/product.model";
import { ProductService } from "../services/product.service";
import { UtilsService } from "../services/utils.service";

@Component({
  selector: "app-new-product",
  templateUrl: "./new-product.component.html",
  styleUrls: ["./new-product.component.scss"]
})
export class NewProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private producService: ProductService, public utils: UtilsService) {}

  // convenience getter for easy access to form fields
  get f() {
    return this.productForm.controls;
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: this.fb.control(null, Validators.required),
      price: this.fb.control(0, Validators.minLength(2)),
      promotion: this.fb.control(false)
    });
  }
  submit(): void {
    this.producService.addNewProduct(this.productForm.value).subscribe(
      (data: Product) => {
        console.log("Ajout produit succès");
        this.productForm.reset();
      },
      error => {
        console.log(error);
      }
    );
  }
}
