import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { DoctorInfoModel } from "src/Models/doctor-info-model";
import { DoctorProfile } from "src/Models/doctor-profile";
import { DropDownModel } from "src/Models/drop-down-model";
import { IdNameList } from "src/Models/id-name-list";
import { UpdateProfile } from "src/Models/update-profile";
import { DoctorService } from "src/Service/Doctor/doctor.service";
import { SignupService } from "src/Service/signup/signup.service";
import Swal from "sweetalert2"; 
import { TranslateSwalsService } from 'src/Service/translateSwals/translate-swals.service';

@Component({
  selector: "app-update-doctor-info",
  templateUrl: "./update-doctor-info.component.html",
  styleUrls: ["./update-doctor-info.component.css"],
})
export class UpdateDoctorInfoComponent implements OnInit {
  //#region  Declare Variables
  DoctorInfoForm: FormGroup;
  DropDownModel: DropDownModel;
  DoctorInfoModel: DoctorInfoModel;
  DropDownList_Speciality: IdNameList[];
  DropDownList_SubSpeciality: IdNameList[];
  DropDownList_SeniorityLevel: IdNameList[];
  DropDownList_GetCountries: IdNameList[];
  DoctorProfile: DoctorProfile;
  url_img: string;
  UpdateDoctorProfile: UpdateProfile;
  DoctorSubSpecial:any[];
  date:string;
  Seniority:string;
  specialist:string;
  //#endregion
  selectedItems= [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'Id',
    textField: 'Name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 7,
    allowSearchFilter: true,
    noDataAvailablePlaceholderText: 'hello'
  };
  translation;

  //#region Constructor
  constructor(
    private fb: FormBuilder,
    private SignupService: SignupService,
    private router: Router,
    private DoctorService: DoctorService,
    private toaster:ToastrService,
    private translateSwal:TranslateSwalsService
  ) {}
  //#endregion

  //#region On Init Method
  ngOnInit(): void {
    //#region Init Values
    document.getElementById("Doctorinfo")?.classList.add("OnClick-Style");
    document.getElementById("Signup")?.classList.add("OnClick-Style");
    this.DropDownList_Speciality = [];
    this.DoctorInfoModel = new DoctorInfoModel();
   
    this.DoctorSubSpecial = [];
    // this.DoctorInfoForm.controls.ImageDoctor.value = "";
    // this.DropDownModel.Data = [];
    //#endregion

    //#region  Register Form Section

    //#endregion

    //#region call Methods
    this.GetSpecialistIdName("en");
    this.SeniorityLevelIdName("en");
    this.GetCountries("en");
    this.getDoctorProfile();

  
    this.getTranslitation()
  }
  //#endregion

  getTranslitation()  {
    this.translateSwal.Translitation().subscribe((values) => {
      // console.log(values);
      this.translation =values 
      });
    }
  //#endregion

  initForm() {
    this.DoctorInfoForm = this.fb.group({
 
      ImageDoctor: [this.DoctorProfile.Image, [Validators.nullValidator]],
     
      Speciality: [this.DoctorProfile.SpecialistId, [Validators.nullValidator]],
      SubSpeciality: [
        this.DoctorProfile.DoctorSubSpecialist ,
        [Validators.required],
      ],
      BiographyAr: [this.DoctorProfile.DoctorInfo,  ],
      Biography: [this.DoctorProfile.DoctorInfoAr, ],
    });

    this.url_img = environment.ImagesURL+this.DoctorProfile.Image;
    // this.url_img += this.DoctorProfile.Image;

    if (this.DoctorProfile.GenderId == 1) {
      this.DoctorInfoForm.controls.Gender?.setValue("Male");
    } else {
      this.DoctorInfoForm.controls.Gender?.setValue("Female");
    }

    this.Seniority =  this.DropDownList_SeniorityLevel.find(
      (x) => x.Id == this.DoctorProfile.SeniorityLevelId
    ).Name

    this.specialist=  this.DropDownList_Speciality.find(
      (x) => x.Id == this.DoctorProfile.SpecialistId
    ).Name

    // this.GetSubSpecialistIdName("en", this.DoctorProfile.SpecialistId);
    // console.log( this.DropDownList_SubSpeciality);
    // console.log(this.DoctorInfoForm.value);
    

  }

  //#region Definition API's

