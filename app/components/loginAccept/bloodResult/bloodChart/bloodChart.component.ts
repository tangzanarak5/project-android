import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ViewContainerRef } from "@angular/core";
import { securityService } from "../../../security/security.service";
import { connectionType, getConnectionType } from "connectivity";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { loginProfileService } from "../../loginProfile/loginProfile.service";
import * as wrapLayoutModule from "tns-core-modules/ui/layouts/wrap-layout";
import * as dialogs from "ui/dialogs";
import { ActivityIndicator } from "ui/activity-indicator";
import * as utils from "utils/utils";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import {LoadingIndicator} from "nativescript-loading-indicator";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import * as frameModule from "tns-core-modules/ui/frame";
import {Input, ChangeDetectionStrategy} from '@angular/core';
import { selectBloodResult } from "../../../security/model/selectBloodResult.model"
import { standard } from "../../../security/model/standard.model"
import { showStandardComponent } from "../bloodResultSelectTotal/showStandard/showStandard.component";
import { sideBarComponent } from "../../loginProfile/sideBar/sideBar.component";
import { bloodChartService } from "./bloodChart.service";
class DataItem {
    constructor(public id: number, public name: string) { }
}

@Component({
    selector: "bloodChart",
    templateUrl: "bloodChart.component.html",
    styleUrls: ['bloodChart.component.css'],
    moduleId: module.id
})


export class bloodChartComponent implements OnInit {

    private _categoricalSource: ObservableArray<any>;
    selectBloodResult: selectBloodResult ;
    standard: standard ;
    public myItems: Array<DataItem>;
    private counter: number;
    bloodResult ;
    resultTotal = [] ;
    isChart = false;
    testone = 1 ;
    dataUser ;
    hospitalnumber ;
    loader = new LoadingIndicator();
    count ;
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

      ngOnInit(): void {
        this.loader.hide();

        setTimeout(() => {
            this.isChart = true;
          }, 1000);

        this.selectBloodResult = JSON.parse(securityService.getSelectBloodResult);
        console.log(securityService.getSelectBloodResult);
        this.standard = new standard ;
        this.standard.name = this.selectBloodResult.name ;
        this.standard.numberIndex = this.selectBloodResult.numberIndex ;
        securityService.setStandard = JSON.stringify(this.standard);
        console.log(securityService.getStandard);

        if (this.selectBloodResult.name == "ชีพจร") {
            this._categoricalSource = new ObservableArray(this.bloodChartService.getP());
        }
        if (this.selectBloodResult.name == "ความดันโลหิต") {
            this._categoricalSource = new ObservableArray(this.bloodChartService.getBP());
        }
        if (this.selectBloodResult.name == "คอเลสเตอรอลที่ดี") {
            this._categoricalSource = new ObservableArray(this.bloodChartService.getHDL());
        }
        if (this.selectBloodResult.name == "ไขมันไม่ดี") {
            this._categoricalSource = new ObservableArray(this.bloodChartService.getLDL());
        }
        if (this.selectBloodResult.name == "ระดับน้ำตาลในเลือด") {
            this._categoricalSource = new ObservableArray(this.bloodChartService.getFBS());
        }
        if (this.selectBloodResult.name == "ระดับน้ำตาลเฉลี่ยในเลือด") {
            this._categoricalSource = new ObservableArray(this.bloodChartService.getHBAONEC());
        }
        
    }

    constructor(
        private fonticon: TNSFontIconService,
        private _changeDetectionRef: ChangeDetectorRef,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private route: ActivatedRoute,
        private router: Router,
        private bloodChartService: bloodChartService,
        page: Page) {
            this.loader.show(this.options);
            route.url.subscribe((s:UrlSegment[]) => {
                console.log("url", s);
            });
    }

    openDrawer () {
        this.sideBar.openDrawer();
    }

    get categoricalSource(): ObservableArray<any> {
      return this._categoricalSource;
    }

    toBack () {
        console.log("connect");
        this.router.navigate(["/bloodResultSelectTotal"]);
    }
  
 }