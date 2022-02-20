import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClinicSchedule } from 'src/Models/clinic-schedule';
import { ClinicScheduleDay } from 'src/Models/clinic-schedule-day';
import { CreateClinicSchedule } from 'src/Models/create-clinic-schedule';
import { Duration } from 'src/Models/duration';
import { GeneralResponse } from 'src/Models/general-response';
import { IdNameList } from 'src/Models/id-name-list';
import { Login } from 'src/Models/Login';
import { ClinicScheduleService } from 'src/Service/ClinicSchedule/clinic-schedule.service';
import { LookupsService } from 'src/Service/Lockups/lookups.service';
import { TranslateSwalsService } from 'src/Service/translateSwals/translate-swals.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clinic-schedual',
  templateUrl: './clinic-schedual.component.html',
  styleUrls: ['./clinic-schedual.component.css']
})
export class ClinicSchedualComponent implements OnInit {

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
  translation;

  //#endregion

  //#region constructor
  constructor( private ClinicScheduleService:ClinicScheduleService ,
               private LookupsService:LookupsService ,
               private fb:FormBuilder,
               private route:ActivatedRoute,
               private router:Router ,
               private translateSwal:TranslateSwalsService,
               private SpinnerService: NgxSpinnerService) { }
  //#endregion

  //#region OnInit Method
  ngOnInit(): void {

    //#region Init Values

    //#region Change Active Component In Sidebar 
    document.getElementById('sidebarinfo')?.classList.add('OnClick-Style');
    document.getElementById('sidebargalary')?.classList.add('OnClick-Style');
    document.getElementById('sidebarschedule')?.classList.add('OnClick-Style');
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
        Inactive                    :true
      }
      this.ClinicId = this.route.snapshot.paramMap.get('ClinicId');


    //#endregion

    //#region call Methods
    this.GetDurationMedicalExamination('en');
    // this.GetClinicSchedualByClinicId('en', this.ClinicId);
   let d = this.route.snapshot.data['ClinicSchedule'];
   this.ClinicSchedule = d.Data;

    for (let index = 1; index <= 7; index++) {
      this.GetClinicSchedualByClinicDayId('en', this.ClinicId,index);
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
      this.getTranslitation()
  }
  //#endregion

  getTranslitation()  {
    this.translateSwal.Translitation().subscribe((values) => {
      // console.log(values);
      this.translation =values 
      });
    }

