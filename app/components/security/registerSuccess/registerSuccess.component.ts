import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { action } from "ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { securityService } from "../security.service";
import { user } from "../model/user.model"
import { ActivityIndicator } from "ui/activity-indicator";
import {LoadingIndicator} from "nativescript-loading-indicator";

@Component({
    selector: "registerSuccess",
    templateUrl: "registerSuccess.component.html",
    styleUrls: ['registerSuccess.component.css'],
    moduleId: module.id
})

export class registerSuccessComponent implements OnInit {

    loader = new LoadingIndicator();

     options = {
        message: 'Loading...',
        progress: 0.65,
        android: {
          indeterminate: true,
          cancelable: true,
          cancelListener: function(dialog) { console.log("Loading cancelled") },
          max: 100,
          progressNumberFormat: "%1d/%2d",
          progressPercentFormat: 0.53,
          progressStyle: 1,
          secondaryProgress: 1
        },
        ios: {
          details: "Additional detail note!",
          margin: 10,
          dimBackground: true,
          color: "#4B9ED6", // color of indicator and labels
          // background box around indicator
          // hideBezel will override this if true
          backgroundColor: "yellow",
          userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
          hideBezel: true, // default false, can hide the surrounding bezel
        }
      };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        page: Page
    ) { page.actionBarHidden = true;}

    ngOnInit(): void {
        
    }
    back () {
        this.loader.show(this.options);
        this.router.navigate(["/security/standbytologin"]);
        this.loader.hide();
    }
}