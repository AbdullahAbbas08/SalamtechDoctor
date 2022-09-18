import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";
import { PatientItem } from "src/Models/patient-item";
import { AppointmentService } from "src/Service/Appointment/appointment.service";
import { ClinicMangeService } from "src/Service/ClinicMange/clinic-mange.service";
import { LookupsService } from "src/Service/Lockups/lookups.service";

@Component({
  selector: "app-filter-appointment",
  templateUrl: "./filter-appointment.component.html",
  styleUrls: ["./filter-appointment.component.css"],
})
export class FilterAppointmentComponent implements OnInit {
  //#region Decalre Variables
  IamgeURL: string;
  MedicalType = [];
  medicalImg = [];
  p: number = 1;
  
  searchForm: FormGroup;
  clinics;
  medicalTypes;
  searchResult;
  public Result;
  toggleMore = false;
  lang=localStorage.lang;
  //#endregion

  //#region constructor
  constructor(
    private builder :FormBuilder,
    private AppointmentService: AppointmentService,
    private clinicService: ClinicMangeService,
    private LookupService: LookupsService,
    private appointmentService: AppointmentService,
    private SpinnerService: NgxSpinnerService
  ) {}
  //#endregion

  //#region On Init Method
  ngOnInit(): void {
    //#region  Init Values
    this.IamgeURL = environment.ImagesURL;
    document
      .getElementById("Current")
      ?.classList.remove("visited-appointemt-component");
    document
      .getElementById("History")
      ?.classList.remove("visited-appointemt-component");
    document
      .getElementById("Filter")
      ?.classList.add("visited-appointemt-component");
    //#endregion

    //#region Invoke Methods
    //#endregion

   
    this.getDoctorClicinc();
    this.initForm();
    this.getMedicalTypes();
  }

  initForm() {
    this.searchForm = this.builder.group({
      PatientName: [""],
      ClinicId: [parseInt("")],
      MedicalExaminationTypeId: [parseInt("")],
      FromDate: ["", Validators.required],
      ToDate: ["", Validators.required],
    });
  }

  isFieldValid(field): boolean {
    return (
      !this.searchForm.get(field)?.valid && this.searchForm.get(field)?.touched
    );
  }

  getDoctorClicinc() {
    this.SpinnerService.show();
    this.clinicService.GetDoctorClinics().subscribe((res) => {
      this.clinics = res.Data;
      this.SpinnerService.hide();
      // console.log(this.clinics);
    });
  }

  getMedicalTypes() {
    this.LookupService.GetMedicalType().subscribe((res) => {
      this.medicalTypes = res.Data;
      // console.log(this.medicalTypes);
    });
  }

  submit() {
    debugger
    if (this.searchForm.valid) {
      this.SpinnerService.show();

      this.searchForm
        .get("ClinicId")
        .setValue(parseInt(this.searchForm.get("ClinicId").value));
      this.searchForm
        .get("MedicalExaminationTypeId")
        .setValue(
          parseInt(this.searchForm.get("MedicalExaminationTypeId").value)
        );
      // console.log(this.searchForm.value);
      this.AppointmentService.SearchDoctorAppointment(
        this.searchForm.value
      ).subscribe(
        (res) => {

          this.searchResult = res.Data;
          this.SpinnerService.hide();
          // console.log(this.searchResult);
          this.AppointmentService.Result.next(this.searchResult);
        },
        (err) => {
          // console.log(err);
        }
      );
    } else {
      this.SpinnerService.hide();
      this.searchForm.markAllAsTouched();
    }
  }
}
