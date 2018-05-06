import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ViewContainerRef } from "@angular/core";
import { securityService } from "../../security/security.service";
import { connectionType, getConnectionType } from "connectivity";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
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
import * as observableArray from "tns-core-modules/data/observable-array";
import * as labelModule from "tns-core-modules/ui/label";
import * as listViewModule from "tns-core-modules/ui/list-view";
import { meet } from "../../security/model/meet.model"
import { appointmentService } from "./appointment.service";
import {SetupItemViewArgs} from "nativescript-angular/directives";

class DataItem {
    constructor(public id: number, public name: string) { }
}

@Component({
    selector: "appointment",
    templateUrl: "appointment.component.html",
    styleUrls: ['appointment.component.css'],
    moduleId: module.id
})


export class appointmentComponent implements OnInit {

    meet: meet ;
    dataUser ;
    cid ;
    nameAndsurname ;
    hospitalnumber ;
    gender ;
    dob ;
    blood ;
    appoint1 = true;
    appoint2 = false;
    appoint3 = false;
    appoint4 = false;
    docterWorking  ;
    docterWorkingShow = [] ;
    docterWorkingTime ;
    docterWorkingDay;
    time1;
    time2;
    time3;
    time4;
    timeShow = [];
    timeCheck = [];
    oneTime ;
    oneDes ;
    oneDay ;
    oneDocName ;
    oneLocation ;
    oneDeName ;
    oneDocId ;
    loader = new LoadingIndicator();
    public myItems: Array<DataItem>;
    private counter: number;
    times = [
        {
            time : "10.00 น."
        },
        {
            time : "10.30 น."
        },
        {
            time : "11.00 น."
        },
        {
            time : "11.30 น."
        }
    ] ;
    appoint ;
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
        this.dataUser = JSON.parse(securityService.getDataUser);
        console.log(JSON.stringify(this.dataUser.dataset));
        console.log(this.dataUser.dataset.hn)
        this.nameAndsurname = this.dataUser.dataset.fname + " " + this.dataUser.dataset.lname
        this.hospitalnumber = this.dataUser.dataset.hn
        this.cid = this.dataUser.dataset.cid
        this.gender = "เพศ " + this.dataUser.dataset.gender
        this.dob = "วันเกิด " + this.dataUser.dataset.dob
        if (this.dataUser.dataset.blood == null) {
            this.blood = "เลือด -"
        }
        else {this.blood = "เลือด " + this.dataUser.dataset.blood}

