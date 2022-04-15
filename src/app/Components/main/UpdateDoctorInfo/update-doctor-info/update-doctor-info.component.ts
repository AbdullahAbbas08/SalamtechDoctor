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
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from "@angular/common";

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
  subspecialist:string;
  formData:FormData;
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
    private translateSwal:TranslateSwalsService,
    private SpinnerService: NgxSpinnerService,
    private datePipe: DatePipe
  ) {}
  //#endregion

  //#region On Init Method
  ngOnInit(): void {
    this.formData = new FormData();
    //#region Init Values
    document.getElementById("Doctorinfo")?.classList.add("OnClick-Style");
    document.getElementById("Signup")?.classList.add("OnClick-Style");
    this.DropDownList_Speciality = [];
    this.DoctorInfoModel = new DoctorInfoModel();
   
    this.DoctorSubSpecial = [];
   this.subspecialist = "";
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
    // console.log("date : ",this.DoctorProfile.Birthday);
    this.DoctorInfoForm = this.fb.group(
      {
          FirstName:[this.DoctorProfile.FirstName,[Validators.required , Validators.minLength(3)]],
          FirstNameAr:[this.DoctorProfile.FirstNameAr,[Validators.required , Validators.minLength(3)]],
          MiddleName:[this.DoctorProfile.MiddelName,[Validators.minLength(3) , Validators.required]],
          MiddleNameAr:[this.DoctorProfile.MiddelNameAr,[Validators.minLength(3) , Validators.required]],
          LastName:[this.DoctorProfile.LastName,[Validators.minLength(3) , Validators.required]],
          LastNameAr:[this.DoctorProfile.LastNameAr,[Validators.minLength(3) , Validators.required]],
          ImageDoctor: [this.DoctorProfile.Image, [Validators.nullValidator]],
          Gender:[this.DoctorProfile.GenderId,[Validators.required  ,]],
          Country:[this.DoctorProfile.NationalityId,[Validators.required ]],
          LicenseNumber:[this.DoctorProfile.LicenseNumber,[Validators.required ]],
          FacebookAccount:[this.DoctorProfile.FacebookAccount,[Validators.nullValidator ]],
          Website:[this.DoctorProfile.Website,[Validators.nullValidator ]],
          SyndicateId:[this.DoctorProfile.SyndicateId,[Validators.required ]],
          NationalId:[this.DoctorProfile.NationalId,[Validators.required ]],
          DateOfBirth: [this.DoctorProfile.Birthday,[Validators.required ]  ],
          Speciality:[this.DoctorProfile.SpecialistName,[Validators.required]],
          SubSpeciality:[this.selectedItems,[Validators.required]],
          Seniority:[this.DoctorProfile.SeniorityLevelId,[Validators.required]],
          BiographyAr: [this.DoctorProfile.DoctorInfo,  ],
          Biography: [this.DoctorProfile.DoctorInfoAr, ],
          Email:[this.DoctorProfile.Email,[Validators.required ,Validators.email]]
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

    this.specialist =  this.DropDownList_Speciality.find(
      (x) => x.Id == this.DoctorProfile.SpecialistId
    ).Name

  }

  //#region Definition API's

  //#region GetSubSpecialistIdName
  GetSubSpecialistIdName(lang: string, specialListId: number) {
    this.DoctorService.GetSubSpecialistIdName(lang, specialListId).subscribe(
      (response) => {
        this.DropDownList_SubSpeciality = response.Data;
        
        this.selectedItems =this.DropDownList_SubSpeciality.filter(x=>this.DoctorProfile.DoctorSubSpecialist.includes(x.Id));
        response.Data.forEach(element => {
          this.subspecialist +=element.Name+" ";
        });
       
      },
      (err) => {
      }
    );
  }
  //#endregion

  //#region Create Profile
  CreateProfile(lang: string, _DoctorInfoModel: FormData) {
    this.DoctorService.CreateProfile(lang, _DoctorInfoModel).subscribe(
      (response) => {        
        this.router.navigateByUrl("/doctor-profile/certificates");
      },
      (err) => {
      }
    );
  }
  //#endregion

  //#region Update Profile
  UpdateProfile(obj:any) {
    this.DoctorService.UpdateProfile(obj).subscribe(
      (response) => {
        this.toaster.success(this.translation.DocInfo,this.translation.UpdatedSuccessfully);
        this.router.navigate(['main/update-doctor-certificates'])
      },
      (err) => {
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

  GetCountries(lang: string) {
    this.DoctorService.GetCountries(lang).subscribe(
      (response) => {
        this.DropDownList_GetCountries = response.Data;
      },
      (err) => {}
    );
  }


  //#region Doctor Info Submit Method
  DoctorInfoSubmit() {

    this.SpinnerService.show();
  

    this.DoctorInfoModel.FirstName = this.DoctorInfoForm.controls.FirstName.value;
    this.DoctorInfoModel.LicenseNumber = this.DoctorInfoForm.controls.LicenseNumber.value;
    this.DoctorInfoModel.FacebookAccount = this.DoctorInfoForm.controls.FacebookAccount.value;
    this.DoctorInfoModel.Website = this.DoctorInfoForm.controls.Website.value;
    this.DoctorInfoModel.SyndicateId = this.DoctorInfoForm.controls.SyndicateId.value;
    this.DoctorInfoModel.NationalId = this.DoctorInfoForm.controls.NationalId.value;
    this.DoctorInfoModel.FirstNameAr = this.DoctorInfoForm.controls.FirstNameAr.value;
    this.DoctorInfoModel.MiddelName = this.DoctorInfoForm.controls.MiddleName.value;
    this.DoctorInfoModel.MiddelNameAr = this.DoctorInfoForm.controls.MiddleNameAr.value;
    this.DoctorInfoModel.LastName = this.DoctorInfoForm.controls.LastName.value;
    this.DoctorInfoModel.LastNameAr = this.DoctorInfoForm.controls.LastNameAr.value;
    this.DoctorInfoModel.Birthday = this.DoctorInfoForm.controls.DateOfBirth.value;
    this.DoctorInfoModel.DoctorSubSpecialist = Number(this.DoctorInfoForm.controls.SubSpeciality);
    this.DoctorInfoModel.DoctorInfo = this.DoctorInfoForm.controls.Biography.value;
    this.DoctorInfoModel.DoctorInfoAr = this.DoctorInfoForm.controls.BiographyAr.value;
    this.DoctorInfoModel.Email = this.DoctorInfoForm.controls.Email.value;

    document.getElementById('Certificates')?.classList.add('OnClick-Style');

    this.formData.append("Id", this.DoctorProfile.Id as unknown as Blob);
    this.formData.append("FirstName", this.DoctorInfoModel.FirstName);
    this.formData.append("LicenseNumber", this.DoctorInfoModel.LicenseNumber);
    this.formData.append("FacebookAccount", this.DoctorInfoModel.FacebookAccount);
    this.formData.append("Website", this.DoctorInfoModel.Website);
    this.formData.append("SyndicateId", this.DoctorInfoModel.SyndicateId);
    this.formData.append("NationalId", this.DoctorInfoModel.NationalId);
    this.formData.append("FirstNameAr", this.DoctorInfoModel.FirstNameAr);
    this.formData.append("MiddelName", this.DoctorInfoModel.MiddelName);
    this.formData.append("MiddelNameAr", this.DoctorInfoModel.MiddelNameAr);
    this.formData.append("LastName", this.DoctorInfoModel.LastName);
    this.formData.append("LastNameAr", this.DoctorInfoModel.LastNameAr);
    this.formData.append("Email", this.DoctorInfoModel.Email);

    this.formData.append("SeniorityLevelId",this.DoctorProfile.SeniorityLevelId as unknown as Blob );
    this.formData.append("SpecialistId",this.DoctorProfile.SpecialistId as unknown as Blob);
    this.formData.append("NationalityId",this.DoctorProfile.NationalityId as unknown as Blob );
    this.formData.append("GenderId", this.DoctorProfile.GenderId as unknown as Blob);

    this.formData.append("Birthday", this.DoctorInfoModel.Birthday);
    this.selectedItems.forEach(element => {
    this.  formData.append('DoctorSubSpecialist', element.Id as unknown as Blob)
    });
    // formData.append("DoctorSubSpecialist", this.DoctorInfoModel.DoctorSubSpecialist as unknown as Blob);
    this.formData.append("DoctorInfo", this.DoctorInfoModel.DoctorInfo);
    this.formData.append("DoctorInfoAr", this.DoctorInfoModel.DoctorInfoAr);
    this.formData.append("profileImage", this.DoctorProfile.Image);

    this.UpdateProfile(this.formData);

    // let arr=[]
    // this.DoctorInfoForm.get('SubSpeciality').value.map(item=>{
    //  if(item.Id){
    //   arr.push(item.Id)
    //  }
    //  else{
    //    arr.push(item)
    //  }
    // })
    
    // let obj = {
    //   "DoctorInfo":this.DoctorInfoForm.controls.Biography.value,
    //   "DoctorInfoAr":this.DoctorInfoForm.controls.BiographyAr.value,
    //   "Email":this.DoctorInfoForm.controls.Email.value,
    //   "Birthday":this.DoctorInfoForm.controls.DateOfBirth.value,
    //   // "DoctorSubSpecialist": arr
    // } as UpdateProfile;
   
 

    document.getElementById("Certificates")?.classList.add("OnClick-Style");

    // this.UpdateProfile(obj);
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
   this.DoctorProfile.SeniorityLevelId = event.target.value;

  }
  //#endregion


  //#region SelectSpeciality Method event change
  SelectSpeciality(event:any){
    this.DoctorProfile.SpecialistId = event.target.value;
    this.GetSubSpecialistIdName('en', event.target.value);
  }
  //#endregion

  //#region Countries Method event change
  SelectCountries(event: any) {
    this.DoctorProfile.NationalityId = event.target.value;
  }
  //#endregion

  //#region Gender Method event change
  SelectGender(event: any) {
    if (event.target.value != "") {
      this.DoctorProfile.GenderId = event.target.value;
    }
  }
  //#endregion

  //#region review AND File FormData image from input file
  public imagePath: any;
  imgURL: any = "../../../../assets/img/DoctorImg/avatar.png";
  public message: string;

  preview(files: any) {
    if (files.length === 0) return;

    if (files[0].size / 1024 / 1024 >= 5)
    {
      this.SpinnerService.hide();
      Swal.fire(
        'Error!',
        'File size should not be more than 5 MB',
        'error'
      )
      files = null
    this.message = "File size should not be more than 5 MB.";
    return;
  }
    // var mimeType = files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   this.message = "Only images are supported.";
    //   return;
    // }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
    if(files !=null)
    this.DoctorProfile.Image = files[0]    
    // this.FormDataImage.append('EpisodeIamge', files[0]);
  }
  //#endregion

  getDoctorProfile() {
    this.SpinnerService.show();
    this.DoctorService.GetDoctorProfile().subscribe(
      (response) => {
        this.SpinnerService.hide();
        this.DoctorProfile = response.Data;
        
        this.url_img = environment.ImagesURL+this.DoctorProfile.Image;
        this.imgURL = environment.ImagesURL+this.DoctorProfile.Image;
        this.GetSubSpecialistIdName('en',this.DoctorProfile.SpecialistId)
        this.date =  response.Data.Birthday.substring(0, 10)
       this.DoctorProfile.Birthday =  this.datePipe.transform(this.DoctorProfile.Birthday, 'yyyy-MM-dd')

       //this.selectedItems
       let index = 0;
       this.DoctorProfile.DoctorSubSpecialist.forEach(element => {
        this.selectedItems.push({Id:element,Name:this.DoctorProfile.SubSpecialistName[index]})
      index++; 
      }); 
      //  document.getElementById("birthOfDay").value = "2014-02-09"; 
      this.initForm();        
      },
      (err) => {
        this.SpinnerService.hide();
        // console.log(err);
      }
    );
  }

  back(){
    this.router.navigateByUrl("/main");
  }
}
