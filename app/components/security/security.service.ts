import { Injectable } from "@angular/core";
import { getString, setString, getNumber, setNumber } from "application-settings";

export class securityService {

  static set setUserData(userDataJson: string){
    setString("user",userDataJson);
  }

  static get getUserData(): string {
    return getString("user");
  }

  static set setCheckHn(checkHnJson: string){
    setString("checkHn",checkHnJson);
  }
  
  static get getCheckHn(): string {
    return getString("checkHn");
  }
  static set setCheckRegister(checkRegisterJson: string){
    setString("checkRegister",checkRegisterJson);
  }
  
  static get getCheckRegister(): string {
    return getString("checkRegister");
  }

  static set setIdp(idpJson: string){
    setString("idp",idpJson);
  }
  
  static get getIdp(): string {
    return getString("idp");
  }

  static set setDataUser(dataUserJson: string){
    setString("dataUser",dataUserJson);
  }
  
  static get getDataUser(): string {
    return getString("dataUser");
  }

  static set setIsLogin(isLoginJson: string){
    setString("isLogin",isLoginJson);
  }
  
  static get getIsLogin(): string {
    return getString("isLogin");
  }

  static isLoggedIn(): boolean {
    return !!getString("isLogin");
  }

  static set setSelectBlood(selectBloodJson: string){
    setString("selectBlood",selectBloodJson);
  }
  
  static get getSelectBlood(): string {
    return getString("selectBlood");
  }

  static set setSelectBloodResult(selectBloodResultJson: string){
    setString("selectBloodResult",selectBloodResultJson);
  }
  
  static get getSelectBloodResult(): string {
    return getString("selectBloodResult");
  }

  static set setInfo(infoJson: string){
    setString("info",infoJson);
  }
  
  static get getInfo(): string {
    return getString("info");
  }

  static set setStandard(standardJson: string){
    setString("standard",standardJson);
  }
  
  static get getStandard(): string {
    return getString("standard");
  }

  static set setDiseases(diseasesJson: string){
    setString("diseases",diseasesJson);
  }
  
  static get getDiseases(): string {
    return getString("diseases");
  }

  static set setMedicineSelect(medicineSelectJson: string){
    setString("medicineSelect",medicineSelectJson);
  }
  
  static get getMedicineSelect(): string {
    return getString("medicineSelect");
  }

  static set setCostSelect(costSelectJson: string){
    setString("costSelect",costSelectJson);
  }
  
  static get getCostSelect(): string {
    return getString("costSelect");
  }

  static set setMeet(meetJson: string){
    setString("meet",meetJson);
  }
  
  static get getMeet(): string {
    return getString("meet");
  }

}