import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { GoogleMapsComponent } from "src/app/Shared/google-maps/google-maps.component";
import { environment } from "src/environments/environment";
import { Area } from "src/Models/Area";
import { City } from "src/Models/City";
import { ClinicInfoModel } from "src/Models/clinicInfoModel";
import { Coordinates } from "src/Models/Coordinates";
import { IdNameList } from "src/Models/id-name-list";
import { UpdateClinic } from "src/Models/update-clinic";
import { ClinicInfoService } from "src/Service/ClinicInfo/clinic-info.service";
import { LookupsService } from "src/Service/Lockups/lookups.service";

@Component({
  selector: "app-update-clinic-info",
  templateUrl: "./update-clinic-info.component.html",
  styleUrls: ["./update-clinic-info.component.css"],
})
export class UpdateClinicInfoComponent implements OnInit {
  FormInfo: FormGroup;

  formData = new FormData();
  coordinates;
  ClinicToUpdate: any;
  clinicId;
  clinicInfo;
  Cities;
  Areas;
  countries
  phones
  constructor(
    private modalService: NgbModal,
    private lookupService: LookupsService,
    private ClinicService: ClinicInfoService,
    private Router: Router,
    private route: ActivatedRoute,
    private builder:FormBuilder
  ) {
    this.route.paramMap.subscribe(param=>{
      this.clinicId=param.get('ID');
      this.getClinicInfo( this.clinicId)

    })
    this.coordinates = {} as Coordinates;

  }

  ngOnInit(): void {
    this.imgURL = "../../../../assets/img/DoctorImg/Rectangle 2.png";

   
  }

  getClinicInfo(id){
    this.ClinicService.GetDoctorClinicByClinicId(id).subscribe(res=>{
      this.clinicInfo=res.Data
      console.log(res.Data);
      this.initForm()
      this.getCity()
      this.getAreas()
      this.getCountry()

      this.phones = this.clinicInfo.HealthEntityPhoneDtos;
      for (let num of this.phones) {
        this.addPhone(num)
      }
    })
  }

  initForm(){
    this.FormInfo=this.builder.group({
      ClinicId :[this.clinicId , Validators.required],
      HealthEntityPhoneDtos: new FormArray([]),
      Name :[this.clinicInfo?.Name||'' , Validators.required],
      NameAr:[this.clinicInfo?.NameAr||'' , Validators.required],
      Email:[this.clinicInfo?.Email||'' , Validators.required],
      CountryId :[parseInt(this.clinicInfo?.CountryId) ||'' , Validators.required],
      CityId :[parseInt(this.clinicInfo?.CityId) ||'' , Validators.required],
      AreaId :[parseInt(this.clinicInfo?.AreaId) ||'' , Validators.required],
      Address :[this.clinicInfo?.Address ||'' , Validators.required],
      Latitude:[this.clinicInfo?.Latitude||''],
      Longitude:[this.clinicInfo?.Longitude||''],
      BlockNo:[this.clinicInfo?.BlockNo||''  ],
      FloorNo:[this.clinicInfo?.FloorNo||''  ],
      FixedFee :[this.clinicInfo?.FixedFee ||'' , Validators.required],
      clinicLogo:[this.clinicInfo?.imgURL||''],
    })
  }


  public get phones_control() {

    return (this.FormInfo.get('HealthEntityPhoneDtos') as FormArray).controls;
  }


  addPhone(x?) {
    const control = new FormControl(x);
    this.phones_control.push(control);
  }

  deleteFromGroup(index: number) {
    const del = this.FormInfo.get('HealthEntityPhoneDtos') as FormArray;
    del.removeAt(index);
  }


  getCountry(){
    this.lookupService.GetCountries('en').subscribe(
      (response)=>{
        this.countries =  response.Data;
        // console.log(this.countries);
    })
  }
  
getCity(){
  this.lookupService.GetCities('en').subscribe(
    (response)=>{
      this.Cities =  response.Data;
      // console.log(this.Cities);
  })
}
getAreas(){
  this.lookupService.GetAreas('en').subscribe(
    (response)=>{
      this.Areas =  response.Data;
      // console.log(this.Areas);
  })
}







  //#region openGoogelMapsModal
  openGoogelMapsModal() {
    const modalRef = this.modalService.open(GoogleMapsComponent, {
      scrollable: true,
      modalDialogClass:
        "modal-xl modal-dialog-centered modal-dialog-scrollable",
    });
    let data = {
      prop1: "Some Data",
      prop2: "From Parent Component",
      prop3: "This Can be anything",
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        this.ClinicToUpdate.Address = result.address;
      },
      (reason) => {}
    );
  }


  //#region review AND File FormData image from input file
  public imagePath: any;
  imgURL: any = "../../../../assets/img/DoctorImg/Rectangle 2.png";
  public message: string;

  preview(files: any) {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
    this.FormInfo.get('clinicLogo').setValue(files[0]);
    // console.log(this.FormInfo.get('clinicLogo'));
  }
  //#endregion




  submitClinic(){
    let arr = [];
    // console.log(this.addressForm.value);
    this.phones_control.map((phone , index) => {
      if (phone.value !== null) {
        arr.push(phone.value)
      }
      else {
        this.deleteFromGroup(index)
      }
    })

   this.FormInfo.get('HealthEntityPhoneDtos').setValue(arr)
   this.FormInfo.get('ClinicId').setValue(parseInt(this.FormInfo.get('ClinicId').value))
   this.FormInfo.get('CityId').setValue(parseInt(this.FormInfo.get('CityId').value))
   this.FormInfo.get('CountryId').setValue(parseInt(this.FormInfo.get('CountryId').value))
   this.FormInfo.get('AreaId').setValue(parseInt(this.FormInfo.get('AreaId').value))
   
    // console.log(this.FormInfo.value);
    if(this.FormInfo.valid){

      //#region Create Form Data
      let formData = new FormData();   
      formData.append("ClinicId",this.FormInfo.get('ClinicId').value as unknown as Blob)
      formData.append("CityId",  this.FormInfo.get('CityId').value as unknown as Blob)
      formData.append("CountryId", this.FormInfo.get('CountryId').value as unknown as Blob)
      formData.append("AreaId",  this.FormInfo.get('AreaId').value as unknown as Blob)
      formData.append("Name",  this.FormInfo.get('Name').value as unknown as Blob)
      formData.append("NameAr",  this.FormInfo.get('NameAr').value as unknown as Blob)
      formData.append("Email",  this.FormInfo.get('Email').value as unknown as Blob)
      formData.append("Address",  this.FormInfo.get('Address').value as unknown as Blob)
      formData.append("FixedFee",  this.FormInfo.get('FixedFee').value as unknown as Blob)
      formData.append("clinicLogo",  this.FormInfo.get('clinicLogo').value as unknown as Blob)
      formData.append("Latitude",  this.FormInfo.get('Latitude').value as unknown as Blob)
      formData.append("Longitude",  this.FormInfo.get('Longitude').value as unknown as Blob)
      formData.append("BlockNo",  this.FormInfo.get('BlockNo').value as unknown as Blob)
      formData.append("FloorNo",  this.FormInfo.get('FloorNo').value as unknown as Blob)
      formData.append("HealthEntityPhoneDtos", this.FormInfo.get('HealthEntityPhoneDtos') as unknown as Blob)
      //#endregion
     
      this.ClinicService.UpdateDoctorClinic(formData).subscribe((res)=>{
        console.log(res);
        this.Router.navigate(['clinic/gallary/',this.clinicId]);
       },
       (err)=>{
         console.log(err)
       })
    }

  }


}
