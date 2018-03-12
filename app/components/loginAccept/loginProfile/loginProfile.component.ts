import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ViewContainerRef } from "@angular/core";
import { securityService } from "../../security/security.service";
import { connectionType, getConnectionType } from "connectivity";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { loginProfileService } from "./loginProfile.service";
import * as wrapLayoutModule from "tns-core-modules/ui/layouts/wrap-layout";
import * as dialogs from "ui/dialogs";
import { ActivityIndicator } from "ui/activity-indicator";
import * as utils from "utils/utils";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { sideBarComponent } from "../loginProfile/sideBar/sideBar.component";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import {LoadingIndicator} from "nativescript-loading-indicator";
import { barCodeComponent } from "../loginProfile/barCode.component";
import * as datePickerModule from "tns-core-modules/ui/date-picker";

@Component({
    selector: "loginProfile",
    templateUrl: "loginProfile.component.html",
    styleUrls: ['loginProfile.component.css'],
    moduleId: module.id
})


export class loginProfileComponent implements OnInit {

    dataUser ;
    cid ;
    nameAndsurname ;
    hospitalnumber ;
    gender ;
    dob ;
    blood ;
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

    @ViewChild('sidebar') sideBar: sideBarComponent

    openDrawer () {
        this.sideBar.openDrawer();
    }

    ngOnInit(): void {
        
        // if (securityService.getDataUser == "") {this.router.navigate(["/security/standbytologin"]);}
        this.dataUser = JSON.parse(securityService.getDataUser);
        console.log(JSON.stringify(this.dataUser.dataset));
        console.log(this.dataUser.dataset.hn)
        this.nameAndsurname = this.dataUser.dataset.fname + " " + this.dataUser.dataset.lname
        this.hospitalnumber = this.dataUser.dataset.hn
        this.cid = this.dataUser.dataset.cid
        this.gender = "เพศ " + this.dataUser.dataset.gender
        this.dob = "วันเกิด " + this.dataUser.dataset.dob
        // if (this.dataUser.dataset.blood == null) {
        //     this.blood = "เลือด -"
        // }
        // else {this.blood = "เลือด " + this.dataUser.dataset.blood}
    }

    constructor(
        private fonticon: TNSFontIconService,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private route: ActivatedRoute,
        private router: Router,
        private loginProfileService: loginProfileService,
        page: Page) {
            
            route.url.subscribe((s:UrlSegment[]) => {
                console.log("url", s);
            });
    }

    toAppointment () {
        this.loader.show(this.options);
        console.log("connect");
        this.router.navigate(["/appointment"]);
        this.demoLoader();
    }

    toBlood () {
        this.loader.show(this.options);
        console.log("connect");
        this.router.navigate(["/bloodResult"]);
        this.demoLoader();
    }

    toCost () {
        this.loader.show(this.options);
        console.log("connect");
        this.router.navigate(["/cost"]);
        this.demoLoader();
    }

    toMedicine () {
        this.loader.show(this.options);
        console.log("connect");
        this.router.navigate(["/medicine"]);
        this.demoLoader();
    }

    toProfileUser () {
        this.loader.show(this.options);
        console.log("connect");
        this.router.navigate(["/profileUser"]);
        this.demoLoader();
    }

    toHome () {
        this.loader.show(this.options);
        console.log("connect");
        this.router.navigate(["/loginProfile"]);
        this.demoLoader();
    }

    news () {
        this.loader.show(this.options);
        utils.openUrl("https://newsbhu.firebaseapp.com/#/");
        this.demoLoader();
    }
    web () {
        this.loader.show(this.options);
        utils.openUrl("https://www.cpa.go.th//#/");
        this.demoLoader();
    }
    public showBarcode() {
        console.log("barcode");
        let options = {
            context: {},
            fullscreen: false,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(barCodeComponent, options).then(res => {
 
            
        });
    }
    private demoLoader() {
        setTimeout(() => {
          this.loader.hide();
        }, 1000);
      }
 }