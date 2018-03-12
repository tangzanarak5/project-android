import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ViewContainerRef } from "@angular/core";
import { securityService } from "../../../security/security.service";
import { connectionType, getConnectionType } from "connectivity";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { loginProfileService } from "../loginProfile.service";
import * as wrapLayoutModule from "tns-core-modules/ui/layouts/wrap-layout";
import * as dialogs from "ui/dialogs";
import { ActivityIndicator } from "ui/activity-indicator";
import * as utils from "utils/utils";
import { ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-pro-ui/sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-pro-ui/sidedrawer';
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import {LoadingIndicator} from "nativescript-loading-indicator";
import * as listViewModule from "tns-core-modules/ui/list-view";
import * as observableArray from "tns-core-modules/data/observable-array";
import * as labelModule from "tns-core-modules/ui/label";
import {Input, ChangeDetectionStrategy} from '@angular/core';
import {SetupItemViewArgs} from "nativescript-angular/directives";

class DataItem {
    constructor(public id: number, public name: string) { }
}

@Component({
    selector: "sidebar",
    templateUrl: "sideBar.component.html",
    styleUrls: ['sideBar.component.css'],
    moduleId: module.id
})


export class sideBarComponent implements AfterViewInit, OnInit {
    public myItems: Array<DataItem>;
    private counter: number;
    menu = [
        {
            name : "หน้าแรก",
            icon : "home",
            color : "lightgray"
        },
        {
            name : "ประวัติส่วนตัว",
            icon : "assignment",
            color : "lightgray"
        },
        {
            name : "ผลเลือด",
            icon : "favorite",
            color : "lightgray"
        },
        {
            name : "ยาและวิธีการรับประทาน",
            icon : "local_hospital",
            color : "lightgray"
        },
        {
            name : "ค่าใช้จ่าย",
            icon : "attach_money",
            color : "lightgray"
        },
        {
            name : "นัดแพทย์",
            icon : "event_note",
            color : "lightgray"
        },
        {
            name : "ข่าวสารและคำแนะนำการรักษา",
            icon : "import_contacts",
            color : "lightgray"
        },
        {
            name : "เว็บไซต์",
            icon : "web",
            color : "lightgray"
        },
        {
            name : "ออกจากระบบ",
            icon : "exit_to_app",
            color : "lightgray"
        }
    ] ;

    dataUser ;
    cid ;
    nameAndsurname ;
    hospitalnumber ;
    gender ;
    dob ;
    blood ;
    isLoading = true ;
    barcode ;
    private _mainContentText: string;

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

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    onSetupItemView(args: SetupItemViewArgs) {
        args.view.context.odd = (args.index === 8);
        args.view.context.even = (args.index !== 8);
    }
    public onItemTap(args) {
        console.log("ItemTapped: " + args.index);
        if (args.index == 0) {
            this.loader.show(this.options);
            this.drawer.closeDrawer();
            this.router.navigate(["/loginProfile"]);
            this.loader.hide();
        }
        if (args.index == 1) {
            this.loader.show(this.options);
            this.drawer.closeDrawer();
            this.router.navigate(["/profileUser"]);
            this.loader.hide();
        }
        if (args.index == 2) {
            this.loader.show(this.options);
            this.drawer.closeDrawer();
            this.router.navigate(["/bloodResult"]);
            this.loader.hide();
        }
        if (args.index == 3) {
            this.loader.show(this.options);
            this.drawer.closeDrawer();
            this.router.navigate(["/medicine"]);
            this.loader.hide();
        }
        if (args.index == 4) {
            this.loader.show(this.options);
            this.drawer.closeDrawer();
            this.router.navigate(["/cost"]);
            this.loader.hide();
        }
        if (args.index == 5) {
            this.loader.show(this.options);
            this.drawer.closeDrawer();
            this.router.navigate(["/appointment"]);
            this.loader.hide();
        }
        if (args.index == 6) {
            this.loader.show(this.options);
            this.drawer.closeDrawer();
            utils.openUrl("https://newsbhu.firebaseapp.com/#/")
            this.loader.hide();
        }
        if (args.index == 7) {
            this.loader.show(this.options);
            this.drawer.closeDrawer();
            utils.openUrl("https://www.cpa.go.th//#/")
            this.loader.hide();
        }
        if (args.index == 9) {
            this.loader.show(this.options);
            this.drawer.closeDrawer();
            this.router.navigate(["/loginProfile"]);
            this.loader.hide();
        }
        if (args.index == 8) {
            this.loader.show(this.options);
            this.drawer.closeDrawer();
            this.logout();
            this.loader.hide();
        }
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    get mainContentText() {
        return this._mainContentText;
    }

    set mainContentText(value: string) {
        this._mainContentText = value;
    }

     openDrawer() {
        this.drawer.showDrawer();
    }

     onCloseDrawerTap() {
       this.drawer.closeDrawer();
    }

    ngOnInit(): void {
        this.mainContentText = "SideDrawer for NativeScript can be easily setup in the HTML definition of your page by defining tkDrawerContent and tkMainContent. The component has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.";
        if (securityService.getDataUser == "") {this.router.navigate(["/security/standbytologin"]);}
        this.dataUser = JSON.parse(securityService.getDataUser);
        console.log(JSON.stringify(this.dataUser.dataset));
        console.log(this.dataUser.dataset.hn)
        this.nameAndsurname = this.dataUser.dataset.fname + " " + this.dataUser.dataset.lname
        this.hospitalnumber = this.dataUser.dataset.hn
        this.barcode = "https://barcode.tec-it.com/barcode.ashx?translate-esc=off&data=" + this.hospitalnumber + "&code=Code39&multiplebarcodes=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0" ;
        this.cid = this.dataUser.dataset.cid
        this.gender = "เพศ " + this.dataUser.dataset.gender
        this.dob = "วันเกิด " + this.dataUser.dataset.dob
        if (this.dataUser.dataset.blood == null) {
            this.blood = "เลือด -"
        }
        else {this.blood = "เลือด " + this.dataUser.dataset.blood}
    }

    constructor(
        private fonticon: TNSFontIconService,
        private _changeDetectionRef: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
        page: Page) {
    
    }
    tobeContinue () {
        alert("เมนูนี้ยังไม่เปิดให้ใช้บริการ");
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
    toAppointment () {
        this.loader.show(this.options);
        console.log("connect");
        this.router.navigate(["/appointment"]);
        this.demoLoader();
    }
    home () {
        this.loader.show(this.options);
        this.drawer.closeDrawer();
        this.router.navigate(["/loginProfile"]);
        this.demoLoader();
    }
    toProfileUser () {
        this.loader.show(this.options);
        this.drawer.closeDrawer();
        console.log("connect");
        this.router.navigate(["/profileUser"]);
        this.demoLoader();
    }
    news () {
        this.loader.show(this.options);
        this.drawer.closeDrawer();
        utils.openUrl("https://newsbhu.firebaseapp.com/#/")
        this.demoLoader();
        }
    web () { 
        this.loader.show(this.options);
        this.drawer.closeDrawer();
        utils.openUrl("https://www.cpa.go.th//#/")
        this.demoLoader();
         }
    logout () {
        dialogs.confirm({
            title: "ออกจากระบบ",
            cancelButtonText: "ตกลง",
            okButtonText: "ยกเลิก"
        }).then(result => {
            // result argument is boolean
            console.log("Dialog result: " + result);
            if (result == false) {
                this.isLoading = false ;
                securityService.setIsLogin = ""
                securityService.setDataUser = ""
                this.loader.show(this.options);
                this.drawer.closeDrawer();
                this.router.navigate(["/security/standbytologin"]);
                this.demoLoader();
            }
        });  
    }
    private demoLoader() {
        setTimeout(() => {
          this.loader.hide();
        }, 1000);
      }

 }