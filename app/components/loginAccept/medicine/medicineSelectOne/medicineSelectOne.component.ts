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

class DataItem {
    constructor(public id: number, public name: string) { }
}

@Component({
    selector: "medicineSelectOne",
    templateUrl: "medicineSelectOne.component.html",
    styleUrls: ['medicineSelectOne.component.css'],
    moduleId: module.id
})


export class medicineSelectOneComponent implements OnInit {

    public myItems: Array<DataItem>;
    private counter: number;
    medicineSelect: medicineSelect ;
    dataUser ;
    hospitalnumber ;
    loader = new LoadingIndicator();
    connect = true ;
    
    medicine = [
        {
            namee : "Metformin",
            namet : "ยาลดน้ำตาลในเลือด",
            data : "ลดการดูดซึมสารอาหารที่ลำไส้เล็กส่วนต้น และลดน้ำตาลหลังอาหาร",
            use : "รับประทานพร้อมอาหาร 3 มื้อ",
            type : "เบาหวาน"
        },
        {
            namee : "Repaglinide",
            namet : "ยาเพิ่มการหลั่งของอินซูลิน",
            data : "กระตุ้นตับอ่อนให้สร้างอินซูลินทำให้น้ำตาลหลังอาหารลดลง",
            use : "รับประทานก่อนอาหาร 3 มื้อ",
            type : "เบาหวาน"
        },
        {
            namee : "Insulin",
            namet : "ยาปรับระดับน้ำตาลในเลือด",
            data : "ควบคุมกระบวนการเผาผลาญสารอาหารประเภทคาร์โบไฮเดรตและไขมัน ประกอบกับอินซูลินจะเร่งการดูดซึมของน้ำตาลกลูโคส (Glucose) จากกระแสเลือดเข้าสู่กล้ามเนื้อลาย และเนื้อเยื่อไขมัน",
            use : "   1.เตรียมยาฉีดอินซูลินให้พร้อมฉีดโดยบรรจุหลอดยาอินซูลินลงในปากกาสำหรับฉีดยาอินซูลิน สวมหัวเข็มและปรับขนาดยาตามวิธีที่ระบุไว้ในคู่มือการใช้งานของบริษัทผู้ผลิตแต่ละราย\n   2.เช็ดผิวหนังบริเวณที่จะฉีดอินซูลินให้สะอาดด้วยสำลีชุบแอลกอฮอล์ระเหยจนแห้งก่อนที่จะฉีดยา\n   3.ถอดปลอกเข็มฉีดยาออก แล้วจับผิวหนังบริเวณที่จะฉีดยาอินซูลินยกขึ้นเล็กน้อยโดยใช้นิ้วโป้งและนิ้วชี้ของมือข้างหนึ่งบีบผิวหนังเข้าหากัน\n   4.จับปากกาด้วยมืออีกข้างหนึ่งโดยใช้นิ้วโป้งแตะไว้ที่ปุ่มสำหรับกดให้ยาและใช้นิ้วมือทั้งสี่ที่เหลือกำด้ามปากกาไว้ จับปากกาให้อยู่ในแนวเดียวกับผิวหนังบริเวณที่จะฉีดยาและแทงหัวเข็มลงสัมผัสกับผิวหนังบริเวณนั้น\n   5.กดปุ่มฉีดยาที่ปลายปากกาจนสุดตัวยาอินซุลินจะถูกฉีดเข้าใต้ผิวหนัง ดึงปากกาขึ้นเพื่อถอนเข็มฉีดยาออกจากผิวหนัง\n   6.สวมปลอกเข็มกลับดังเดิม แล้วตรวจสอบดูว่ายาอินซูลินถูกฉีดตามขนาดที่ต้องการหรือไม่",
            type : "เบาหวาน"
        },
        {
            namee : "Biguanide",
            namet : "ยาชะลอการดูดซึมน้ำตาลกลูโคส",
            data : "รักษาโรคเบาหวานประเภทที่ 2 ไม่ก่อให้เกิดภาวะน้ำตาลในเลือดต่ำ",
            use : "   สำหรับการรักษาโรคเบาหวานชนิด 2 ขนาดสูงสุดที่ในผู้ใหญ่รับประทานไม่ควรเกิน 2.25 กรัม/วัน\n   ขนาดสูงสุดที่รับประทานในเด็กไม่ควรเกิน 2 กรัม/วัน",
            type : "เบาหวาน"
        },
        {
            namee : "Sulfonylurea",
            namet : "ยาควบคุมน้ำตาลในเลือด",
            data : "กระตุ้นกลไกการทำงานของเบต้าเซลล์ในตับอ่อนให้หลั่งฮอร์โมนอินซูลินออกมา ทำให้ร่างกายสามารถใช้น้ำตาลในเลือดได้อย่างมีสมดุลมากขึ้น และยังพบว่ายากลุ่มนี้ช่วยลดการสร้างน้ำตาลกลูโคส (Glucose) ในตับ",
            use : "ยาเม็ดชนิดรับประทาน ขนาด 250 มิลลิกรัม/เม็ด",
            type : "เบาหวาน"
        },
        {
            namee : "Meglitinides",
            namet : "ยากระตุ้นการทำงานของตับอ่อน",
            data : "กระตุ้นตับอ่อนให้ผลิตอินซูลินออกมาอย่างมีความสัมพันธ์กับปริมาณของระดับน้ำตาลในกระแสเลือด",
            use : "   รับประทานครั้งละ 60 - 120 มิลลิกรัมก่อนมื้ออาหารประมาณ 30 นาที",
            type : "เบาหวาน"
        }
        ,
        {
            namee : "Alpha-glucosidase inhibitor",
            namet : "ยาย่อยคาร์โบไฮเดรต",
            data : "ย่อยคาร์โบไฮเดรตให้กลาย เป็นน้ำตาลโมเลกุลเล็ก (น้ำตาลชนิดสัมพันธ์กับโรคเบาหวาน)",
            use : "   รับประทาน 50 - 100 มิลลิกรัมวันละ 3 ครั้งก่อนอาหาร",
            type : "เบาหวาน"
        },
        {
            namee : "ACE Inhibitor",
            namet : "ยาลดความดันโลหิต",
            data : "ขยายหลอด ลดอาการเหนื่อยจากหัวใจวาย ลดการกระตุ้น angiotensin II",
            use : "รับประทานวันละ 1 ครั้ง ตอนเช้า",
            type : "ความดันโลหิต"
        },
        {
            namee : "Thiazide diuretics",
            namet : "ยาขับปัสสาวะ",
            data : "รักษาโรคความดันโลหิตสูง, อาการบวมอันมีสาเหตุมาจาก โรคหัวใจ โรคตับ และโรคไต, ยากลุ่มนี้ช่วยลดความเสี่ยงของการเสียชีวิตเนื่องจากหัวใจขาดเลือด (โรคกล้ามเนื้อหัวใจตาย) อันมีสาเหตุมาจากความดันโลหิตสูง",
            use : "   รับประทาน 2.5 - 5 มิลลิกรัม/วัน",
            type : "ความดันโลหิต"
        },
        {
            namee : "BA blockers",
            namet : "ยาลดการทำงานประสาทซิมพาธีติก",
            data : "ปิดกั้นตัวรับเบต้า (Beta receptor) ซึ่งมี 3 ชนิด คือ เบต้าวัน (Beta1), เบต้าทู (Beta 2), และเบต้าทรี (Beta 3) ซึ่งตัวรับเหล่านี้อยู่ตามเนื้อเยื่อของ หัวใจ หลอดเลือด หลอดลม และส่งผลให้หัวใจลดการบีบตัวและลดอัตราการเต้นลง พร้อมกับยับยั้งการปลดปล่อยสารเรนิน (Renin, เอนไซม์ที่เกี่ยวข้องกับกระบวนการควบคุมความดันโลหิตของร่างกาย) จากไต ทำให้เพิ่มการขับเกลือโซเดียมและน้ำออกจากร่างกาย เป็นผลให้ลดความดันโลหิต",
            use : "   ฉีดยาเข้าหลอดเลือดดำโดยตรงขนาด 80 มก. หรือจะใช้ยาขนาด 1 มิลลิกรัม/น้ำ หนักตัว 1 กิโลกรัม การเดินยา/ให้ยาเข้าหลอดเลือดดำให้ใช้เวลา 30 วินาทีขึ้นไป จากนั้นหยดยาเข้าหลอดเลือดดำในอัตรา 0.15 มิลลิกรัม/น้ำหนักตัว 1 กิโลกรัม/นาที หากจำเป็นแพทย์อาจปรับขนาดการให้ยาเป็น 0.30 มิลลิกรัม/น้ำหนักตัว 1 กิโลกรัม/นาทีเพื่อควบคุมอัตราการเต้นของหัวใจและความดันโลหิตไปพร้อมกันเด็กอายุมากกว่า 1 ปีขึ้นไป: หยดยาเข้าหลอดเลือดดำขนาด 0.1 - 0.5 มิลลิกรัม/น้ำหนักตัว 1 กิโลกรัม/นาทีโดยให้ยาเป็นเวลามากกว่า 1 นาที และให้ยาต่อเนื่องเพื่อช่วยควบคุมอาการหัวใจเต้นเร็ว",
            type : "ความดันโลหิต"
        },
        {
            namee : "Cc blocker",
            namet : "ยาปิดกั้นช่องประจุแคลเซียม",
            data : "ลดการนำเข้าของแคลเซียมเข้าในกล้ามเนื้อเรียบที่อยู่ในผนังเซลล์ของหลอดเลือดรวมถึงกล้ามเนื้อของหัวใจ ส่ง ผลให้หลอดเลือดเหล่านั้นขยายตัว ทำให้ความดันโลหิตลดลง",
            use : "   ผู้ใหญ่รับประทาน 5 – 10 มิลลิกรัม วันละ 1 ครั้ง สามารถรับประทานก่อนหรือหลังอาหารก็ได้",
            type : "ความดันโลหิต"
        },
        {
            namee : "ydralazine",
            namet : "ยาขยายหลอดเลือด",
            data : "ทำให้เกิดการขยายตัวของหลอดเลือด ยานี้จะทำให้การไหลเวียนของเลือดที่ผ่านไต ผ่านสมองเป็นไปอย่างสะดวกขึ้น",
            use : "   รับประทาน 40 - 50 มิลลิกรัม/วันโดยแบ่งรับประทาน หากจำเป็นแพทย์สามารถปรับขนาดรับประทานเป็น 200 มิลลิกรัม/วัน",
            type : "ความดันโลหิต"
        },
        {
            namee : "Clonidine",
            namet : "ยาระบบประสาทส่วนกลาง",
            data : "ส่งผลให้หลอดเลือดส่วนปลายตามอวัยวะต่างๆเกิดการขยายตัว และทำให้ความดันโลหิตกับอัตราการเต้นของหัวใจลดลง",
            use : "   ขนาดเริ่มต้นรับประทาน 50 - 100 ไมโครกรัมวันละ 3 ครั้ง ขนาดรับประทานสูงสุดไม่เกิน 2,400 ไมโครกรัม/วัน",
            type : "ความดันโลหิต"
        },
        {
            namee : "Osmotic diuretic",
            namet : "ยาขับปัสสาวะ 2",
            data : "ก. Isosorbide: จะออกฤทธิ์กระตุ้นให้หลอดเลือดเกิดการคลายตัว รวมถึงลดแรงดันของหัวใจห้องล่างซ้ายตลอดจนเพิ่มความสามารถในการทนต่อแรงดันของหลอดเลือดแดงได้ดีขึ้น\nข. Mannitol: จะออกฤทธิ์ยับยั้งการดูดกลับของน้ำและโซเดียมที่บริเวณไต รวมถึงอิเล็กโทรไลต์ต่างๆโดยก่อให้เกิดแรงดันที่มีชื่อเรียกว่า แรงดันออสโมติก จนเป็นที่มาของสรรพคุณ",
            use : "   รับประทานครั้งละ 20 มิลลิกรัม วันละ 2 ครั้ง",
            type : "ความดันโลหิต"
        },
        {
            namee : "Atorvastatin",
            namet : "ยาลดระดับไขมันไตรกลีเซอร์ไรด์",
            data : "ยับยั้งการทำงานของเอนไซม์ที่มีผลต่อการสังเคราะห์คอเลสเตอรอลในตับ อีกทั้งช่วยลดระดับไขมันไตรกลีเซอร์ไรด์ในกระแสเลือด ",
            use : "   รับประทานครั้งละ 10 - 80 มิลลิกรัม วันละครั้ง สามารถรับประทานยาก่อนหรือหลังอาหารก็ได้ การปรับเปลี่ยนขนาดการรับประทานขึ้นอยู่กับระดับไขมันในเลือดของผู้ป่วย",
            type : "ไขมัน"
        },
        {
            namee : "Fluvastatin",
            namet : "ยาชะลอการสร้างไขมันแอลดีแอลคลอเรสเตอรอล",
            data : "ยับยั้งเอนไซม์ เอนไซม์ที่ทำงานเกี่ยวข้องกับการสร้างไขมันคอเลสเตอรอลในตับ ทำให้เกิดการชะลอการสร้างคอเลสเตอรอล",
            use : "   รับประทาน 20 - 40 มิลลิกรัมวันละครั้งก่อนนอน",
            type : "ไขมัน"
        },
        {
            namee : "Lovastatin",
            namet : "ยาชะลอการสังเคราะห์ไขมัน",
            data : "รบกวนกระบวนการทำงานของเอนไซม์และก่อให้เกิดผลในการชะลอการสังเคราะห์ไขมันกลุ่มคอเลสเตอรอล",
            use : "   ขนาดรับประทานเริ่มต้นที่ 20 มิลลิกรัม หลังอาหารเย็น หรืออาจใช้ขนาดรับประทาน 10 - 80 มิลลิกรัม/วัน",
            type : "ไขมัน"
        },
        {
            namee : "Ezetimibe",
            namet : "ยายับยั้งการดูดซึมคอเลสเตอรอล",
            data : "ลดการดูดซึมไขมันคอเลสเตอรอลจากลำ ไส้ส่งผลให้ลดการสะสมไขมันในตับ",
            use : "   รับประทาน 10 มิลลิกรัมวันละครั้ง",
            type : "ไขมัน"
        },
        {
            namee : "Cholestyramine",
            namet : "ลดปริมาณคอเลสเตอรอล",
            data : "ลดการดูดซึมไขมันเข้าสู่ร่างกาย และลดการระคายเคืองของลำไส้จากน้ำดี",
            use : "   รับประทานครั้งละ 1 ซองวันละ 3 - 4 ครั้ง",
            type : "ไขมัน"
        },
        {
            namee : "Colesevelam",
            namet : "ยาช่วยขจัดกรดน้ำดี",
            data : "รักษาสมดุลน้ำดีในร่างกาย",
            use : "   รับประทานยาเม็ดขนาด 1.875 กรัม (3 เม็ด) วันละ 2 ครั้งพร้อมอาหาร",
            type : "ไขมัน"
        },
        {
            namee : "Gemfibrozil",
            namet : "ยาลดไขมันไม่ดีในเลือด",
            data : "ยับยั้งการสะสมไขมันในตับ",
            use : "   รับประทานครั้งละ 600 มิลลิกรัม วันละ 2 ครั้ง ก่อนอาหารครึ่งชั่วโมงเป็นอย่างต่ำ เช้า - เย็น ขนาดรับประทานสูงสุดไม่เกิน 1.5 กรัม/วัน",
            type : "ไขมัน"
        }
    ] ;
    
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
        this.medicineSelect = new medicineSelect ;
        this.medicineSelect = JSON.parse(securityService.getMedicineSelect);
        console.log(securityService.getMedicineSelect);
        this.dataUser = JSON.parse(securityService.getDataUser);
        this.hospitalnumber = this.dataUser.dataset.hn
        
