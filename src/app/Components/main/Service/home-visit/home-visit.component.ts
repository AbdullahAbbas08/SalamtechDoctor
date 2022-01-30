import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicSchedule } from 'src/Models/clinic-schedule';
import { ClinicScheduleDay } from 'src/Models/clinic-schedule-day';
import { CreateClinicSchedule } from 'src/Models/create-clinic-schedule';
import { Duration } from 'src/Models/duration';
import { GeneralResponse } from 'src/Models/general-response';
import { IdNameList } from 'src/Models/id-name-list';
import { DoctorService } from 'src/Service/DoctorService/doctor-service.service';
import { LookupsService } from 'src/Service/Lockups/lookups.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home-visit',
  templateUrl: './home-visit.component.html',
  styleUrls: ['./home-visit.component.css']
})
export class HomeVisitComponent implements OnInit {

  //#region Declare Variables
  PeriodForm : FormGroup ;
  HideBorder:boolean;
  GeneralResponse:GeneralResponse<IdNameList>=new GeneralResponse<IdNameList>();
  ClinicScheduleResponse:GeneralResponse<ClinicSchedule>=new GeneralResponse<ClinicSchedule>();
  DayList:IdNameList[];
  ClinicSchedule:ClinicSchedule[];
  DurationMedicalExamination:Duration[];
  DurationMedicalExaminationList:{[Id:number]:Duration}={};
  ClinicScheduleDay:ClinicScheduleDay;
  PeriodsDay:ClinicScheduleDay[];
  ClinicScheduleDayList:{[Id:number]:ClinicScheduleDay[]} = {}
  DayPeriodsList:{[ScheduleId:number]:ClinicScheduleDay} = {}
  CreateClinicSchedule:CreateClinicSchedule;
  ClinicId:any;

  //#endregion

  //#region constructor
  constructor( private DoctorServiceService:DoctorService ,
               private LookupsService:LookupsService ,
               private fb:FormBuilder,
               private route:ActivatedRoute,
               private router:Router,
               private toastr:ToastrService ) { }
  //#endregion

  //#region OnInit Method
  ngOnInit(): void {

    //#region Init Values
    this.DoctorServiceService.ActiveComponent = "Home Visits";
    //#region Change Active Component In Sidebar 
    document.getElementById('VideoCall')?.classList.remove('Active-Block');
    document.getElementById('Call')?.classList.remove('Active-Block');
    document.getElementById('Chat')?.classList.remove('Active-Block');
    document.getElementById('HomeVisits')?.classList.add('Active-Block');
    //#endregion

    this.DayList=[];
    this.DurationMedicalExamination=[];
    this.CreateClinicSchedule = {
        ClinicId                    :-1,
        DayId                       :-1,
        TimeFrom                    :"",
        TimeTo                      :"",
        Fees                        :-1,
        DurationMedicalExaminationId:-1,
        Inactive                    :false
      }
      this.ClinicId = 41;
      


    //#endregion

    //#region call Methods
    this.GetDurationMedicalExamination('en');

    let d = this.route.snapshot.data['DoctorHomeVisitSchedual'];
    this.ClinicSchedule = d.Data;

    for (let index = 1; index <= 7; index++) {
      this.GetDoctorHomeVisitSchedualByDayId(index);
    }

    //#endregion

    //#region  Register Form Section
          this.PeriodForm = this.fb.group(
            {
                DateFrom:['',[Validators.required]],
                DateTo:['',[Validators.required]],
                Fees:['',[Validators.required]],
                DurationExamination:['',[Validators.required]],
              });
      //#endregion

  }
  //#endregion

  //#region Consume API's

      //#region Get Days
      GetDays(lang:string)
      {
        this.LookupsService.GetDays(lang).subscribe(
          (response)=>{
            this.DayList =response.Data 
            // console.log( this.DayList);
          },
          (err)=>{
            Swal.fire({
              title: 'Error !',
              text: err.error.Message,
              icon: 'error',
              showCancelButton: true,
              showConfirmButton:false,
              cancelButtonColor:"#f00",
              confirmButtonText: 'OK',
              cancelButtonText:"OK",
              reverseButtons: true
            })
          }
        )
      }
      //#endregion

