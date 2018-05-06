import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { DatePicker } from "ui/date-picker";
import { securityService } from "../../../../security/security.service";
import { info } from "../../../../security/model/info.model"
@Component({
    selector: "my-modal",
    templateUrl: "showInfo.component.html",
    styleUrls: ['showInfo.component.css'],
    moduleId: module.id
})
export class showInfoComponent {
    dataUser ;
    info: info ;
    infoName ;
    public frameworks: Array<string>;
    dataInfo = [
        {
            dataText: "   Hb A1c (Hemoglobin A1c) เป็นการตรวจค่าเฉลี่ยระดับน้ำตาลในเลือดในช่วง 2-3 เดือนที่ผ่านมา เพื่อพิจารณาและประเมินผลการรักษาในภาพรวมช่วง 2-3 เดือนที่ผ่านมา ว่าคุณสามารถควบคุมระดับน้ำตาลได้หรือไม่ และใช้เพื่อการคัดกรองและวินิจฉัยภาวะเบาหวานในปัจจุบันด้วยการตรวจ Hb A1c สามารถดูผลการควบคุมระดับน้ำตาลในเลือดในช่วงที่ผ่านมาเป็นเดือนๆได้ เนื่องจาก เป็นการนำผลของระดับน้ำตาลที่เกาะอยู่ที่ส่วนประกอบในเม็ดเลือดแดง ที่เรียกว่า ฮีโมโกลบิน (hemoglobin) ซึ่งน้ำตาลนี้จะเกาะอยู่นานจนสิ้นอายุขัยของเม็ดเลือดแดง ซึ่งระยะเวลานานถึง 3 เดือน มาตรวจหาค่าเฉลี่ยนั้นเอง"
        },
        {
            dataText: "   ระดับกลูโคสในเลือด กลูโคสในเลือดมาจากอาหารที่เรารับประทาน เช่น อาหารแป้ง ไขมัน หรือโปรตีน นอกจากนั้นน้ำตาลในเลือดส่วนหนึ่งมาจากกรสร้าง เช่นจากตับ หรือการหลั่งจากน้ำตาลที่สะสมที่ตับ ตับอ่อนจะผลิตฮอร์โมนที่ชื่อว่า อินซูลินเพื่อนำน้ำตาลเข้าเซลล์"
        },
        {
            dataText: "   High-density lipoprotein cholesterol (HDL-C) ประกอบไปด้วย cholesterol, phospholipid, และ protein,ซึ่งสร้างจากตับและลำไส้ HDL-c ไม่มีในอาหารร่างกายสร้างจากตับ High density lipoprotein หรือการตรวจวัดค่า HDL-c เป็นการวัดปริมาณไขมันชนิดดีต่อร่างกาย เนื่องจาก HDL-c เป็นตัวนำพาไขมันคลอเลสเตอรอลไม่ดี ออกจากเนื้อเยื่อไปทำลายที่ตับดังนั้นค่า HDL-c ยิ่งสูงยิ่งดี"
        },
        {
            dataText: "   ระดับ LDL ในเลือด มีความสัมพันธ์ชัดเจนกับการเป็นโรคหัวใจและหลอดเลือด ไขมัน LDL ทำหน้าที่เป็นตัวนำโคเลสเตอรอลทั้งหลายออกจากตับเข้าสู่กระแสเลือด เมื่อเซลล์เลือกใช้โคเลสเตอรอลที่ต้องการไปแล้ว โคเลสเตอรอลที่เหลืออยู่ในกระแสเลือดก็จะพอกเป็นตุ่มอยู่ที่ผนังของหลอด เลือดทำให้หลอดเลือดแข็ง ตีบ นานไปตุ่มเหล่านี้ปริแตกออกทำให้มีลิ่มเลือดเข้ามาผสมโรงพอกจนอุดตันหลอด เลือด ผลตามมาคืออวัยวะสำคัญที่ต้องอาศัยเลือดจากหลอดเลือดเช่นหัวใจ สมอง ไต เกิดขาดเลือดไปเลี้ยง กลายเป็นโรคเช่น หัวใจขาดเลือด อัมพาตอัมพฤกษ์ ความดันเลือดสูง ไตวาย เป็นต้น"
        },
        {
            dataText: "   เมื่อมีการกินอาหารเข้าไปในร่างกายไตรกลีเซอไรด์จะถูกส่งผ่านเข้าไปในกระแสเลือด โดยอาศัยตัวช่วยอย่างไลโปโปรตีนและส่งต่อไปยังเซลล์ส่วนต่างๆของร่างกายหากมีปริมาณที่มากเกินไปจะทำการส่งไตรกลีเซอไรด์ไปเก็บที่เนื้อเยื่อไขมันตามส่วนต่างๆของร่างกาย ซึ่งสาเหตุนี้เองทำให้เกิดการอ้วนขึ้นได้ ในผู้ที่ทานอาหารมากเกินความจำเป็น"
        },
        {
            dataText: "   เซลล์เม็ดเลือดที่มีปริมาณมากที่สุด ทำหน้าที่สำคัญคือการขนส่งออกซิเจน (Oxygen) จากปอดไปสู่ส่วนต่างๆ ของร่างกาย โดยในการขนส่งออกซิเจนนั้น จะทำโดยโมเลกุลของโปรตีนชนิดหนึ่งที่อยู่ภายในเซลล์เม็ดเลือดแดงซึ่งมีชื่อว่าฮีโมโกลบิน (Hemoglobin)"
        },
        {
            dataText: "   bilirubin นั้นเป็นผลมาจากการที่เม็ดเลือดแดงซึ่งหมดอายุ (ปกติจะมีอายุขัยเพียงประมาณ 120 วัน) ก็จะถูกม้าม จับตัว แล้วทำการสลาย hemoglobin ที่อยู่ภายในเม็ดเลือดแดงให้ส่วนหนึ่งกลายเป็นกรดอะมิโนเช่นเดียวกับสารอาหารที่ร่างกายใช้ประโยชน์ในฐานะสารโปรตีน"
        },
        {
            dataText: "   ฮีโมโกลบิน เป็นโมเลกุลโปรตีนภายในเซลล์เม็ดเลือดแดง เกิดจากโมเลกุลโปรตีน 4 ตัวที่เชื่อมต่อกัน หรือเรียกว่าสายโกลบูลิน (Globulin Chains) มีหน้าที่ลำเลียงออกซิเจนจากปอดไปยังส่วนต่าง ๆ ของร่างกาย"
        },
        {
            dataText: "   ความเข้มข้นของเลือดเป็นการตรวจเพื่อหาปริมาตรเม็ดเลือดแดงในเลือดหรือ ปริมาตรเซลล์อัดแน่นเป็นการวัดว่าร่างกายมีเม็ดเลือดแดงพอหรือไม่"
        },
        {
            dataText: "   ปริมาตรของเซลล์เม็ดเลือดแดง 1 เซลล์ หรือเป็นค่าเฉลี่ยปานกลางของปริมาตรเซลล์เม็ดเลือดแดงจำนวน 1 เซลล์ จะเป็นค่าที่บอกว่าเซลล์เม็ดเลือดแดงมีขนาดใหญ่ หรือขนาดเล็ก"
        },
        {
            dataText: "   เป็นสารต้้งต้นที่โมเลกุลฮีม (heme) ซึ่ง 85% มาจากเม็ดเลือดแดง 15% มาจากเซลตับและอื่นๆ ฮีมทั้งหลายเมื่อเซลต้นสังกัดตายลง ตัวฮีมเองก็ถูกย่อยสลาย (metabolized) กลายเป็นน้ำดี (bilirubin) ซึ่งตัวนี้มันไม่ชอบไปกับน้ำ จึงไม่ออกไปทางปัสสาวะ"
        },
        {
            dataText: "   ภาวะความเป็นกรดหรือด่างของสารละลายในน้ำ สารละลายที่มีค่า pH ต่ำกว่า 7 จะมีภาวะเป็นกรด และสารละลายที่มีค่า pH สูงกว่า 7 จะมีภาวะเป็นด่าง"
        },
        {
            dataText: "   สารประกอบอินทรีย์ ซึ่งเป็นพอลิเมอร์สายยาวของกรดอะมิโน (amino acid) ส่วนในทางของโภชนาการโปรตีนนั้นเป็นสารอาหารที่ให้พลังงาน โดยโปรตีน 1 กรัมจะให้พลังงาน 4 แคลอรี (calorie) โปรตีนเป็นสารอาหารที่มีความจำเป็นต่อร่างกายของมนุษย์และสัตว์"
        },
        {
            dataText: "   คีโตนในปัสสาวะจะพบได้ในผู้ป่วยโรคเบาหวานที่คุมไม่ได้ น้ำตาลในเลือดขึ้นสูงร่างกายไม่สามารถใช้น้ำตาลเพื่อให้เกิดพลังงานได้ จำเป็นต้องมีการสลายไขมันทำให้เกิดคีโตน"
        }
    ] ;
    i ;
    public constructor(private params: ModalDialogParams) {   
    }
    configure(datePicker: DatePicker) {
    }
    ngOnInit(){
        this.dataUser = JSON.parse(securityService.getDataUser);
        this.info = JSON.parse(securityService.getInfo);
        console.log(securityService.getInfo);
        this.i = this.info.numberIndex ;

        if (this.info.numberIndex == "0") {
            this.i = 0 ;
            this.infoName = "HbA1C"
        }
        else if (this.info.numberIndex == "1") {
            this.i = 1 ;
            this.infoName = "Glucose"
        }
        else if (this.info.numberIndex == "2") {
            this.i = 2 ;
            this.infoName = "HDL"
        }
        else if (this.info.numberIndex == "3") {
            this.i = 3 ;
            this.infoName = "LDL"
        }
        else if (this.info.numberIndex == "4") {
            this.i = 4 ;
            this.infoName = "Triglycerides"
        }
        else if (this.info.numberIndex == "5") {
            this.i = 5 ;
            this.infoName = "RBC"
        }
        else if (this.info.numberIndex == "6") {
            this.i = 6 ;
            this.infoName = "Bilirubin"
        }
        else if (this.info.numberIndex == "7") {
            this.i = 7 ;
            this.infoName = "Hb"
        }
        else if (this.info.numberIndex == "8") {
            this.i = 8 ;
            this.infoName = "Hct"
        }
        else if (this.info.numberIndex == "9") {
            this.i = 9 ;
            this.infoName = "MCV"
        }
        else if (this.info.numberIndex == "10") {
            this.i = 10 ;
            this.infoName = "Urobilinogen"
        }
        else if (this.info.numberIndex == "11") {
            this.i = 11 ;
            this.infoName = "pH"
        }
        else if (this.info.numberIndex == "12") {
            this.i = 12 ;
            this.infoName = "Protein"
        }
        else if (this.info.numberIndex == "13") {
            this.i = 13 ;
            this.infoName = "Ketone"
        }

    }
    public close(res: Date) {
        this.params.closeCallback(res);
    }

}