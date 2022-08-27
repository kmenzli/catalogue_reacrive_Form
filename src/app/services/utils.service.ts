import { Injectable } from "@angular/core";
import { ValidationErrors } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class UtilsService {
  constructor() {}

  getErrorMessage(name: string, errors: ValidationErrors): string {
    if (errors["required"]) {
      return name + " is Required";
    }
    if (errors["minlength"]) {
      return name + " should have at least " + errors["minlength"]["requiredLength"] + " Characters";
    }

    return "";
  }
}
