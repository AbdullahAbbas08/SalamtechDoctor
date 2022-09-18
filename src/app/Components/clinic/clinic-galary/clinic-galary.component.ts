import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { Galary } from 'src/Models/galary';
import { GeneralResponse } from 'src/Models/general-response';
import { GalaryService } from 'src/Service/ClinicGalary/galary.service';
import { ClinicInfoService } from 'src/Service/ClinicInfo/clinic-info.service';
import { TranslateSwalsService } from 'src/Service/translateSwals/translate-swals.service';
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
  translation;
  url:string;


  //#region Constructor
  constructor(private GalaryService: GalaryService,
    private router: Router,
    private route: ActivatedRoute,
    private translateSwal:TranslateSwalsService,
    private SpinnerService: NgxSpinnerService) { }
  //#endregion

  //#region On Init Method
  ngOnInit(): void {
this.url = environment.ImagesURL
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
    this.getTranslitation()
  }
  //#endregion

  getTranslitation()  {
    this.translateSwal.Translitation().subscribe((values) => {
      // console.log(values);
      this.translation =values 
      });
    }
  

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
    debugger
    this.SpinnerService.show();
    this.GalaryService.CreateClinicGallery(lang, formData).subscribe(
      (response) => {
        // console.log(response);
        this.SpinnerService.hide();
        this.GetClinicGalleryByClinicId('en',  this.ClinicId);
      },
      (err) => {
        this.SpinnerService.hide();
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
    debugger
    const formData = new FormData();
    if (files.length === 0)
      return;

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

    Swal.fire({
      title:  this.translation.areusure,
      text: this.translation.wontrevert,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translation.yes
    })
    .then((result) => {

      if (result.isConfirmed) {
        this.GalaryService.DeleteClinicGallery('en', ID).subscribe((res)=>{
          this.GetClinicGalleryByClinicId('en',  this.ClinicId);
          Swal.fire(
            this.translation.Deleted,
            this.translation.fileDeleted,
            'success'
          )
      },
      (err)=>{
        // console.log(err)
        Swal.fire( this.translation.errocur);
      })
       
      } else {
        Swal.fire(
          this.translation.Cancelled,
          this.translation.filesafe,
          'error'
        );
      }
    }); 
  }
  //#endregion

}