      //#region Get Duration Medical Examination
      GetDurationMedicalExamination(lang:string)
      {
          this.DoctorServiceService.GetDurationMedicalExamination(lang).subscribe(
            (response)=>{
              this.DurationMedicalExamination = response.Data ;

              this.DurationMedicalExamination.forEach(element => {
                this.DurationMedicalExaminationList[element.Id] = element;
                  // console.log("dsdsd : ", this.DurationMedicalExaminationList[element.Id]);
              });
            },(err)=>{
              Swal.fire({
                title: 'Error !',
                text: err.error.Message,
                icon: 'error',
                showCancelButton: true,
                showConfirmButton:false,
                cancelButtonColor:"#f00",
                confirmButtonText: 'OK',
                cancelButtonText:"OK",
                reverseButtons: true
              })
            })

          
      }
      //#endregion

      //#region Get Doctor Home Visit Schedual
      GetDoctorHomeVisitSchedual()
      {
        this.DoctorServiceService.GetDoctorHomeVisitSchedual().subscribe(
          (response)=>{
            this.ClinicSchedule = response.Data;
            console.log("ClinicSchedule : ", this.ClinicSchedule)
          },
          (err)=>{

          }
        )
      }
      //#endregion

      //#region Get Doctor Home Visit Schedual By DayId
      GetDoctorHomeVisitSchedualByDayId(DayId:number){
        this.DoctorServiceService.GetDoctorHomeVisitSchedualByDayId(DayId).subscribe(
          (response)=>{
            this.ClinicScheduleDayList[DayId] = response.Data;
          },
          (err)=>{
            Swal.fire({
              title: 'Error !',
              text: err.error.Message,
              icon: 'error',
              showCancelButton: true,
              showConfirmButton:false,
              cancelButtonColor:"#f00",
              confirmButtonText: 'OK',
              cancelButtonText:"OK",
              reverseButtons: true
            })
          }
        )
      }
      //#endregion

      //#region Get Clinic Schedual By Clinic Day Id For One Day => To Reset
      GetClinicSchedualByClinicDayIdForOneDay(lang:string,ClinicId:number,DayId:number ,SchedualId:number ,Index:number){
        this.DoctorServiceService.GetDoctorHomeVisitSchedualByDayId(DayId).subscribe(
          (response)=>{
            this.PeriodsDay = response.Data;

            this.PeriodsDay.forEach(element => {

                if(element.SchedualId ==SchedualId )
                {
                  this.ClinicScheduleDayList[DayId][Index].TimeFrom = element.TimeFrom; 
                  this.ClinicScheduleDayList[DayId][Index].TimeTo = element.TimeTo; 
                  this.ClinicScheduleDayList[DayId][Index].Fees = element.Fees; 
                  this.ClinicScheduleDayList[DayId][Index].Inactive = element.Inactive; 
                  this.ClinicScheduleDayList[DayId][Index].DurationMedicalExaminationId = element.DurationMedicalExaminationId; 
                }
            });

          },
          (err)=>{
            Swal.fire({
              title: 'Error !',
              text: err.error.Message,
              icon: 'error',
              showCancelButton: true,
              showConfirmButton:false,
              cancelButtonColor:"#f00",
              confirmButtonText: 'OK',
              cancelButtonText:"OK",
              reverseButtons: true
            })
          }
        )
      }
      //#endregion

      //#region Create Clinic Schedule
      CreateDoctorHomeVisitSchedual(NewPeriod:CreateClinicSchedule){
       this.DoctorServiceService.CreateDoctorHomeVisitSchedual(NewPeriod).subscribe(
          (response)=>{
            this.GetDoctorHomeVisitSchedualByDayId(NewPeriod.DayId);
            this. toastr.success("Message : ",response.Message);
          },
          (err)=>{
            // console.log("err : ",err.error.Message)              
            // this.toastr.error(err.error.Message, 'Errors...!');
            Swal.fire({
              title: 'Error !',
              text: err.error.Message,
              icon: 'error',
              showCancelButton: true,
              showConfirmButton:false,
              cancelButtonColor:"#f00",
              confirmButtonText: 'OK',
              cancelButtonText:"OK",
              reverseButtons: true
            })
          },
        )
      }
      //#endregion

