import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { GoogleMapsComponent } from 'src/app/Shared/google-maps/google-maps.component';
import { environment } from 'src/environments/environment';
import { Area } from 'src/Models/Area';
import { City } from 'src/Models/City';
import { ClinicInfoModel } from 'src/Models/clinicInfoModel';
import { Coordinates } from 'src/Models/Coordinates';
import { IdNameList } from 'src/Models/id-name-list';
import { UpdateClinic } from 'src/Models/update-clinic';
import { ClinicInfoService } from 'src/Service/ClinicInfo/clinic-info.service';
import { LookupsService } from 'src/Service/Lockups/lookups.service';

@Component({
  selector: 'app-update-clinic-info',
  templateUrl: './update-clinic-info.component.html',
  styleUrls: ['./update-clinic-info.component.css']
})
export class UpdateClinicInfoComponent implements OnInit {

  //#region Declare Variables
  coordinates: Coordinates;
  address:string
  Cities: City[];
  Areas: Area[];
  ClinicInfoModel: ClinicInfoModel;
  CountryId:any
  Services:IdNameList[]
  dropdownList:any = [];
  selectedItems:IdNameList[] = [];
  selectedItemsIds:number[] = [];
  dropdownSettings:IDropdownSettings = {};
  ClinicToUpdate:UpdateClinic;
  ClinicID:any;
  CitiesList:{[Id:number]:City}={};
  AreaList:{[Id:number]:Area}={};
 formData = new FormData();  
 ListOfMobileNumber:string[]; 

  //#endregion

  //#region constructor
    constructor( private modalService: NgbModal,
                  private lookupService: LookupsService,
                  private ClinicService:ClinicInfoService,
                  private Router:Router,
                  private route: ActivatedRoute) {
        
    this.coordinates = {} as Coordinates;
  }
  //#endregion

