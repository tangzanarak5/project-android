import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ViewContainerRef } from "@angular/core";
import { securityService } from "../../security/security.service";
import { connectionType, getConnectionType } from "connectivity";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { loginProfileService } from "../loginProfile/loginProfile.service";
import * as wrapLayoutModule from "tns-core-modules/ui/layouts/wrap-layout";
import * as dialogs from "ui/dialogs";
import { ActivityIndicator } from "ui/activity-indicator";
import * as utils from "utils/utils";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { sideBarComponent } from "../loginProfile/sideBar/sideBar.component";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import {LoadingIndicator} from "nativescript-loading-indicator";
import {Input, ChangeDetectionStrategy} from '@angular/core';
import { diseases } from "../../security/model/diseases.model"
import { medicineService } from "./medicine.service";

class DataItem {
    constructor(public id: number, public name: string) { }
}

@Component({
    selector: "medicine",
    templateUrl: "medicine.component.html",
    styleUrls: ['medicine.component.css'],
    moduleId: module.id
})


export class medicineComponent implements OnInit {

    public myItems: Array<DataItem>;
    private counter: number;
    diseases: diseases ;
    dataUser ;
    hospitalnumber ;
    loader = new LoadingIndicator();
    connect = true ;
    dataMidicine ;
    medicineNumber ;

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
        this.diseases = new diseases ;
        this.diseases.name = "" ;
        this.diseases = JSON.parse(securityService.getDiseases);
        this.dataUser = JSON.parse(securityService.getDataUser);
        this.hospitalnumber = this.dataUser.dataset.hn
        console.log(this.hospitalnumber) ;
        this.medicineService.getDataDayMedicine(this.hospitalnumber)
                    .subscribe(
                        (Response) => {
                          // console.log(JSON.stringify(Response));
                          this.dataMidicine = Response.dataset ;
                          // console.log(this.dataMidicine) ;
                        },
                        (error) => {
                            console.log("data error") ;
                            alert("กรุณาลองอีกครั้ง");
                            this.router.navigate(["/loginProfile"]);
                        }
                    )
    }

    constructor(
        private fonticon: TNSFontIconService,
        private _changeDetectionRef: ChangeDetectorRef,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private route: ActivatedRoute,
        private router: Router,
        private medicineService: medicineService,
        page: Page) {
            route.url.subscribe((s:UrlSegment[]) => {
                console.log("url", s);
            });

}
public onItemTap(args) {
    this.loader.show(this.options);
    console.log("------------------------ ItemTapped: " + this.dataMidicine[args.index].visitdate);
    this.diseases.name = this.dataMidicine[args.index].visitdate ;
    securityService.setDiseases = JSON.stringify(this.diseases);
    console.log(securityService.getDiseases);
    this.router.navigate(["/medicineSelect"]);
    this.demoLoader();
}
toBack () {
    this.loader.show(this.options);
    console.log("connect");
    this.router.navigate(["/loginProfile"]);
    this.demoLoader();
}

private demoLoader() {
    setTimeout(() => {
      this.loader.hide();
    }, 2000);
  }
    getMedicine (number) {
        this.connect = false
        this.medicineNumber = number ;
        console.log(this.medicineNumber)
    }

 }