      //#region Update Doctor Clinic Schedual
        UpdateDoctorClinicSchedual(NewPeriod:ClinicScheduleDay){
          this.DoctorServiceService.UpdateDoctorClinicSchedual(NewPeriod).subscribe(
            (respose)=>{
              console.log(respose)
              this.toastr.success('Updated Successfully' , 'Update Operation');
            },
            (err)=>{
              Swal.fire({
                title: 'Error !',
                text: err.error.Message,
                icon: 'error',
                showCancelButton: true,
                showConfirmButton:false,
                cancelButtonColor:"#f00",
                confirmButtonText: 'OK',
                cancelButtonText:"OK",
                reverseButtons: true
              })
            }
          )
        }
      //#endregion

  //#endregion

  hideborder()
  {

  }

  //#region Select Duration Method event change
  SelectDuration(event:any){
    // this.PeriodForm.controls.DurationExamination = event.target.value;
  }
  //#endregion

  //#region counter to Loop On Fixed Number Method
    counter(i: number) {
      return new Array(i);
  }
  //#endregion

  //#region Add Period
  AddPeriod(DayId:number)
  {
    // this.Counter+=1;
    // let object = this.ClinicScheduleDayList[DayId].find(x=>x.DayId == DayId);

    this.CreateClinicSchedule.DayId = DayId;
    this.CreateClinicSchedule.ClinicId= this.ClinicId;
    this.CreateClinicSchedule.DurationMedicalExaminationId=1;
    this.CreateClinicSchedule.Fees=0;
    this.CreateClinicSchedule.Inactive=false;
    this.CreateClinicSchedule.TimeFrom="";
    this.CreateClinicSchedule.TimeTo="";

    // this.ClinicScheduleDayList[DayId].push(this.CreateClinicSchedule)
    
  }
  //#endregion

  //#region nDelete Period
    DeletePeriod()
    {
      // if(this.Counter >0)
      // this.Counter-=1;
    }
  //#endregion

  //#region Create New Period =>  At First Time 
  SubmitPeriod(DayId:number,Active:boolean){

    this.CreateClinicSchedule.ClinicId                      =  this.ClinicId;
    this.CreateClinicSchedule.DayId                         = DayId;
    this.CreateClinicSchedule.TimeFrom                      = this.PeriodForm.controls.DateFrom.value ;
    this.CreateClinicSchedule.TimeTo                        = this.PeriodForm.controls.DateTo.value ;
    this.CreateClinicSchedule.Fees                          = this.PeriodForm.controls.Fees.value ;
    this.CreateClinicSchedule.DurationMedicalExaminationId  = +this.PeriodForm.controls.DurationExamination.value;
    this.CreateClinicSchedule.Inactive                      = Active;
    
    this.CreateDoctorHomeVisitSchedual(this.CreateClinicSchedule)
    this.reloadCurrentRoute();

  }
  //#endregion

  //#region Create New Period On Schedule 
  SubmitNewPeriod(DayId:number,Index:number ){

     // Remove Seconds Block From TimeFrom , TimeTo 
     this.ClinicScheduleDayList[DayId][Index].TimeFrom = this.ClinicScheduleDayList[DayId][Index].TimeFrom.substring(0,5);
     this.ClinicScheduleDayList[DayId][Index].TimeTo = this.ClinicScheduleDayList[DayId][Index].TimeTo.substring(0,5);
 
     console.log("Insert : ",this.ClinicScheduleDayList[DayId][Index])
 
     let NewPeriod = {
      DayId                       :this.ClinicScheduleDayList[DayId][Index].DayId,
      TimeFrom                    :this.ClinicScheduleDayList[DayId][Index].TimeFrom,
      TimeTo                      :this.ClinicScheduleDayList[DayId][Index].TimeTo,
      Fees                        :this.ClinicScheduleDayList[DayId][Index].Fees,
      DurationMedicalExaminationId:this.ClinicScheduleDayList[DayId][Index].DurationMedicalExaminationId,
      Inactive                    :this.ClinicScheduleDayList[DayId][Index].Inactive,
      ClinicId                    : this.ClinicId
     } as CreateClinicSchedule;

    //  console.log("NewPeriod : ",NewPeriod);

     if(NewPeriod.TimeFrom !="" && NewPeriod.TimeTo !="" && NewPeriod.Fees !=0 ){
        // Insert ClinicScheduleDay 
        this.CreateDoctorHomeVisitSchedual(NewPeriod);
      
     }
     

  }
  //#endregion