  //#region On Init Method
    ngOnInit(): void {

      //#region Init Values

      document.getElementById('Dashboard')?.classList.remove('OnClick-Style');
      document.getElementById('DashboardIcon')?.classList.remove('calender-visited');
      document.getElementById('Clinics')?.classList.remove('OnClick-Style');
      document.getElementById('ClinicsIcon')?.classList.remove('OnClick-Style');
      document.getElementById('Services')?.classList.remove('OnClick-Style');
      document.getElementById('ServiceIcon')?.classList.remove('calender-visited');
      document.getElementById('Profile')?.classList.add('OnClick-Style');
      document.getElementById('ProfileIcon')?.classList.add('calender-visited');


      this.dropdownSettings = {
        singleSelection: false,
        idField: 'Id',
        textField: 'Name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };

      this.ClinicID = this.route.snapshot.paramMap.get('ID');

      this.ClinicToUpdate ={
          Logo                    :"",
          HealthEntityPhoneDtos   :[],
          Name                    :"",
          NameAr                  :"",
          Email                   :"",
          CountryId               :-1,
          CityId                  :-1,
          AreaId                  :-1,
          Address                 :"",
          Latitude                :"",
          Longitude               :"",
          BlockNo                 :-1,
          FloorNo                 :-1,
          FixedFee                :-1,
          Inactive                :false
      };

      this.imgURL = '../../../../assets/img/DoctorImg/Rectangle 2.png';
      this.ListOfMobileNumber = [];
      //#endregion

      //#region Invoke Methods
      this.GetServices();
      this.GetDoctorClinicByClinicId(this.ClinicID);
      this.getCities();
      this.getAreas();
      //#endregion
      
    }
//#endregion

  //#region openGoogelMapsModal
openGoogelMapsModal() {
  const modalRef = this.modalService.open(GoogleMapsComponent, {
    scrollable: true,modalDialogClass:"modal-xl modal-dialog-centered modal-dialog-scrollable"
  });
  let data = {
    prop1: 'Some Data',
    prop2: 'From Parent Component',
    prop3: 'This Can be anything',
  };

  modalRef.componentInstance.fromParent = data;
  modalRef.result.then(
    (result) => {
      this.ClinicToUpdate.Address = result.address;
    },
    (reason) => {}
  );
}
//#endregion

  //#region review AND File FormData image from input file
  public imagePath: any;
  imgURL: any = '../../../../assets/img/DoctorImg/Rectangle 2.png';
  public message: string;

  preview(files: any) {
    if (files.length === 0) return;

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

    this.formData.append('clinicLogo',files[0])
  }
  //#endregion

  //#region git Services
  GetServices() {
    this.lookupService.GetServices('en').subscribe(
      (res) => {
        this.Services = res.Data;
    this.dropdownList = this.Services

      },
      (err) => {
        console.log(err);
      }
    );
  }
  //#endregion

  //#region Selectedcity
  SelectCity(event:any){
    this.ClinicToUpdate.CityId=event.target.value;
  }
  //#endregion

  //#region SelectedArea
  SelectArea(event:any){
    this.ClinicToUpdate.AreaId = event.target.value; 
  }
  //#endregion

  //#region Update Clinic
  UpdateClinic(ClinicForm:FormData){
    this.ClinicService.UpdateDoctorClinic(ClinicForm).subscribe((res)=>{
     this.Router.navigate(['clinic/gallary/',this.ClinicID]);
    },
    (err)=>{
      console.log(err)
    })
  }
  //#endregion

  //#region resset form
  ressetform(form:NgForm){
    form.reset()
  }
  //#endregion

  //#region submit Clinic
  submitClinic(){

    this.formData.append('ClinicId', this.ClinicID as unknown as Blob)
    this.formData.append('HealthEntityPhoneDtos',JSON.stringify(this.ListOfMobileNumber[0]))
    this.formData.append('Name',this.ClinicToUpdate.Name)
    this.formData.append('NameAr',this.ClinicToUpdate.NameAr)
    this.formData.append('Email',this.ClinicToUpdate.Email)
    this.formData.append('CountryId',this.ClinicToUpdate.CountryId as unknown as Blob)
    this.formData.append('CityId',this.ClinicToUpdate.CityId as unknown as Blob)
    this.formData.append('AreaId',this.ClinicToUpdate.AreaId as unknown as Blob)
    this.formData.append('FixedFee',this.ClinicToUpdate.FixedFee as unknown as Blob)
    this.formData.append('Address',this.ClinicToUpdate.Address)
    this.formData.append('BlockNo',this.ClinicToUpdate.BlockNo as unknown as Blob)
    this.formData.append('FloorNo',this.ClinicToUpdate.FloorNo as unknown as Blob)
    this.formData.append('Inactive',this.ClinicToUpdate.Inactive as unknown as Blob )
   
    this.UpdateClinic(this.formData)
  }
  //#endregion

  //#region onItemSelect
  onItemSelect(item: any) {
    // console.log(this.selectedItems)
  }
  //#endregion

  //#region onSelectAll
  onSelectAll(items: any) {
    // console.log(items);
  }
  //#endregion
 
  //#region Consume API's

      //#region Get Doctor Clinic By Clinic Id
       GetDoctorClinicByClinicId(ID:number){
        this.ClinicService.GetDoctorClinicByClinicId(ID).subscribe(
          (response)=>{
            this.ClinicToUpdate = response.Data;
            this.imgURL = environment.ImagesURL+response.Data.Logo;

            response.Data.HealthEntityPhoneDtos.forEach((element: string) => {
              this.ListOfMobileNumber.push(element);
            });

            console.log("HealthEntityPhoneDtos : ",response.Data.HealthEntityPhoneDtos)

          },
          (err)=>{
            console.log(err)
          }
        )
      }
      //#endregion

      //#region get Cities
      getCities(){
        this.lookupService.GetCities('en').subscribe(
          (response)=>{
            this.Cities =  response.Data;
            response.Data.forEach(element => {
              this.CitiesList[element.Id] = element;
            });
          },
          (err)=>{
            
          })
      }
      //#endregion

      //#region get Areas
      getAreas(){
        this.lookupService.GetAreas('en').subscribe(
          (response)=>{
            this.Areas = response.Data;
            response.Data.forEach(element => {
              this.AreaList[element.Id] = element;
            });
          },
          (err)=>{

          }
        )
      }
      //#endregion

  //#endregion

  //#region Next
  Next(){
    this.Router.navigate(['main/updateclinic/UpdateClinicGalary/',this.ClinicID]);
  }
  //#endregion

}
