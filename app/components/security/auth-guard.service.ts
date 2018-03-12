import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { securityService } from "./security.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    if (securityService.isLoggedIn()) {
      console.log("true");
      return true;
    }
    else {
      this.router.navigate(["/security/standbytologin"]);
      console.log("false");
      return false;
    }
  }
}