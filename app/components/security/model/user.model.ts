export class user implements iUser{

    idCard: string;
    nameTitle: string;
    name: string;
    surname: string;
    gender: string;
    birthDay: string;
    nation: string;
    religion: string;
    address: string;
    telephone: string;
    medicalEligibilityVerification: string;
    symptom: string;
    nameRelative: string;
    surnameRelative: string;
    contact: string;
    telephoneRelative: string;
    pic: string;

    constructor(){

      this.idCard = "";
      this.nameTitle = "";
      this.name = "";
      this.surname = "" ;
      this.gender = "" ;
      this.birthDay = "";
      this.nation = "" ;
      this.religion = "" ;
      this.address = "" ;
      this.telephone = "" ;
      this.medicalEligibilityVerification = "" ;
      this.symptom = "" ;
      this.nameRelative = "" ;
      this.surnameRelative = "" ;
      this.contact = "" ;
      this.telephoneRelative = "" ;
    }
  }