  //#region GetSubSpecialistIdName
  GetSubSpecialistIdName(lang: string, specialListId: number) {
    this.DoctorService.GetSubSpecialistIdName(lang, specialListId).subscribe(
      (response) => {
        this.DropDownList_SubSpeciality = response.Data;
        // console.log( this.DropDownList_SubSpeciality);
        this.initForm();
        // console.log(this.url_img);
        
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  //#endregion

  //#region Create Profile
  CreateProfile(lang: string, _DoctorInfoModel: FormData) {
    this.DoctorService.CreateProfile(lang, _DoctorInfoModel).subscribe(
      (response) => {
        // console.log(response);
        
        this.router.navigateByUrl("/doctor-profile/certificates");
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  //#endregion

  //#region Update Profile
  UpdateProfile(obj:UpdateProfile) {
    this.DoctorService.UpdateProfile(obj).subscribe(
      (response) => {
        // this.router.navigateByUrl("/doctor-profile/certificates");
        // console.log(response)
        this.toaster.success(this.translation.DocInfo,this.translation.UpdatedSuccessfully);
        this.router.navigate(['update-doctor-profile/certificates'])
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  //#endregion

  //#region  GetSpecialistIdName
  GetSpecialistIdName(lang: string) {
    this.DoctorService.GetSpecialistIdName(lang).subscribe(
      (data) => {
        this.DropDownModel = data;
        this.DropDownList_Speciality = this.DropDownModel.Data;
        // console.log(this.DropDownList);
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  //#endregion

  //#region GetSubSpecialistIdName
  SeniorityLevelIdName(lang: string) {
    this.DoctorService.SeniorityLevelIdName(lang).subscribe(
      (response) => {
        this.DropDownList_SeniorityLevel = response.Data;
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  //#endregion

  //#region GetSubSpecialistIdName
  GetCountries(lang: string) {
    this.DoctorService.GetCountries(lang).subscribe(
      (response) => {
        this.DropDownList_GetCountries = response.Data;
      },
      (err) => {}
    );
  }
  //#endregion

  //#region Get Doctor Profile

  //#endregion

  //#region
  // UpdateProfile(){
  //   this.DoctorService.UpdateProfile()
  // }
  //#endregion
  //#endregion

  //#region Doctor Info Submit Method
  DoctorInfoSubmit() {
    let arr=[]
    this.DoctorInfoForm.get('SubSpeciality').value.map(item=>{
     if(item.Id){
      arr.push(item.Id)
     }
     else{
       arr.push(item)
     }
    })
    
    let obj = {
      "DoctorInfo":this.DoctorInfoForm.controls.Biography.value,
      "DoctorInfoAr":this.DoctorInfoForm.controls.BiographyAr.value,
      "DoctorSubSpecialist": arr
    } as UpdateProfile;
   
 

    document.getElementById("Certificates")?.classList.add("OnClick-Style");

    this.UpdateProfile(obj);
  }
  //#endregion

  //#region SelectSpeciality Method event change
  // SelectSpeciality(event: any) {
  //   this.DoctorInfoForm.controls.Speciality = event.target.value;
    
  // }
  //#endregion

  //#region SubSpeciality Method event change
  SelectSubSpeciality(event: any) {
    this.DoctorInfoForm.controls.SubSpeciality = event.target.value;
    this.DoctorSubSpecial.push(Number(event.target.value));
    // console.log(this.DoctorSubSpecial);
    
  }
  //#endregion

  //#region Seniority Method event change
  SelectSeniority(event: any) {
    this.DoctorInfoForm.controls.Seniority = event.target.value;
  }
  //#endregion

  //#region Countries Method event change
  SelectCountries(event: any) {
    this.DoctorInfoForm.controls.Country = event.target.value;
  }
  //#endregion

  //#region Gender Method event change
  SelectGender(event: any) {
    if (event.target.value != "") {
      this.DoctorInfoForm.controls.Gender = event.target.value;
    }
  }
  //#endregion

  //#region review AND File FormData image from input file
  public imagePath: any;
  imgURL: any = "../../../../assets/img/DoctorImg/avatar.png";
  public message: string;

  preview(files: any) {
    if (files.length === 0) return;

    if (files[0].size > 3000000)
    {
      Swal.fire(
        this.translation.Error,
        this.translation.imagesize,
        'error'
      )
    this.message = "image size is larger than 3mb.";
    return;
  }
  
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
    this.DoctorInfoModel.profileImage = files[0];
    // this.FormDataImage.append('EpisodeIamge', files[0]);
  }
  //#endregion

  getDoctorProfile() {
    this.DoctorService.GetDoctorProfile().subscribe(
      (response) => {
        this.DoctorProfile = response.Data;
        this.url_img = environment.ImagesURL+this.DoctorProfile.Image;
        this.GetSubSpecialistIdName('en',this.DoctorProfile.SpecialistId)
        this.date =  response.Data.Birthday.substring(0, 10)
      //  console.log( this.DropDownList_SubSpeciality);
       
        
      },
      (err) => {
        // console.log(err);
      }
    );
  }

  back(){
    this.router.navigateByUrl("/main");
  }
}
