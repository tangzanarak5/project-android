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
import { diseases } from "../../../security/model/diseases.model"
import { medicineSelect } from "../../../security/model/medicineSelect.model"
import { medicineService } from "../medicine.service";

class DataItem {
    constructor(public id: number, public name: string) { }
}

@Component({
    selector: "medicineSelect",
    templateUrl: "medicineSelect.component.html",
    styleUrls: ['medicineSelect.component.css'],
    moduleId: module.id
})


export class medicineSelectComponent implements OnInit {

    public myItems: Array<DataItem>;
    private counter: number;
    diseases: diseases ;
    medicineSelect: medicineSelect ;
    dataUser ;
    hospitalnumber ;
    loader = new LoadingIndicator();
    connect = true ;
    dataMidicine = [] ;
    dataMidicineShow = [] ;
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
        // this.medicineSelect = new medicineSelect ;
        // this.medicineSelect.name = "" ;
        // securityService.setMedicineSelect = JSON.stringify(this.medicineSelect);
        // console.log(securityService.getMedicineSelect);
        this.diseases = JSON.parse(securityService.getDiseases);
        console.log(securityService.getDiseases);
        this.dataUser = JSON.parse(securityService.getDataUser);
        this.hospitalnumber = this.dataUser.dataset.hn
        console.log(this.hospitalnumber);
        this.medicineService.getDataMedicine(this.hospitalnumber)
                    .subscribe(
                        (Response) => {
                          // console.log(JSON.stringify(Response.dataset));
                          // console.log(this.diseases.name);
                          let selectResponse = Response.dataset.find(item => item.visitdate === this.diseases.name);
                          this.dataMidicine = Response.dataset ;
                          for(let i = 0;i<this.dataMidicine.length;i++){
                            if (this.dataMidicine[i].visitdate == this.diseases.name) {
                                this.dataMidicineShow.push(this.dataMidicine[i]);
                                console.log(this.dataMidicineShow);
                            }
                          }
                          if (selectResponse) {
                            console.log("1")
                          }
                          else { alert("วันที่ " + this.diseases.name + " ไม่ได้รับยา") ; this.router.navigate(["/medicine"]); }

                          // console.log(this.dataMidicine) ;
                        },
                        (error) => {
                            console.log("data error") ;
                            alert("กรุณาลองอีกครั้ง");
                            this.router.navigate(["/medicine"]);
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
public onItemTap(args) {
    // console.log("------------------------ ItemTapped: " + args.index);
    // this.medicineSelect.name = this.medicine[args.index].namet ;
    // securityService.setMedicineSelect = JSON.stringify(this.medicineSelect);
    // console.log(securityService.getMedicineSelect);
    // this.router.navigate(["/medicineSelectOne"]);
}
    toBack () {
        console.log("connect");
        this.router.navigate(["/medicine"]);
    }

 }