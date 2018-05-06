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
import { ObservableArray } from "tns-core-modules/data/observable-array";
import * as frameModule from "tns-core-modules/ui/frame";
import {Input, ChangeDetectionStrategy} from '@angular/core';
import { selectBlood } from "../../security/model/selectBlood.model"
import { loginProfileComponent } from "../loginProfile/loginProfile.component";
import { RouterExtensions } from "nativescript-angular";
import { bloodResultService } from "./bloodResult.service";
import { info } from "../../security/model/info.model"
import { showInfoComponent } from "./bloodResultSelect/showInfo/showInfo.component";

class DataItem {
    constructor(public id: number, public name: string) { }
}

@Component({
    selector: "bloodResult",
    templateUrl: "bloodResult.component.html",
    styleUrls: ['bloodResult.component.css'],
    moduleId: module.id
})


export class bloodResultComponent implements OnInit {
    selectBlood: selectBlood ;
    public myItems: Array<DataItem>;
    private counter: number;
    bloodResult ;

    disease = [
        {
            namee : "HbA1C",
            namet : "ระดับน้ำตาลเฉลี่ยในเลือด"
        },
        {
            namee : "Glucose",
            namet : "ระดับน้ำตาลในเลือด"
        },
        {
            namee : "HDL",
            namet : "ไขมันดี"
        },
        {
            namee : "LDL",
            namet : "ไขมันไม่ดี"
        },
        {
            namee : "Triglycerides",
            namet : "ไตรกลีเซอไรด์สารอาหารประเภทไขมัน"
        },
        {
            namee : "RBC",
            namet : "ปริมาณเซลล์เม็ดเลือดแดง"
        },
        {
            namee : "Bilirubin",
            namet : "การสลายตัวของเม็ดเลือดแดง"
        },
        {
            namee : "Hb",
            namet : "ฮีโมโกลบินโปรตีนภายในเซลล์เม็ดเลือดแดง"
        },
        {
            namee : "Hct",
            namet : "เฮมาโตคริตความเข้มข้นของเลือด"
        },
        {
            namee : "MCV ",
            namet : "ปริมาตรของเซลล์เม็ดเลือดแดง"
        },
        {
            namee : "Urobilinogen",
            namet : "สารในปัสสาวะ"
        },
        {
            namee : "pH",
            namet : "ความเป็นกรด–ด่าง"
        },
        {
            namee : "Protein",
            namet : "โปรตีน"
        },
        {
            namee : "Ketone",
            namet : "สารคีโตนในปัสสาวะ"
        }
    ] ;
    info: info ;
    dataLab ;
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

    openDrawer () {
        this.sideBar.openDrawer() ;
    }

    public onItemTap(args) {
        this.loader.show(this.options);
        console.log("------------------------ ItemTapped: " + args.index);
        this.selectBlood.numberIndex = this.disease[args.index].namee ;
        this.selectBlood.name = this.disease[args.index].namet ;
        securityService.setSelectBlood = JSON.stringify(this.selectBlood);
        // this.selectBlood = JSON.parse(securityService.getSelectBlood);
        console.log(securityService.getSelectBlood);
        this.router.navigate(["/bloodResultSelect"]) ;
        this.demoLoader();
    }

    ngOnInit(): void {
        
        this.selectBlood = new selectBlood ;
        this.selectBlood.numberIndex = "" ;
        this.selectBlood.name = "" ;
        securityService.setSelectBlood = JSON.stringify(this.selectBlood);
        console.log(securityService.getSelectBlood);
        this.selectBlood = JSON.parse(securityService.getSelectBlood);
        this.dataUser = JSON.parse(securityService.getDataUser);
        this.hospitalnumber = this.dataUser.dataset.hn
        this.info = new info ;
        this.info.name = "" ;
        this.info.numberIndex = "" ;
        securityService.setInfo = JSON.stringify(this.info);
        console.log(securityService.getInfo) ;

    }

    constructor(
        private fonticon: TNSFontIconService,
        private _changeDetectionRef: ChangeDetectorRef,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private route: ActivatedRoute,
        private router: Router,
        private bloodResultService: bloodResultService,
        private routerExtensions: RouterExtensions,
        page: Page) {
            route.url.subscribe((s:UrlSegment[]) => {
            console.log("url", s) ;
            });
    }
    showInfo (i) {
        console.log(i) ;
        this.info.numberIndex = i ;
        this.info.name = this.disease[i].namet
        securityService.setInfo = JSON.stringify(this.info);
        console.log(securityService.getInfo);
        let options = {
            context: {},
            fullscreen: false,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(showInfoComponent, options).then(res => {
        });
    }
    toBack () {
        this.loader.show(this.options);
        console.log("connect") ;
        this.router.navigate(["/loginProfile"]);
        this.demoLoader();
    }
    private demoLoader() {
        setTimeout(() => {
          this.loader.hide();
        }, 2000);
      }
 }