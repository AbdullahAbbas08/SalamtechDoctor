import { TranslateSwalsService } from './../../../../Service/translateSwals/translate-swals.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsComponent } from 'src/app/Shared/google-maps/google-maps.component';
import { Area } from 'src/Models/Area';
import { City } from 'src/Models/City';
import { Coordinates } from 'src/Models/Coordinates';
import { ClinicInfoService } from 'src/Service/ClinicInfo/clinic-info.service';
import { LookupsService } from 'src/Service/Lockups/lookups.service';
import { ClinicInfoModel } from './../../../../Models/clinicInfoModel';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { IdNameList } from 'src/Models/id-name-list';
import { Router } from '@angular/router';
import { ClinicId } from 'src/Models/clinic-id';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-clinic-info',
  templateUrl: './clinic-info.component.html',
  styleUrls: ['./clinic-info.component.css'],
})
export class ClinicInfoComponent implements OnInit {
  coordinates: Coordinates;
  address: string
  Cities: City[];
  Areas: Area[];
  ClinicInfoForm: FormGroup;
  ClinicInfoModel: ClinicInfoModel;
  CountryId: any
  Services: IdNameList[]
  dropdownList: any = [];
  selectedItems: IdNameList[] = [];
  selectedItemsIds: number[] = [];
  dropdownSettings: IDropdownSettings = {};
  ListOfMobileNumber: any[];
  translation;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private lookupService: LookupsService,
    private ClinicService: ClinicInfoService,
    private Router: Router,
    private translateSwal:TranslateSwalsService) {
    this.coordinates = {} as Coordinates;
    this.translation=this.translateSwal.getTranslitation()
      console.log(this.translation);
      console.log(this.translateSwal.getTranslitation());
      
      
  }



  ngOnInit(): void {

    this.initFrom()
    this.ListOfMobileNumber = [];
    this.address = "";

    //#region multiple select
    this.GetServices()

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    //#endregion

    this.GetCities();

    // this.GetAreas();

    this.ClinicInfoModel = new ClinicInfoModel();



  }

  initFrom(){
        //#region  Register Form Section
        this.ClinicInfoForm = this.fb.group({
          Name: ['', [Validators.required, Validators.minLength(3)]],
          NameAr: ['', [Validators.required, Validators.minLength(3)]],
          clinicLogo: ['', [Validators.required]],
          Email: ['', [ Validators.required , Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)]],
          PhoneNumber: [
            '',
            [
              Validators.required  , Validators.maxLength(11)
            ],
          ],
          PhoneNumber2: [
            '',
            [    Validators.maxLength(11)],
          ],
          PhoneNumber3: [
            '',
            [   Validators.maxLength(11)],
          ],
          City: ['', [Validators.required]],
          Address: ['', [Validators.required]],
          // Street: ['', [Validators.required]],
          Area: ['', [Validators.required]],
          BuildingNumber: ['',  ],
          FloorNumber: ['', ],
          // ApartmentNumber: ['', [Validators.required]],
          FixedFee: ['', [Validators.required , Validators.pattern(/^\d*$/)]],
          Services: ['' ],
        });
    
    
        //#endregion
    
  }

  isFieldValid(field): boolean {
    return (
      !this.ClinicInfoForm.get(field)?.valid && this.ClinicInfoForm.get(field)?.touched
    )
  }


  openGoogelMapsModal() {
    const modalRef = this.modalService.open(GoogleMapsComponent, {
      scrollable: true, modalDialogClass: "modal-xl modal-dialog-centered modal-dialog-scrollable"
    });
    let data = {
      prop1: 'Some Data',
      prop2: 'From Parent Component',
      prop3: 'This Can be anything',
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        this.address = result.address;
      },
      (reason) => { }
    );
  }


  //#region review AND File FormData image from input file
  public imagePath: any;
  imgURL: any = '../../../../assets/img/DoctorImg/avatar.png';
  public message: string;

  preview(files: any) {
    if (files.length === 0) return;

    if (files[0].size > 3000000)
    {
    this.message = "image size is larger than 3mb.";
    Swal.fire(
      'Error!',
      'image size is larger than 3mb',
      'error'
    )
    return;
    }

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
    this.ClinicInfoModel.clinicLogo = files[0];
    // this.FormDataImage.append('EpisodeIamge', files[0]);
  }
  //#endregion

  //#region get Cities
  GetCities() {
    this.lookupService.GetCities('en').subscribe(
      (res) => {
        this.Cities = res.Data;
      },
      (err) => {
      }
    );
  }
  //#endregion

  //#region Get Areas
  // GetAreas() {
  //   this.lookupService.GetAreas('en').subscribe(
  //     (res) => {
  //       this.Areas = res.Data;
  //     },
  //     (err) => {
  //     }
  //   );
  // }
  //#endregion

    //#region Get Areas
    GetAreaByCityId(id) {
      console.log(id);
      
      this.lookupService.GetAreaByCityId(id).subscribe(
        (res) => {
          console.log(res);
          
          this.Areas = res.Data;
        },
        (err) => {
        }
      );
    }
    //#endregion

  //#region get Services
  GetServices() {
    this.lookupService.GetServices('en').subscribe(
      (res) => {
        this.Services = res.Data;
        this.dropdownList = this.Services
      },
      (err) => {
      }
    );
  }
  //#endregion

  //#region Selectedcity
  SelectCity(event: any) {
    this.ClinicInfoForm.controls.City = event.target.value;
    let city = this.Cities.find(city => city.Id == event.target.value)
    this.CountryId = city?.CountryId
  }
  //#endregion

  //#region SelectedArea
  SelectArea(event: any) {
    this.ClinicInfoForm.controls.Area = event.target.value;
  }
  //#endregion

  //#region Create Clinic
  CreateClinic(lang: string, ClinicForm: FormData) {
    this.ClinicService.CreateClinic(lang, ClinicForm).subscribe((res) => {
      // console.log("ClinicId : ",this.ClinicId.ClinicId)
      // this.ClinicService.ClinicID = res.Data.ClinicId;
      //  this.Router.navigateByUrl("clinic/gallary")/ClinicId
      // localStorage.setItem('Authorization',this.AuthenticatedUser.Data.Token)
      // console.log(" res.Data.ClinicId : ", res.Data.ClinicId)
      this.Router.navigate(['/clinic/gallary/', res.Data.ClinicId]);
      this.ClinicInfoForm.reset()
    },
      (err) => {
        console.log(err)
      })
  }
  //#endregion

  ressetform(form: NgForm) {
    form.reset()
  }

  //#region submit Clinic
  submitClinic() {
    
   if(this.ClinicInfoForm?.valid){
    const formData = new FormData();
    this.selectedItems.forEach(element => {
      formData.append('HealthEntityServiceDtos', element.Id as unknown as Blob)
    });
    
    this.ListOfMobileNumber.push(this.ClinicInfoForm.controls.PhoneNumber.value);
    
    if(this.ClinicInfoForm.controls.PhoneNumber2.value !='undefined' && this.ClinicInfoForm.controls.PhoneNumber2.value !='null' && this.ClinicInfoForm.controls.PhoneNumber2.value !=''){
      this.ListOfMobileNumber.push(this.ClinicInfoForm.controls.PhoneNumber2.value);
    }
    
    if(this.ClinicInfoForm.controls.PhoneNumber3.value !='undefined' &&this.ClinicInfoForm.controls.PhoneNumber3.value !='null'&&this.ClinicInfoForm.controls.PhoneNumber3.value !=''){
      this.ListOfMobileNumber.push(this.ClinicInfoForm.controls.PhoneNumber3.value);
    }
    

    // formData.append('HealthEntityPhoneDtos',[+this.ClinicInfoForm.controls.PhoneNumber.value,+this.ClinicInfoForm.controls.PhoneNumber2.value,+this.ClinicInfoForm.controls.PhoneNumber3.value] as unknown as Blob)
    for (const index in this.ListOfMobileNumber) 
        {
            // instead of passing this.arrayValues.toString() iterate for each item and append it to form.
            formData.append(`HealthEntityPhoneDtos[${index}]`,this.ListOfMobileNumber[index].toString());
        }

    // formData.append('HealthEntityPhoneDtos', JSON.stringify(this.ListOfMobileNumber))
    formData.append('Name', this.ClinicInfoForm.controls.Name.value)
    formData.append('NameAr', this.ClinicInfoForm.controls.NameAr.value)
    formData.append('Email', this.ClinicInfoForm.controls.Email.value)
    formData.append('CountryId', this.CountryId as unknown as Blob)
    formData.append('CityId', this.ClinicInfoForm.controls.City as unknown as Blob)
    formData.append('AreaId', this.ClinicInfoForm.controls.Area as unknown as Blob)
    formData.append('FixedFee', +this.ClinicInfoForm.controls.FixedFee.value as unknown as Blob)
    formData.append('Address', this.ClinicInfoForm.controls.Address.value)
    formData.append('BlockNo', +this.ClinicInfoForm.controls.BuildingNumber.value as unknown as Blob)
    formData.append('FloorNo', +this.ClinicInfoForm.controls.FloorNumber.value as unknown as Blob)
    formData.append('Inactive', "true")
    formData.append('clinicLogo', this.ClinicInfoModel.clinicLogo)

    this.CreateClinic('en', formData)
   }
   else{
     this.ClinicInfoForm.markAllAsTouched()
   }


  }

  onItemSelect(item: any) {
    // console.log(this.selectedItems)
  }

  onSelectAll(items: any) {
    // console.log(items);
  }

}
