export class idp implements iIdp{
    
    password: string;
    username: string;
    isLogin: boolean;

    constructor(){
      this.password = "";
      this.username = "" ;
      this.isLogin = false ;
  }
  }