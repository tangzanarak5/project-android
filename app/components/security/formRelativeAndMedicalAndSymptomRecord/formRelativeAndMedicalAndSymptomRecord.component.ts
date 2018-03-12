import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { action } from "ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { securityService } from "../security.service";
import { user } from "../model/user.model"
import {LoadingIndicator} from "nativescript-loading-indicator";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';

@Component({
    selector: "formRelativeAndMedicalAndSymptomRecord",
    templateUrl: "formRelativeAndMedicalAndSymptomRecord.component.html",
    styleUrls: ['formRelativeAndMedicalAndSymptomRecord.component.css'],
    moduleId: module.id
})

export class formRelativeAndMedicalAndSymptomRecordComponent implements OnInit {
    user: user ;
    symptom = "อาการหรือโรคที่ต้องการตรวจ\n\n* ตัวอย่าง \n - ปวดหัว \n - ตัวร้อน \n - เจ็บคอ \n - เป็นเมื่อวันที่ 29/10/2560";
    inputAlret = ""; 
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

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fonticon: TNSFontIconService
    ) {}

    ngOnInit(): void {
        this.user = new user();
        console.log(securityService.getUserData);
        this.user = JSON.parse(securityService.getUserData);
}

net () {
    securityService.setUserData = JSON.stringify(this.user);
    this.router.navigate(["/security/formPicAndAccept"]);
}
    nextTomedicalEligibilityVerification () {
        this.loader.show(this.options);
        if (this.user.medicalEligibilityVerification == "") {
            this.inputAlret = this.inputAlret + "\n- สิทธิการรักษา"
        }
        if (this.user.symptom == "") {
            this.inputAlret = this.inputAlret + "\n- อาการหรือโรค "
        }
        if (this.user.nameRelative == "") {
            this.inputAlret = this.inputAlret + "\n- ชื่อ"
        }
        if (this.user.surnameRelative == "") {
            this.inputAlret = this.inputAlret + "\n- นามสกุล "
        }
        if (this.user.contact == "") {
            this.inputAlret = this.inputAlret + "\n- เกี่ยวข้องเป็น... "
        }
        if (this.user.telephoneRelative == "") {
            this.inputAlret = this.inputAlret + "\n- โทรศัพท์ "
        }
        if (this.inputAlret != "") {
            alert("กรุณาใส่ข้อมูลให้ครบ !\n" + this.inputAlret);
            this.loader.hide();
        }
        if (this.inputAlret == ""){
            securityService.setUserData = JSON.stringify(this.user);
            this.router.navigate(["/security/formPicAndAccept"]);
            this.loader.hide();
        }
        this.inputAlret = "";
    }

    rightToTreatmentActionDialog() {
        let options = {
            title: "สิทธิการรักษา",
            message: "เลือก",
            cancelButtonText: "",
            actions: ["ชำระเงินเอง","เบิกได้ (รับราชการ)","บัตรประกันสังคม","บัตรประกันสุขภาพถ้วนหน้า (บัตรทอง)"]
        };
        let vm = this
        action(options).then((result) => {
            vm.user.medicalEligibilityVerification = result;
            console.log(vm.user.medicalEligibilityVerification);
        });
    }
}