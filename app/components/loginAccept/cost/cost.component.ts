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
import { costSelect } from "../../security/model/costSelect.model"
import { costService } from "./cost.service";
import { SetupItemViewArgs } from "nativescript-angular/directives";

class DataItem {
    constructor(public id: number, public name: string) { }
}

@Component({
    selector: "cost",
    templateUrl: "cost.component.html",
    styleUrls: ['cost.component.css'],
    moduleId: module.id
})


export class costComponent implements OnInit {
    public myItems: Array<DataItem>;
    private counter: number;
    costSelect: costSelect ;
    dataUser ;
    hospitalnumber ;
    medicineNumber ;
    loader = new LoadingIndicator();
    connect = true ;
    dataCost ;

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
        this.loader.show(this.options);
        console.log("------------------------ ItemTapped: " + args.index);
        this.costSelect.numberDate = this.dataCost[args.index].id ;
        this.costSelect.name = this.dataCost[args.index].rightname ;
        this.costSelect.date2 = this.dataCost[args.index].visitdate ;
        securityService.setCostSelect = JSON.stringify(this.costSelect) ;
        console.log(securityService.getCostSelect);
        this.router.navigate(["/selectCost"]) ;
        this.demoLoader();
    }

    onSetupItemView(args: SetupItemViewArgs) {
        args.view.context.odd = (args.index === 0) ;
        args.view.context.even = (args.index !== 0) ;
    }

    ngOnInit(): void {
        this.costSelect = new costSelect ;
        this.costSelect.name = "" ;
        this.costSelect.numberDate = "" ;
        this.costSelect.date2 = "" ;
        securityService.setCostSelect = JSON.stringify(this.costSelect) ;
        console.log(securityService.getCostSelect);
        this.dataUser = JSON.parse(securityService.getDataUser);
        this.hospitalnumber = this.dataUser.dataset.hn

        this.costService.getDataFinance(this.hospitalnumber)
                    .subscribe(
                        (Response) => {
                          // console.log(JSON.stringify(Response));
                          this.dataCost = Response.dataset ;
                          console.log(this.dataCost) ;
                        },
                        (error) => {
                            console.log("data error") ;
                            alert("กรุณาลองอีกครั้ง");
                            this.router.navigate(["/loginProfile"]);
                        }
                    )
                    setTimeout(() => {
                        this.loader.hide() ;
                      }, 1000) ;
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
                this.loader.show(this.options);
                console.log("url", s);
            });
    }
    getFormatDate (dateStr) {
        let date = new Date(dateStr)
        let month
        if(date.getMonth() == 0){
            month = "มกราคม"
        }
        else if(date.getMonth() == 1){
            month = "กุมภาพันธ์"
        }
        else if(date.getMonth() == 2){
            month = "มีนาคม"
        }
        else if(date.getMonth() == 3){
            month = "เมษายน"
        }
        else if(date.getMonth() == 4){
            month = "พฤษภาคม"
        }
        else if(date.getMonth() == 5){
            month = "มิถุนายน"
        }
        else if(date.getMonth() == 6){
            month = "กรกฎาคม"
        }
        else if(date.getMonth() == 7){
            month = "สิงหาคม"
        }
        else if(date.getMonth() == 8){
            month = "กันยายน"
        }
        else if(date.getMonth() == 9){
            month = "ตุลาคม"
        }
        else if(date.getMonth() == 10){
            month = "พฤษจิกายน"
        }
        else if(date.getMonth() == 11){
            month = "ธันวาคม"
        }
    
        let str = date.getDate() + " " + month + " " + (date.getFullYear() + 543)
        // console.log("eieiei", date.getDate)
        return str
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
        }, 1000);
      }

 }