        if (this.medicineSelect.name == "ยาลดน้ำตาลในเลือด") {
            this.medicineNumber = 0 ;
        }
        else if (this.medicineSelect.name == "ยาเพิ่มการหลั่งของอินซูลิน") {
            this.medicineNumber = 1 ;
        }
        else if (this.medicineSelect.name == "ยาปรับระดับน้ำตาลในเลือด") {
            this.medicineNumber = 2 ;
        }
        else if (this.medicineSelect.name == "ยาชะลอการดูดซึมน้ำตาลกลูโคส") {
            this.medicineNumber = 3 ;
        }
        else if (this.medicineSelect.name == "ยาควบคุมน้ำตาลในเลือด") {
            this.medicineNumber = 4 ;
        }
        else if (this.medicineSelect.name == "ยากระตุ้นการทำงานของตับอ่อน") {
            this.medicineNumber = 5 ;
        }
        else if (this.medicineSelect.name == "ยาย่อยคาร์โบไฮเดรต") {
            this.medicineNumber = 6 ;
        }
        else if (this.medicineSelect.name == "ยาลดความดันโลหิต") {
            this.medicineNumber = 7 ;
        }
        else if (this.medicineSelect.name == "ยาขับปัสสาวะ") {
            this.medicineNumber = 8 ;
        }
        else if (this.medicineSelect.name == "ยาลดการทำงานประสาทซิมพาธีติก") {
            this.medicineNumber = 9 ;
        }
        else if (this.medicineSelect.name == "ยาปิดกั้นช่องประจุแคลเซียม") {
            this.medicineNumber = 10 ;
        }
        else if (this.medicineSelect.name == "ยาขยายหลอดเลือด") {
            this.medicineNumber = 11 ;
        }
        else if (this.medicineSelect.name == "ยาระบบประสาทส่วนกลาง") {
            this.medicineNumber = 12 ;
        }
        else if (this.medicineSelect.name == "ยาขับปัสสาวะ 2") {
            this.medicineNumber = 13 ;
        }
        else if (this.medicineSelect.name == "ยาลดระดับไขมันไตรกลีเซอร์ไรด์") {
            this.medicineNumber = 14 ;
        }
        else if (this.medicineSelect.name == "ยาชะลอการสร้างไขมันแอลดีแอลคลอเรสเตอรอล") {
            this.medicineNumber = 15 ;
        }
        else if (this.medicineSelect.name == "ยาชะลอการสังเคราะห์ไขมัน") {
            this.medicineNumber = 16 ;
        }
        else if (this.medicineSelect.name == "ยายับยั้งการดูดซึมคอเลสเตอรอล") {
            this.medicineNumber = 17 ;
        }
        else if (this.medicineSelect.name == "ลดปริมาณคอเลสเตอรอล") {
            this.medicineNumber = 18 ;
        }
        else if (this.medicineSelect.name == "ยาช่วยขจัดกรดน้ำดี") {
            this.medicineNumber = 19 ;
        }
        else if (this.medicineSelect.name == "ยาลดไขมันไม่ดีในเลือด") {
            this.medicineNumber = 20 ;
        }
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
public onItemTap(args) {
    console.log("------------------------ ItemTapped: " + args.index);
}
    toBack () {
        console.log("connect");
        this.router.navigate(["/medicineSelect"]);
    }

 }