  isFieldValid(field): boolean {
    return (
      !this.PeriodForm.get(field).valid && this.PeriodForm.get(field).touched
    )
  }

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
              title: this.translation.Error,
              text: err.error.Message,
              icon: 'error',
              showCancelButton: true,
              showConfirmButton:false,
              cancelButtonColor:"#f00",
              confirmButtonText: this.translation.Ok,
              cancelButtonText:this.translation.Ok,
              reverseButtons: true
            })
          }
        )
      }
      //#endregion

      //#region Get Duration Medical Examination
      GetDurationMedicalExamination(lang:string)
      {
          this.ClinicScheduleService.GetDurationMedicalExamination(lang).subscribe(
            (response)=>{
              this.DurationMedicalExamination = response.Data ;

              this.DurationMedicalExamination.forEach(element => {
                this.DurationMedicalExaminationList[element.Id] = element;
                  // console.log("dsdsd : ", this.DurationMedicalExaminationList[element.Id]);
              });
            },(err)=>{
              Swal.fire({
                title: this.translation.Error,
                text: err.error.Message,
                icon: 'error',
                showCancelButton: true,
                showConfirmButton:false,
                cancelButtonColor:"#f00",
                confirmButtonText: this.translation.Ok,
                cancelButtonText:this.translation.Ok,
                reverseButtons: true
              })
            })

          
      }
      //#endregion

      //#region Get Clinic Schedual By Clinic Id
      GetClinicSchedualByClinicId(lang:string,ID:number)
      {
        this.ClinicScheduleService.GetClinicSchedualByClinicId(lang,ID).subscribe(
          (response)=>{
            this.ClinicSchedule = response.Data;
            // console.log("ClinicSchedule : ", this.ClinicSchedule)
          },
          (err)=>{
            Swal.fire({
              title: this.translation.Error,
              text: err.error.Message,
              icon: 'error',
              showCancelButton: true,
              showConfirmButton:false,
              cancelButtonColor:"#f00",
              confirmButtonText: this.translation.Ok,
              cancelButtonText:this.translation.Ok,
              reverseButtons: true
            })
          }
        )
      }
      //#endregion

      //#region Get Clinic Schedual By Clinic Day Id
      GetClinicSchedualByClinicDayId(lang:string,ClinicId:number,DayId:number){
        this.ClinicScheduleService.GetClinicSchedualByClinicDayId(lang,ClinicId,DayId).subscribe(
          (response)=>{
            this.ClinicScheduleDayList[DayId] = response.Data;
            // console.log(response.Data);
            
          },
          (err)=>{
            Swal.fire({
              title: this.translation.Error,
              text: err.error.Message,
              icon: 'error',
              showCancelButton: true,
              showConfirmButton:false,
              cancelButtonColor:"#f00",
              confirmButtonText: this.translation.Ok,
              cancelButtonText:this.translation.Ok,
              reverseButtons: true
            })
          }
        )
      }
      //#endregion

      //#region Get Clinic Schedual By Clinic Day Id For One Day => To Reset
      GetClinicSchedualByClinicDayIdForOneDay(lang:string,ClinicId:number,DayId:number ,SchedualId:number ,Index:number){
        this.ClinicScheduleService.GetClinicSchedualByClinicDayId(lang,ClinicId,DayId).subscribe(
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
                  // console.log( this.ClinicScheduleDayList[DayId][Index]);
                }
            });

          },
          (err)=>{
            Swal.fire({
              title: this.translation.Error,
              text: err.error.Message,
              icon: 'error',
              showCancelButton: true,
              showConfirmButton:false,
              cancelButtonColor:"#f00",
              confirmButtonText: this.translation.Ok,
              cancelButtonText:this.translation.Ok,
              reverseButtons: true
            })
          }
        )
      }
      //#endregion

      //#region Create Clinic Schedule
      CreateDoctorClinicSchedual(NewPeriod:CreateClinicSchedule){
        // console.log(NewPeriod);
        
        this.ClinicScheduleService.CreateDoctorClinicSchedual(NewPeriod).subscribe(
          (respose)=>{
            // console.log(respose)
            this.SpinnerService.hide();
            this.GetClinicSchedualByClinicDayId('en',NewPeriod.ClinicId,NewPeriod.DayId);
            window.location.reload();
          },
          (err)=>{
            this.SpinnerService.hide();
            Swal.fire({
              title: this.translation.Error,
              text: err.error.Message,
              icon: 'error',
              showCancelButton: true,
              showConfirmButton:false,
              cancelButtonColor:"#f00",
              confirmButtonText: this.translation.Ok,
              cancelButtonText:this.translation.Ok,
              reverseButtons: true
            })
          }
        )
      }
      //#endregion

      //#region Update Doctor Clinic Schedual
        UpdateDoctorClinicSchedual(NewPeriod:ClinicScheduleDay){
          this.ClinicScheduleService.UpdateDoctorClinicSchedual(NewPeriod).subscribe(
            (respose)=>{
              // console.log(respose)
              this.SpinnerService.hide();
              Swal.fire({
                title: this.translation.UpdatedSuccessfully, 
                icon: 'success',
               
              })
            },
            (err)=>{
              this.SpinnerService.hide();
              Swal.fire({
                title: this.translation.Error,
                text: err.error.Message,
                icon: 'error',
                showCancelButton: true,
                showConfirmButton:false,
                cancelButtonColor:"#f00",
                confirmButtonText: this.translation.Ok,
                cancelButtonText:this.translation.Ok,
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
    
    if(this.PeriodForm.valid){
      this.SpinnerService.show();
      this.CreateClinicSchedule.ClinicId                      = +this.ClinicId;
      this.CreateClinicSchedule.DayId                         = DayId;
      this.CreateClinicSchedule.TimeFrom                      = this.PeriodForm.controls.DateFrom.value ;
      this.CreateClinicSchedule.TimeTo                        = this.PeriodForm.controls.DateTo.value ;
      this.CreateClinicSchedule.Fees                          = this.PeriodForm.controls.Fees.value ;
      this.CreateClinicSchedule.DurationMedicalExaminationId  = +this.PeriodForm.controls.DurationExamination.value;
      this.CreateClinicSchedule.Inactive                      = Active;
      // console.log(this.CreateClinicSchedule.ClinicId)
      // console.log(this.CreateClinicSchedule.Fees    );
  
      if(this.CreateClinicSchedule.TimeFrom <this.CreateClinicSchedule.TimeTo ){
        this.CreateDoctorClinicSchedual(this.CreateClinicSchedule)
      }
      else{
        this.SpinnerService.hide();
        Swal.fire(this.translation.Error
          , this.translation.endtime, 
          'error')
      }
    }
    else{
      this.SpinnerService.hide();
      this.PeriodForm.markAllAsTouched()
    }
    
  }
  //#endregion

  //#region Create New Period On Schedule 
  SubmitNewPeriod(DayId:number,Index:number ){

     // Remove Seconds Block From TimeFrom , TimeTo 
     this.ClinicScheduleDayList[DayId][Index].TimeFrom = this.ClinicScheduleDayList[DayId][Index].TimeFrom.substring(0,5);
     this.ClinicScheduleDayList[DayId][Index].TimeTo = this.ClinicScheduleDayList[DayId][Index].TimeTo.substring(0,5);
 
    //  console.log("Insert : ",this.ClinicScheduleDayList[DayId][Index])
    // console.log( this.ClinicScheduleDayList[DayId][Index].TimeFrom ,this.ClinicScheduleDayList[DayId][Index].TimeTo );

     if(this.ClinicScheduleDayList[DayId][Index].TimeFrom <this.ClinicScheduleDayList[DayId][Index].TimeTo){
      
      let NewPeriod = {
        DayId                       :this.ClinicScheduleDayList[DayId][Index].DayId,
        TimeFrom                    :this.ClinicScheduleDayList[DayId][Index].TimeFrom,
        TimeTo                      :this.ClinicScheduleDayList[DayId][Index].TimeTo,
        Fees                        :this.ClinicScheduleDayList[DayId][Index].Fees,
        DurationMedicalExaminationId:this.ClinicScheduleDayList[DayId][Index].DurationMedicalExaminationId,
        Inactive                    :this.ClinicScheduleDayList[DayId][Index].Inactive,
        ClinicId                    : +this.ClinicId
       } as CreateClinicSchedule;
  
      //  console.log(NewPeriod.ClinicId)
  
      //  console.log("NewPeriod : ",NewPeriod);
  
       if(NewPeriod.TimeFrom !="" && NewPeriod.TimeTo !="" && NewPeriod.Fees !=0 ){
          // Insert ClinicScheduleDay 
          this.CreateDoctorClinicSchedual(NewPeriod);
        
       }
    }
    else{
      Swal.fire(this.translation.Error
       , this.translation.endtime, 
       'error')
    }

     

  }
  //#endregion

  //#region Update New Period
  UpdateNewPeriod( DayId:number ,Index:number ){
    this.SpinnerService.show();
    // Remove Seconds Block From TimeFrom , TimeTo 
    this.ClinicScheduleDayList[DayId][Index].TimeFrom = this.ClinicScheduleDayList[DayId][Index].TimeFrom.substring(0,5);
    this.ClinicScheduleDayList[DayId][Index].TimeTo = this.ClinicScheduleDayList[DayId][Index].TimeTo.substring(0,5);
    // console.log( this.ClinicScheduleDayList[DayId][Index].TimeFrom ,this.ClinicScheduleDayList[DayId][Index].TimeTo );

    if(this.ClinicScheduleDayList[DayId][Index].TimeFrom <this.ClinicScheduleDayList[DayId][Index].TimeTo){
      // Update ClinicScheduleDay 
      this.UpdateDoctorClinicSchedual(this.ClinicScheduleDayList[DayId][Index]);
    }
    else{
    this.SpinnerService.hide();

      Swal.fire(this.translation.Error , this.translation.endtime , 'error')
    }
  


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

      //#region Next to Update Clinic Schedule Component
      Back() {
        // this.router.navigate(['main/updateclinic/UpdateClinicGalary/',this.ClinicId]);
        this.router.navigateByUrl('/main/updateclinic');
      }
      //#endregion
}
