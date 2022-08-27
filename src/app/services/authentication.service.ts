import { Injectable } from "@angular/core";
import { UUID } from "angular2-uuid";
import { Observable, of, throwError } from "rxjs";
import { User } from "../model/user.model";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  authenticatedUser: User | undefined;
  users: User[] = [
    {
      userId: UUID.UUID(),
      userName: "khemais",
      password: "123456",
      roles: ["ADMIN", "USER"]
    },
    {
      userId: UUID.UUID(),
      userName: "abdo",
      password: "123456",
      roles: ["USER"]
    }
  ];

  constructor() {}

  login(username: string, password: string): Observable<User> {
    let loggedUser = this.users.find(u => u.userName === username);
    if (!loggedUser) {
      return throwError(() => new Error("User not found !!!"));
    }
    if (loggedUser) {
      if (loggedUser.password !== password) {
        return throwError(() => new Error("Bad credentials !!!"));
      }
    }
    return of(loggedUser);
  }

  authenticateUser(user: User): Observable<Boolean> {
    this.authenticatedUser = user;
    localStorage.setItem(
      "authUser",
      JSON.stringify({ userName: user.userName, roles: user.roles, userId: user.userId, jwt: "JWT_TOKEN" })
    );
    return of(true);
  }
  hasRole(role: string): Observable<Boolean> {
    return of(this.authenticatedUser!.roles.includes(role));
  }
  isAuthenticated(): Observable<Boolean> {
    console.log("======> authenticated user", this.authenticatedUser);
    return of(this.authenticatedUser != undefined);
  }
  logout(): Observable<Boolean> {
    this.authenticatedUser = undefined;
    localStorage.removeItem('authUser');
    return of(true);
  }
}
