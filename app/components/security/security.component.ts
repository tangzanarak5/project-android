import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
    selector: "security",
    templateUrl: "security.component.html",
    moduleId: module.id
})

export class SecurityComponent implements OnInit {
    constructor(private router: Router) { }
    ngOnInit () {
        // this.router.navigate(["/security/standbytologin"]);
    }
 }