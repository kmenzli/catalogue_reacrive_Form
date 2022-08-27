import { Injectable } from "@angular/core";
import { UUID } from "angular2-uuid";
import { Observable, of, throwError } from "rxjs";
import { PageProduct, Product } from "../model/product.model";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private products!: Array<Product>;

  constructor() {
    this.products = [
      {
        id: UUID.UUID(),
        name: "computer",
        price: 2500,
        promotion: false
      },
      {
        id: UUID.UUID(),
        name: "Printer",
        price: 4500,
        promotion: false
      },
      {
        id: UUID.UUID(),
        name: "Phone",
        price: 1400,
        promotion: true
      },
      {
        id: UUID.UUID(),
        name: "Window",
        price: 1400,
        promotion: true
      },
      {
        id: UUID.UUID(),
        name: "Cartable",
        price: 500,
        promotion: true
      },
      {
        id: UUID.UUID(),
        name: "Pen",
        price: 300,
        promotion: true
      }
    ];
  }
  getAllproducts(): Observable<Array<Product>> {
    return of([...this.products]);
  }
  getPageProducts(page: number, size: number): Observable<PageProduct> {
    let index = page * size;
    let total = ~~this.products.length / size;
    if (this.products.length % size !== 0) total = Math.round(total);
    let content = this.products.slice(index, index + size);

    return of({ content: content, page: page, total: total, size: size });
  }
  deleteProduct(id: string): Observable<boolean> {
    this.products = this.products.filter((p: Product) => p.id != id);
    return of(true);
  }
  handlePromotion(id: string): Observable<boolean> {
    let product = this.products.find(p => (p.id = id));
    if (product) {
      product.promotion = !product.promotion;

      return of(true);
    } else {
      return throwError(() => new Error("Product not found !!!"));
    }
  }
  filterProducts(key: string, page: number, size: number): Observable<PageProduct> {
    let product = this.products.filter(p => p.name.includes(key));
    let index = page * size;
    console.log("INDX ---->", index);
    let total = ~~product.length / size;
    if (total < 1) total = 0;
    if (product.length % size !== 0) total++;
    console.log("TOTAL ---->", total);
    let content = product.slice(index, index + size);
    return of({ content: content, page: page, total: total, size: size });
  }

  addNewProduct(product: Product): Observable<Product> {
    product.id = UUID.UUID();
    this.products.push(product);
    return of(product);
  }
  findProductById(id: string): Observable<Product | undefined> {
    return of(this.products.find((p: Product) => p.id === id));
  }
  updateProduct(updateProduct: Product): Observable<any | undefined> {
    console.log("updateddddddddddddddddd", updateProduct);
    this.products = this.products.map( (p: Product) => (p.id === updateProduct.id)?updateProduct:p);
    console.log("updateddddddddddddddddd", this.products);
   return of (this.products);
  }
}