        this.appointmentService.getAppointment()
        .subscribe(
                        (Response) => {
                          //console.log(Response);
                          let Responsed = Response.find(item => item.hn_id === this.hospitalnumber);
                          //console.log(tns.hospitalnumber);
                          if (Responsed.appoint_status == "0") {
                            this.appoint = Responsed ;
                            this.oneDes = this.appoint.appoint_description ;
                            this.oneDay = this.appoint.appoint_day ;
                            this.oneTime = this.appoint.appoint_time ;
                            this.oneDocName = this.appoint.docter_name ;
                            this.oneLocation = this.appoint.appoint_location ;
                            this.oneDeName = this.appoint.department_name ;
                            this.oneDocId = this.appoint.docter_id ;
                            console.log(JSON.stringify(this.appoint)) ;
                          }
                        },
                        (error) => {
                            alert("กรุณาลองอีกครั้ง");
                            this.router.navigate(["/loginProfile"]);
                        }
                    )
                    this.appointmentService.getDocterworking()
                    .subscribe(
                        (Response) => {
                        // let ResponseDocterWorking = Response.find(item => item.docter_id === tns.appoint.docter_id);
                        
                        this.docterWorking = Response;
                        for (let i = 0 ; i < this.docterWorking.length ; i++) {
                            if (parseInt(this.docterWorking[i].docter_id) == parseInt(this.oneDocId)) {
                                this.docterWorkingShow.push(this.docterWorking[i]) ;
                            }
                            else if (parseInt(this.docterWorking[i].docter_id) == parseInt(this.oneDocId)) {
                                this.docterWorkingShow.push(this.docterWorking[i]) ;
                            }
                            else if (parseInt(this.docterWorking[i].docter_id) == parseInt(this.oneDocId)) {
                                this.docterWorkingShow.push(this.docterWorking[i]) ;
                            }

                        }
                        console.log(JSON.stringify(this.docterWorkingShow)) ;  
                        },
                        (error) => {
                            alert("กรุณาลองอีกครั้ง");
                            this.router.navigate(["/loginProfile"]) ;
                        }
                    )  
                    //console.log(JSON.stringify(this.appoint));
    }

    constructor(
        private fonticon: TNSFontIconService,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private route: ActivatedRoute,
        private appointmentService: appointmentService,
        private router: Router,
        page: Page) {
            route.url.subscribe((s:UrlSegment[]) => {
                console.log("url", s);
            });
    }

    toBack () {
        this.loader.show(this.options);
        console.log("connect");
        this.router.navigate(["/loginProfile"]) ;
        this.demoLoader();
    }

    getAppoint () {
        console.log(this.appoint);
    }

    checkDocter (i) {
        if (this.appoint.docter_id == i.docter_id && i.docterWorking_status == 0) {
            return true ;
        }
    }

    private demoLoader() {
        setTimeout(() => {
          this.loader.hide();
        }, 1000);
      }

    change () {
        this.appoint1 = false;
        this.appoint2 = true;
        this.appoint3 = false;
    }
    change2 () {
        this.appoint1 = false;
        this.appoint2 = false;
        this.appoint3 = true;
    }

    times1 () {
        if (this.time1 == 0) {
            return true
        }
    }
    times2 () {
        if (this.time2 == 0) {
            return true ;
        }
    }
    times3 () {
        if (this.time3 == 0) {
            return true ;
        }
    }
    times4 () {
        if (this.time4 == 0) {
            return true ;
        }
    }

    public selectDay(args) {
        console.log("------------------------ ItemTapped: " + this.docterWorking[args.index].docterWorking_id); 
        this.docterWorkingTime = this.docterWorking[args.index].docterWorking_id ;
        
        this.docterWorkingDay = this.docterWorking[args.index].docterWorking_day ;
        console.log(this.docterWorkingDay);
        let wTime = this.docterWorking.find(item => item.docterWorking_id === this.docterWorkingTime);
        // this.timeShow = wTime.docterWorking_1000_1030;
        // this.time2 = wTime.docterWorking_1030_1100;
        // this.time3 = wTime.docterWorking_1100_1130;
        // this.time4 = wTime.docterWorking_1130_1200;
        this.timeShow = this.times
        this.timeCheck.push(wTime.docterWorking_1000_1030);
        this.timeCheck.push(wTime.docterWorking_1030_1100);
        this.timeCheck.push(wTime.docterWorking_1100_1130);
        this.timeCheck.push(wTime.docterWorking_1130_1200);
        this.check () 
        this.appoint1 = false;
        this.appoint2 = false;
        this.appoint3 = false;
        this.appoint4 = true;
    }
    getFormatDate (dateStr) {
        let date = new Date(dateStr)
        let month
        if(date.getMonth() == 0){
            month = 1
        }
        else if(date.getMonth() == 1){
            month = 2
        }
        else if(date.getMonth() == 2){
            month = 3
        }
        else if(date.getMonth() == 3){
            month = 4
        }
        else if(date.getMonth() == 4){
            month = 5
        }
        else if(date.getMonth() == 5){
            month = 6
        }
        else if(date.getMonth() == 6){
            month = 7
        }
        else if(date.getMonth() == 7){
            month = 8
        }
        else if(date.getMonth() == 8){
            month = 9
        }
        else if(date.getMonth() == 9){
            month = 10
        }
        else if(date.getMonth() == 10){
            month = 11
        }
        else if(date.getMonth() == 11){
            month = 12
        }

        let str = date.getDate() + "/" + month + "/" +date.getFullYear()
        // console.log("eieiei", date.getDate)
        return str
    }
    public onItemTap2(args) {
        let tns= this
       console.log(this.timeShow[args.index].time);
       console.log(this.docterWorkingTime);
       console.log(this.appoint.appoint_id);
       console.log(this.docterWorkingDay) ;
       console.log(this.appoint.appoint_day) ;
       console.log(this.appoint.appoint_time) ;
       dialogs.confirm({
        title: "เลื่อนนัด",
        message: "จาก วันที่ " + this.getFormatDate(this.appoint.appoint_day) + " เวลา " + this.appoint.appoint_time + "\n" + "เป็น วันที่ " + this.getFormatDate(this.docterWorkingDay) + " เวลา " + this.timeShow[args.index].time,
        cancelButtonText: "ยอมรับ",
        okButtonText: "ยกเลิก"
    }).then(result => {
        // result argument is boolean
        console.log("Dialog result: " + result);
        if (result == false) {
            this.loader.show(this.options);
            tns.appointmentService.postAppoint(this.timeShow[args.index].time, this.docterWorkingTime, this.appoint.appoint_id, this.docterWorkingDay, this.appoint.appoint_day, this.appoint.appoint_time);
            alert("เลื่อนนัดสำเร็จ");
            this.router.navigate(["/loginProfile"]);
            this.demoLoader()
        }
    });   
    }
    check () {
        this.timeCheck.forEach ((element, index) => {
            if (element == 1) 
                this.timeShow.splice(index, 1)
        })
    }
    onSetupItemView(args: SetupItemViewArgs) {
        if(this.timeCheck[args.index] === 1)
            this.timeShow.splice(args.index, 1)
    }
 }