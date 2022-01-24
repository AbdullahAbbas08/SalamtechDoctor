export class LoginResponse{
  Message:string;
  MessageCode:number;
  Success:boolean;
  Data:{
    Id: number
    Phone:string
    Token:string
  }

}
