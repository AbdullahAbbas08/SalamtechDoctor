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
import { translateSwals } from 'src/Models/translateSwals';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationService } from 'src/Service/location/location.service';
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
  lat;
  long
  countries
  selectedCities:any[];

  clicked:boolean;


  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private lookupService: LookupsService,
    private ClinicService: ClinicInfoService,
    private Router: Router,
    private translateSwal:TranslateSwalsService,
    private SpinnerService: NgxSpinnerService,
    private locationService:LocationService) {
    this.coordinates = {} as Coordinates; 
      
  }



  ngOnInit(): void {

    this.selectedCities = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.ListOfMobileNumber = [];
    this.address = "";
    this.ClinicInfoModel = new ClinicInfoModel();
    this.initFrom()
    this.GetCities(); 
    this.getTranslitation()
    this.GetServices()
    this.getCountry()

  }
  SelectCountryChange(event:any){
     console.log(+event.target.value);
      event.target.value;
    this.selectedCities = this.Cities.filter(x=>x.CountryId == +event.target.value)

  }

  getCountry(){
    this.lookupService.GetCountries('en').subscribe(
      (response)=>{
        this.countries =  response.Data;
        // console.log(this.countries);
    })
  }

  getTranslitation()  {
  this.translateSwal.Translitation().subscribe((values) => {
    // console.log(values);
    this.translation =values 
    });
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
          CountryId: ['', [Validators.required]],
          Address: ['', [Validators.required]],
          // Street: ['', [Validators.required]],
          Area: ['', [Validators.required]],
          BuildingNumber: ['',Validators.nullValidator  ],
          ApartmentNo: ['',Validators.nullValidator  ],
          FloorNumber: ['',Validators.nullValidator ],
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
        // console.log(result);
        
        this.address = result.address;
        this.lat = result.latitude;
        this.long= result.longitude
        
        this.locationService.lat.next(this.lat)
        this.locationService.long.next(this.long)
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
    //   this.message = 'Only images are supported.';
    //   return;
    // }

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
      // console.log(id);
      
      this.lookupService.GetAreaByCityId(id).subscribe(
        (res) => {
          // console.log(res);
          
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
    debugger
    this.SpinnerService.show();
    this.ClinicService.CreateClinic(lang, ClinicForm).subscribe((res) => {
     this.ClinicService.VisitFees = +ClinicForm.get('FixedFee');
      this.SpinnerService.hide();
      this.Router.navigate(['/clinic/gallary/', res.Data.ClinicId]);
      //this.ClinicInfoForm.reset()
    },
      (err) => {
        // console.log(err)
        this.SpinnerService.hide();
        Swal.fire(
          this.translation.Error,
          err.error.Message,
          'error'
        )
      })
  }
  //#endregion

  ressetform(form: NgForm) {
    form.reset()
  }

  //#region submit Clinic
  submitClinic() {
    debugger
    this.SpinnerService.show();
   if(this.ClinicInfoForm.valid){
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
    formData.append('BlockNo', this.ClinicInfoForm.controls.BuildingNumber.value)
    formData.append('ApartmentNo', this.ClinicInfoForm.controls.ApartmentNo.value)
    formData.append('FloorNo', +this.ClinicInfoForm.controls.FloorNumber.value as unknown as Blob )
    formData.append('Inactive', "true")
    formData.append('clinicLogo', this.ClinicInfoModel.clinicLogo)
    formData.append('Latitude', this.lat)
    formData.append('Longitude', this.long) 
    this.CreateClinic('en', formData)
    this.SpinnerService.hide();

   }
   else{
     this.SpinnerService.hide();
     this.ClinicInfoForm.markAllAsTouched()
   }


  }

  onItemSelect(item: any) {
    // console.log(this.selectedItems)
  }

  onSelectAll(items: any) {
    // console.log(items);
  }
  actionMethod(){
    this.clicked = false;
  }

}
