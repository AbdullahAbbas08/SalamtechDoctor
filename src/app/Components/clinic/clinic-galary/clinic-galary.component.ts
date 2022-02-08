import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Galary } from 'src/Models/galary';
import { GeneralResponse } from 'src/Models/general-response';
import { GalaryService } from 'src/Service/ClinicGalary/galary.service';
import { ClinicInfoService } from 'src/Service/ClinicInfo/clinic-info.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clinic-galary',
  templateUrl: './clinic-galary.component.html',
  styleUrls: ['./clinic-galary.component.css']
})
export class ClinicGalaryComponent implements OnInit {

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
     document.getElementById('sidebarinfo')?.classList.add('OnClick-Style');
     document.getElementById('sidebargalary')?.classList.add('OnClick-Style');
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
        console.log(err);
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
        console.log(err);
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

  //#region Next to

  Next() {
    // this.router.navigateByUrl("clinic/Schedule")
    // console.log(" this.ClinicId : ", this.ClinicId);
    this.router.navigate(['clinic/schedule/',this.ClinicId]);

  }
  //#endregion

  //#region Delete Galary
  DeleteGalary(ID: number) {
    this.GalaryService.DeleteClinicGallery('en', ID).subscribe(
      (response) => {
        // console.log(response);
        this.GetClinicGalleryByClinicId('en',  this.ClinicId);
      },
      (err) => {
        // console.log(err);
      })
  }
  //#endregion

}
