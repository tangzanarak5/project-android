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
import { costService } from "../cost.service";

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
    dataCost ;
    dataDrug ;
    dataService ;
    dataFinance ;
    payService ;
    payDrug ;
    payOperation ;
    id ;
    name ;
    heigthOperation = "20%" ;
    heigthDrug = "15%" ;
    heigthService = "15%" ;
    temp = [] ;
    drugShow = true ;
    operationShow = true ;
    serviceShow = true ;

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
    }

    ngOnInit(): void {
        this.costSelect = JSON.parse(securityService.getCostSelect);
        console.log(securityService.getCostSelect);
        this.dataUser = JSON.parse(securityService.getDataUser);
        this.hospitalnumber = this.dataUser.dataset.hn ;
        this.id = this.costSelect.numberDate ;
        this.name = this.costSelect.name ;

        this.costService.getDataOperation(this.hospitalnumber, this.id)
            .subscribe(
                (Response) => {
                    // console.log(JSON.stringify(Response));
                    this.dataCost = Response.dataset;
                    //console.log(this.dataCost) ;
                    console.log(this.dataCost.length);

                    if (this.dataCost.length == this.temp.length) {
                        console.log("emty operation");
                        this.operationShow = false ;
                    }
                    else if (this.dataCost.length == 1) {
                        this.heigthOperation = "10%" ;
                        console.log("opertation one");
                    }
                },
                (error) => {
                    console.log("data error") ;
                    alert("กรุณาลองอีกครั้ง");
                    this.router.navigate(["/cost"]);
                }
            )
        this.costService.getDataDrug(this.hospitalnumber, this.id)
            .subscribe(
                (Response) => {
                    // console.log(JSON.stringify(Response));
                    this.dataDrug = Response.dataset ;
                    //console.log(this.dataDrug) ;

                    if (this.dataDrug.length == this.temp.length) {
                        console.log("emty drug");
                        this.drugShow = false ;
                    }
                    else if (this.dataDrug.length == 1) {
                        this.heigthDrug = "5%" ;
                        console.log("drug one");
                    }
                },
                (error) => {
                    console.log("data error") ;
                    alert("กรุณาลองอีกครั้ง");
                    this.router.navigate(["/cost"]);
                }
            )

        this.costService.getDataService(this.hospitalnumber, this.id)
            .subscribe(
                (Response) => {
                    // console.log(JSON.stringify(Response));
                    this.dataService = Response.dataset ;
                    //console.log(this.dataDrug) ;

                    if (this.dataService.length == this.temp.length) {
                        console.log("emty service");
                        this.serviceShow = false ;
                    }
                    else if (this.dataService.length == 1) {
                        this.heigthService = "5%" ;
                        console.log("service one");
                    }
                },
                (error) => {
                    console.log("data error") ;
                    alert("กรุณาลองอีกครั้ง");
                    this.router.navigate(["/cost"]);
                }
            )

        this.costService.getDataFinance(this.hospitalnumber)
            .subscribe(
                (Response) => {
                    // console.log(JSON.stringify(Response));
                    this.dataFinance = Response.dataset ;
                    // console.log(this.dataFinance) ;
                    for (let i = 0 ; i < this.dataFinance.length ; i++) {
                        if (this.dataFinance[i].visitdate == this.costSelect.date2) {
                            this.totalMoney = this.dataFinance[i].total_pay ;
                            console.log(this.totalMoney) ;
                        }
                    }
                },
                (error) => {
                    console.log("data error") ;
                    alert("กรุณาลองอีกครั้ง");
                    this.router.navigate(["/cost"]);
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
        private costService: costService,
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

    private demoLoader() {
        setTimeout(() => {
          this.loader.hide();
        }, 1000);
      }

 }