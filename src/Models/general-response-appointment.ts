export class GeneralResponseAppointment<T> {
    Message:string;
    MessageCode:number;
    Success:boolean;
    Data:{TotalCount:number ,Items: T[]};
}
