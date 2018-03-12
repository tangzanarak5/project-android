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
import { sideBarComponent } from "../../loginProfile/sideBar/sideBar.component";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import {LoadingIndicator} from "nativescript-loading-indicator";
import {Input, ChangeDetectionStrategy} from '@angular/core';
import { costSelect } from "../../../security/model/costSelect.model"

class DataItem {
    constructor(public id: number, public name: string) { }
}

@Component({
    selector: "selectCost",
    templateUrl: "selectCost.component.html",
    styleUrls: ['selectCost.component.css'],
    moduleId: module.id
})


export class selectCostComponent implements OnInit {
    public myItems: Array<DataItem>;
    private counter: number;
    costSelect: costSelect ;
    dataUser ;
    hospitalnumber ;
    medicineNumber ;
    loader = new LoadingIndicator();
    totalMoney ;
    costTotal = [
        {
            date : "28/03/2561",
            type : "ความดันโลหิต",
            name1 : "เจาะเลือด",
            name2 : "ตรวจ PE",
            name3 : "ตรวจ HT",
            name4 : "ยา",
            name5 : "ตรวจ Tx",
            data1 : "150", //เจาะเลือด
            data2 : "3000", //ตรวจไต
            data3 : "1000", //ค่าตรวจ
            data4 : "1000", //ค่ายา
            data5 : "1000" //ค่ายา
        },
        {
            date : "28/06/2560",
            type : "ไขมัน",
            name1 : "เจาะเลือด",
            name2 : "ตรวจ PS",
            name3 : "ตรวจ DLD",
            name4 : "ยา",
            name5 : "ตรวจ Tx",
            data1 : "150", //เจาะเลือด
            data2 : "2500", //ตรวจ plant sterols
            data3 : "1000", //ค่าตรวจ
            data4 : "1200", //ค่ายา
            data5 : "1000" //ค่ายา
        },
        {
            date : "28/01/2561",
            type : "เบาหวาน",
            name1 : "เจาะเลือด",
            name2 : "ตรวจปัสสาวะ",
            name3 : "ตรวจ DM",
            name4 : "ยา",
            name5 : "ตรวจ Pe",
            data1 : "150", //เจาะเลือด
            data2 : "500", //ตรวจปัสสาวะ
            data3 : "1000", //ค่าตรวจ
            data4 : "1500", //ค่ายา
            data5 : "1000" //ค่ายา
        },
    ] ;

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

    public onItemTap(args) {
        console.log("------------------------ ItemTapped: " + args.index);
        // this.costSelect.numberDate = this.disease[args.index].date ;
        // this.costSelect.name = this.disease[args.index].type ;
        // securityService.setCostSelect = JSON.stringify(this.costSelect);
        // console.log(securityService.getCostSelect);
        //this.router.navigate(["/bloodResultSelect"]);
    }

    ngOnInit(): void {
        this.costSelect = JSON.parse(securityService.getCostSelect);
        console.log(securityService.getCostSelect);
        this.dataUser = JSON.parse(securityService.getDataUser);
        this.hospitalnumber = this.dataUser.dataset.hn
    }

    constructor(
        private fonticon: TNSFontIconService,
        private _changeDetectionRef: ChangeDetectorRef,
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
    toBack () {
        this.loader.show(this.options);
        console.log("connect");
        this.router.navigate(["/cost"]);
        this.demoLoader();
    }

    total (i1, i2, i3, i4, i5) {
        this.totalMoney = parseInt(i1) + parseInt(i2) + parseInt(i3) + parseInt(i4) + parseInt(i5) ;
        return true ;
    }

    checkDate (date) {
        if (this.costSelect.numberDate == date) {
            return true ;
        }
    }

    private demoLoader() {
        setTimeout(() => {
          this.loader.hide();
        }, 1000);
      }

 }