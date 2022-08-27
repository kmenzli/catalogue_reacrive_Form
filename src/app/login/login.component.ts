import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthenticationService } from "../services/authentication.service";

import { User } from "../model/user.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  userAuthenticationForm!: FormGroup;
  errorMessage!: string;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.userAuthenticationForm = this.fb.group({
      userName: this.fb.control(null),
      password: this.fb.control(null)
    });
  }
  handleLogin(): void {
    let username = this.userAuthenticationForm.value.userName;
    let password = this.userAuthenticationForm.value.password;

    this.authenticationService.login(username, password).subscribe(
      (data: User) => {
        this.authenticationService.authenticateUser(data).subscribe(
          (value: Boolean) => {
            this.router.navigateByUrl("/admin");
          },
          error => {
            
            console.log("============>", this.errorMessage);
          }
        );
      },
      error => {
        this.errorMessage = error;
        console.log("Error Getting Location: ", error);
      }
    );
  }
}
