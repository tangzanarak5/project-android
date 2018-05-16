import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ViewContainerRef } from "@angular/core";
import { securityService } from "../../security/security.service";
import { connectionType, getConnectionType } from "connectivity";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import * as dialogs from "ui/dialogs";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import {LoadingIndicator} from "nativescript-loading-indicator";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import {Input, ChangeDetectionStrategy} from '@angular/core';
import { sideBarComponent } from "../loginProfile/sideBar/sideBar.component";
import { hyperSelectOne } from "../../security/model/hyperSelectOne.model";

class DataItem {
    constructor(public id: number, public name: string) { }
}

@Component({
    selector: "hyper",
    templateUrl: "hyper.component.html",
    styleUrls: ['hyper.component.css'],
    moduleId: module.id
})


export class hyperComponent implements OnInit {
    public myItems: Array<DataItem>;
    private counter: number;
    hyperSelectOne: hyperSelectOne ;
    dataUser ;
    dataHyper ;
    allData = [
        {
            nameEng: "Body Mass",
            nameThai: "ดัชนีมวลกาย"
        },
        {
            nameEng: "Blood Pressure",
            nameThai: "ความดันโลหิต"
        },
        {
            nameEng: "Pulse",
            nameThai: "ชีพจร"
        },
        {
            nameEng: "Weight",
            nameThai: "น้ำหนัก"
        },
        {
            nameEng: "Height",
            nameThai: "ส่วนสูง"
        }
] ;
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
        console.log("connect hyper");
        this.hyperSelectOne = new hyperSelectOne ;
        this.hyperSelectOne.nameIndex = "" ;
        securityService.setHyperSelectOne = JSON.stringify(this.hyperSelectOne);
        console.log(securityService.getHyperSelectOne);
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
        page: Page) {
            route.url.subscribe((s:UrlSegment[]) => {
                this.loader.show(this.options);
                console.log("url", s);
            });
    }

    public onItemTap(args) {
        this.loader.show(this.options);
        console.log("------------------------ ItemTapped: " + args.index);
        this.hyperSelectOne.nameIndex = args.index ;
        securityService.setHyperSelectOne = JSON.stringify(this.hyperSelectOne);
        console.log(securityService.getHyperSelectOne);
        this.router.navigate(["/hyperSelect"]);
        this.demoLoader();
    }
   
    toBack () {
        console.log("connect");
        this.router.navigate(["/loginProfile"]);
    }
   
    private demoLoader() {
        setTimeout(() => {
          this.loader.hide();
        }, 1000);
      }
  
 }