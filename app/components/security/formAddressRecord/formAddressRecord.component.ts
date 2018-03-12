import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { action } from "ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { securityService } from "../security.service";
import { user } from "../model/user.model"
import {LoadingIndicator} from "nativescript-loading-indicator";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';

@Component({
    selector: "formAddressRecord",
    templateUrl: "formAddressRecord.component.html",
    styleUrls: ['formAddressRecord.component.css'],
    moduleId: module.id
})

export class formAddressRecordComponent implements OnInit {
    user: user ;
    inputAlret = "";
    houseNumber = "";
    alley = "";
    street = "";
    swine = "";
    locality = "";
    district = "";
    county = "";
    postcode = "";
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
    test () {
        
    }

    net () {
        securityService.setUserData = JSON.stringify(this.user);
        this.router.navigate(["/security/formRelativeAndMedicalAndSymptomRecord"]);
    }
nextToReletion () {
        this.loader.show(this.options);
        if (this.houseNumber == "") {
            this.inputAlret = this.inputAlret + "\n- บ้านเลขที่"
        }
        if (this.locality == "") {
            this.inputAlret = this.inputAlret + "\n- ตำบล"
        }
        if (this.district == "") {
            this.inputAlret = this.inputAlret + "\n- อำเภอ"
        }
        if (this.county == "") {
            this.inputAlret = this.inputAlret + "\n- จังหวัด"
        }
        if (this.postcode == "") {
            this.inputAlret = this.inputAlret + "\n- รหัสไปรษณีย์"
        }
        if (this.user.telephone == "") {
            this.inputAlret = this.inputAlret + "\n- โทรศัพท์"
        }
        if (this.inputAlret != "") {
            alert("กรุณาใส่ข้อมูลให้ครบ !\n" + this.inputAlret);
            this.loader.hide();
        }
        if (this.alley != "") {
            this.alley = "ซ." + this.alley;
        } 
        if (this.street != "") {
            this.street = "ถ." + this.street;
        } 
        if (this.swine != "") {
            this.swine = "ม." + this.swine;
        } 
        if (this.locality != "") {
            this.locality = "ต." + this.locality;
        } 
        if (this.district != "") {
            this.district = "อ." + this.district;
        } 

        if (this.inputAlret == ""){
            this.user.address = this.houseNumber + " " + this.alley + " " + this.street + " " + this.swine + " " + this.locality + " " + this.district + " " + this.county + " " + this.postcode + " ";
            securityService.setUserData = JSON.stringify(this.user);
            console.log(this.user.address);
            this.router.navigate(["/security/formRelativeAndMedicalAndSymptomRecord"]);
            this.loader.hide();
        }
        this.inputAlret = "";
    }
countyActionDialog() {
        
        let options = {
            title: "จังหวัด",
            message: "เลือก",
            cancelButtonText: "",
            actions: ["กรุงเทพมหานคร","กระบี่","กาญจนบุรี","กาฬสินธุ์","กำแพงเพชร","ขอนแก่น","จันทบุรี","ฉะเชิงเทรา","ชลบุรี","ชัยนาท","ชัยภูมิ","ชุมพร","เชียงราย","เชียงใหม่","ตรัง","ตราด","ตาก","นครนายก","นครปฐม","นครพนม","นครราชสีมา","นครศรีธรรมราช","นครสวรรค์","นนทบุรี","นราธิวาส","น่าน","บึงกาฬ","บุรีรัมย์","ปทุมธานี","ประจวบคีรีขันธ์","ปราจีนบุรี","ปัตตานี","พระนครศรีอยุธยา","พังงา","พัทลุง","พิจิตร","พิษณุโลก","เพชรบุรี","เพชรบูรณ์","แพร่","พะเยา","ภูเก็ต","มหาสารคาม","มุกดาหาร","แม่ฮ่องสอน","ยะลา","ยโสธร","ร้อยเอ็ด","ระนอง","ระยอง","ราชบุรี","ลพบุรี","ลำปาง","ลำพูน","เลย","ศรีสะเกษ","สกลนคร","สงขลา","สตูล","สมุทรปราการ","สมุทรสงคราม","สมุทรสาคร","สระแก้ว ","สระบุรี","สิงห์บุรี","สุโขทัย","สุพรรณบุรี","สุราษฎร์ธานี","สุรินทร์","หนองคาย","หนองบัวลำภู","อ่างทอง","อุดรธานี","อุทัยธานี","อุตรดิตถ์","อุบลราชธานี","อำนาจเจริญ"]
        };
        let tm = this
        action(options).then((result) => {
            tm.county = result;
            console.log(tm.county);
        });  
    }
 }