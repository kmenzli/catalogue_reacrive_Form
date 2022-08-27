import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { User } from "../model/user.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-template",
  templateUrl: "./admin-template.component.html",
  styleUrls: ["./admin-template.component.scss"]
})
export class AdminTemplateComponent implements OnInit {
  authenticatedUser!: User | undefined;
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.authenticatedUser = this.authenticationService.authenticatedUser;
  }
  logout(): void {
    this.authenticationService.logout().subscribe((data: Boolean) => {
      this.router.navigateByUrl("login");
    });
  }
}
