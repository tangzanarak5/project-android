import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { action } from "ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import * as camera from "nativescript-camera";
import { securityService } from "../security.service";
import { user } from "../model/user.model"
import { Image } from "ui/image";
import * as dialogs from "ui/dialogs";
import { formPicAndAcceptService } from "./formPicAndAccept.service";
import * as imagepicker from "nativescript-imagepicker";
import imageSource = require("image-source");
import {LoadingIndicator} from "nativescript-loading-indicator";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';

@Component({
    selector: "formPicAndAccept",
    templateUrl: "formPicAndAccept.component.html",
    styleUrls: ['formPicAndAccept.component.css'],
    moduleId: module.id
})

export class formPicAndAcceptComponent implements OnInit {
    public firebase = require("nativescript-plugin-firebase");
    user: user ;
    inputAlret = "";
    image ;
    pathimg ;
    pathcommit ;
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
        private formPicAndAcceptService: formPicAndAcceptService,
        private route: ActivatedRoute,
        private router: Router,
        private fonticon: TNSFontIconService
    ) {}

    ngOnInit(): void {
        this.user = new user() ;
        this.image = new Image();
        console.log(securityService.getUserData);
        this.user = JSON.parse(securityService.getUserData);
        this.firebase.init({
            storageBucket: "gs://fir-appproject14.appspot.com"
            // Optionally pass in properties for database, authentication and cloud messaging,
            // see their respective docs.
          }).then(
            instance => {
              console.log("firebase.init done");
            },
            error => {
              console.log(`firebase.init error: ${error}`);
            }
          );
          camera.requestPermissions();
          
}
tackPic () {
    
    var options = { width: 150, height: 150, keepAspectRatio: false, saveToGallery: true };
    camera.takePicture(options)
        .then((imageAsset) => {
            console.log("Size: " + imageAsset.options.width + "x" + imageAsset.options.height);
            console.log("keepAspectRatio: " + imageAsset.options.keepAspectRatio);
            console.log("Photo saved in Photos/Gallery for Android or in Camera Roll for iOS");
            this.pathimg = imageAsset ;
            this.image.src = imageAsset;
            this.user.pic = "add pic"
            this.changeImg() ;
 
        }).catch((err) => {
            console.log("Error -> " + err.message);
        });

}
changeImg () {
    var fs = require("file-system");
    let source = new imageSource.ImageSource();
     source.fromAsset(this.pathimg).then((source) => {
         let folder = fs.knownFolders.documents().path;
         let fileName = this.user.idCard + ".png"
         let path = fs.path.join(folder, fileName);
         let saved = source.saveToFile(path, "png");
         this.pathcommit = path ;
         if(saved){
            console.log("saved image");
            console.log(this.pathcommit);
         }
     })
  }

  upload () {
      let tns = this ;
    // init the file-system module
    var fs = require("file-system");
    
      // grab a reference to the app folder
      var appPath = fs.knownFolders.currentApp().path;
    
      // determine the path to a file in the app/res folder
      //var logoPath = appPath + this.tang.android + 'jpg'
      //console.log(logoPath);
    
      // now upload the file with either of the options below:
      this.firebase.uploadFile({
        // optional, can also be passed during init() as 'storageBucket' param so we can cache it (find it in the Firebase console)
        bucket: 'gs://fir-appproject14.appspot.com',
        // the full path of the file in your Firebase storage (folders will be created)
        remoteFullPath: 'uploads/images/' + this.user.idCard,
        // option 1: a file-system module File object
        localFile: fs.File.fromPath(this.pathcommit),
        // option 2: a full file path (ignored if 'localFile' is set)
        localFullPath: this.pathcommit,
        // get notified of file upload progress
        onProgress: function(status) {
          console.log("Uploaded fraction: " + status.fractionCompleted);
          console.log("Percentage complete: " + status.percentageCompleted);
        }
      }).then(
          function (uploadedFile) {
            console.log("File uploaded: " + JSON.stringify(uploadedFile));
            console.log("File uploaded: " + JSON.stringify(uploadedFile.url));
            tns.user.pic = JSON.stringify(uploadedFile.url)
            
            securityService.setUserData = JSON.stringify(tns.user);
            tns.formPicAndAcceptService.postDataPatient();
            tns.user.idCard = "";
            tns.user.nameTitle = "";
            tns.user.name = "";
            tns.user.surname = "" ;
            tns.user.gender = "" ;
            tns.user.birthDay = "";
            tns.user.nation = "" ;
            tns.user.religion = "" ;
            tns.user.address = "" ;
            tns.user.telephone = "" ;
            tns.user.medicalEligibilityVerification = "" ;
            tns.user.symptom = "" ;
            tns.user.nameRelative = "" ;
            tns.user.surnameRelative = "" ;
            tns.user.contact = "" ;
            tns.user.telephoneRelative = "" ;
            tns.user.pic = "";
            securityService.setUserData = JSON.stringify(tns.user);
            tns.router.navigate(["/security/subMitForm"]);
            tns.loader.hide();
          },
          function (error) {
            console.log("File upload error: " + error);
          }
      );
  }
net () {
    securityService.setUserData = JSON.stringify(this.user);
    this.formPicAndAcceptService.postDataPatient();
    this.router.navigate(["/security/subMitForm"])
}

nextToSymptom () {
    if (this.user.pic == "") {
        this.inputAlret = this.inputAlret + "\n- รูปบัตรประชาชน "
    }
    if (this.inputAlret != "") {
        alert("กรุณาใส่ข้อมูลให้ครบ !\n" + this.inputAlret);
    }
    if (this.inputAlret == ""){

        dialogs.confirm({
            title: "ข้อตกลง และยืนยันความเป็นจริง",
            message: "ข้าพเจ้าขอรับรองว่า.. ข้อมูลทั้งหมดนี้ถูกต้องตรงกับความจริงทุกประการ และยินยอมให้โรงพยาบาลเจ้าพระยาอภัยภูเบศรตรวจสอบหลักฐานข้อมูลทางทะเบียนใด ๆ ของรัฐ รวมถึงอนุญาตให้ใช้รูปภาพและข้อมูลประวัติ่ของข้าพเจ้าเพื่อการมีเวชระเบียนและการตรวจรักษา หากมีข้อมูลใด ไม่ถูกต้องหรือไม่ตรงกับความจริงและอาจจะทำให้ เกิดความเสียหายแก่ตัวข้าพเจ้าหรือบุคคลอื่น ข้าพเจ้ายินยอมรับผิดชอบ ในความเสียหายที่เกิดขึ้นทุกประการ ข้าพเจ้ายินยอมให้ใช้ข้อมูลประวัติการรักษาของข้าพเจ้าไปใช้เพื่อการศึกษา วิจัย หรือการพัฒนาคุณภาพโรงพยาบาลฯ",
            cancelButtonText: "ยอมรับ",
            okButtonText: "ยกเลิก"
        }).then(result => {
            // result argument is boolean
            console.log("Dialog result: " + result);
            if (result == false) {
                this.loader.show(this.options);
                this.upload() ;
            
            }
        });   
    }
    this.inputAlret = "";
}

dialogAgree () {
    
    dialogs.alert({
        title: "Your title",
        message: "Your message",
        okButtonText: "Your button text"
    }).then(() => {
        console.log("Dialog closed!");
    });
}
    
}