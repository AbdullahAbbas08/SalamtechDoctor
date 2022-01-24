export class GeneralResponse<T> {
  Message:string;
  MessageCode:number;
  Success:boolean;
  Data:T[];
}