  //#region Update New Period
  UpdateNewPeriod( DayId:number ,Index:number ){

    // Remove Seconds Block From TimeFrom , TimeTo 
    this.ClinicScheduleDayList[DayId][Index].TimeFrom = this.ClinicScheduleDayList[DayId][Index].TimeFrom.substring(0,5);
    this.ClinicScheduleDayList[DayId][Index].TimeTo = this.ClinicScheduleDayList[DayId][Index].TimeTo.substring(0,5);

    // console.log("update : ",this.ClinicScheduleDayList[DayId][Index])

     // Update ClinicScheduleDay 
     this.UpdateDoctorClinicSchedual(this.ClinicScheduleDayList[DayId][Index]);

  }
  //#endregion

  //#region Add New Period =>  Periods Exist On Day ( Drow Block )
  AddNewPeriod(DayId:number){

    // Check If Empty Period Exist 
    let EmptyPeriod : ClinicScheduleDay | undefined = this.ClinicScheduleDayList[DayId].find(item=>item.SchedualId == -1);
    
    // To Prevent Repetition Empty Period
    if( typeof(EmptyPeriod) == 'undefined' ) {

        // Create Empty Period
        let NewPeriod = {
          DayName: '',
          SchedualId:-1,
          DayId:DayId ,
          TimeFrom: '',
          TimeTo: '',
          Fees: 0,
          DurationMedicalExaminationId: 1,
          Inactive:false
        } as ClinicScheduleDay;

        // Push this.Empty period Into List
        this.ClinicScheduleDayList[DayId].push(NewPeriod);
        document.getElementById('DisplayNewPeriod'+DayId)?.scrollIntoView(); 
        // console.log("true"); 
    }
  }
  //#endregion

  //#region Reset Period
  ResetPeriod(DayId:number,Index:number,SchedualId:number){

      this.GetClinicSchedualByClinicDayIdForOneDay('en', this.ClinicId,DayId ,SchedualId ,Index); 
      this.GetDurationMedicalExamination('en');
      
  }
  //#endregion

  //#region Flag Active Method
  FlagActive(Index:number,DayId:number,ClinicScheduleDay:ClinicScheduleDay )
  {

     // Switch ClinicScheduleDay Inactive
     if(ClinicScheduleDay.Inactive == true){

      ClinicScheduleDay.Inactive = false; 
      // To Add New Period => Set Inactive false
      this.ClinicScheduleDayList[DayId][Index].Inactive = false;

      }
      else{

        ClinicScheduleDay.Inactive = true;
        // To Add New Period => Set Inactive false
        this.ClinicScheduleDayList[DayId][Index].Inactive = true; 

      }

      // Remove Seconds Block From TimeFrom , TimeTo 
      ClinicScheduleDay.TimeFrom = ClinicScheduleDay.TimeFrom.substring(0,5);
      ClinicScheduleDay.TimeTo = ClinicScheduleDay.TimeTo.substring(0,5);


      // Check If Period Will Add At First Time => Set Inactive Only Without Send Request Update
      if(ClinicScheduleDay.SchedualId != -1)
        {
            // Update ClinicScheduleDay Inactive
            this.UpdateDoctorClinicSchedual(ClinicScheduleDay);
        }
     
  }
  //#endregion

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

}
