import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Galary } from 'src/Models/galary';
import { GeneralResponse } from 'src/Models/general-response';
import { GalaryService } from 'src/Service/ClinicGalary/galary.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-clinic-galary',
  templateUrl: './update-clinic-galary.component.html',
  styleUrls: ['./update-clinic-galary.component.css']
})
export class UpdateClinicGalaryComponent implements OnInit {

  //#region Decalre Variables
  GalaryList: Galary[];
  Response: GeneralResponse<Galary>;
  ClinicId:any;
  //#endregion

  //#region Constructor
  constructor(private GalaryService: GalaryService,
    private router: Router,
    private route: ActivatedRoute) { }
  //#endregion

  //#region On Init Method
  ngOnInit(): void {

    //#region Init Values

     //#region Change Active Component In Sidebar 
    //  document.getElementById('Dashboard')?.classList.remove('OnClick-Style');
    //   document.getElementById('DashboardIcon')?.classList.remove('calender-visited');
    //   document.getElementById('Clinics')?.classList.remove('OnClick-Style');
    //   document.getElementById('ClinicsIcon')?.classList.remove('OnClick-Style');
    //   document.getElementById('Services')?.classList.remove('OnClick-Style');
    //   document.getElementById('ServiceIcon')?.classList.remove('calender-visited');
    //   document.getElementById('Profile')?.classList.add('OnClick-Style');
    //   document.getElementById('ProfileIcon')?.classList.add('calender-visited');

     //#endregion

     this.ClinicId = this.route.snapshot.paramMap.get('ClinicId');
    this.GalaryList = [];
    //#endregion

    //#region Call Methods
    this.Response = this.route.snapshot.data['Galary']
    this.GalaryList = this.Response.Data;
    //#endregion

  }
  //#endregion

  //#region  Consume API's

  //#region Get Clinic Gallery By Clinic Id
  GetClinicGalleryByClinicId(lang: string, ID: number) {
    this.GalaryService.GetClinicGalleryByClinicId(lang, ID).subscribe(
      (response) => {
        this.GalaryList = response.Data;
      },
      (err) => {
        // console.log(err);
      }
    )
  }
  //#endregion

  //#region CreateClinicGallery
  CreateClinicGallery(lang: string, formData: FormData) {
    this.GalaryService.CreateClinicGallery(lang, formData).subscribe(
      (response) => {
        // console.log(response);
        this.GetClinicGalleryByClinicId('en',  this.ClinicId);
      },
      (err) => {
        // console.log(err);
      }
    )
  }
  //#endregion

  //#endregion

  //#region  Upload Image
  public imagePath: any;
  imgFront: any = null;
  imgBack: any = null;
  SyndicateFront: any = null;
  SyndicateBack: any = null;
  ImgCertificate: any = null;
  public message: string;

  preview(files: any) {
    const formData = new FormData();
    if (files.length === 0)
      return;

      if (files[0].size > 3000000)
      {
        Swal.fire(
          'Error!',
          'image size is larger than 3mb',
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
      this.ImgCertificate = reader.result;
    }

    formData.append('ClinicId', this.ClinicId  as unknown as Blob);
    formData.append('clinicGallery', files[0]);
 
    this.CreateClinicGallery('en', formData);

  }
  //#endregion

  //#region Next to Update Clinic Schedule Component
  Next() {
    this.router.navigate(['main/updateclinic/UpdateClinicSchedule/',this.ClinicId]);
  }
  //#endregion

  //#region Next to Update Clinic Schedule Component
  Back() {
    this.router.navigate(['main/updateclinic/updateclinic/',this.ClinicId]);
  }
  //#endregion

  //#region Delete Galary
  DeleteGalary(ID: number) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {

      if (result.isConfirmed) {
        this.GalaryService.DeleteClinicGallery('en', ID).subscribe((res)=>{
          this.GetClinicGalleryByClinicId('en',  this.ClinicId);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
      },
      (err)=>{
        // console.log(err)
        Swal.fire("An error occur");
      })
       
      } else {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe',
          'error'
        );
      }
    }); 
  }
  //#endregion

}
