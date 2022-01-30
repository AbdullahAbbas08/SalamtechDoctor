import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GoogleMapsComponent } from 'src/app/Shared/google-maps/google-maps.component';
import { AppointmentService } from 'src/Service/Appointment/appointment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  //#region Declare Variables
  id;
  PatientProfileForm : FormGroup ;

  //#endregion

  constructor(private route:ActivatedRoute , 
              private AppointmentService:AppointmentService,
              private fb:FormBuilder ,
              private modalService: NgbModal) { 
                this.route.paramMap.subscribe(param=>{
                  this.id=param.get('emrID')
                  // console.log(this.id);
                  
                 })
                 
              }

  ngOnInit(): void {

     //#region Init Values
     document.getElementById('EMRProfile')?.classList.remove('visited-appointemt-component');
     document.getElementById('PatientProfile')?.classList.add('visited-appointemt-component');
     //#endregion
     this.initForm();
    
  } 

  initForm(){
    this.PatientProfileForm = this.fb.group(
      {
        PatientName:['',[Validators.required ]],
        PatientAge:['',[Validators.required ]],
        ImagePatient:['',[Validators.required ]],
        PhoneNumber:['',[Validators.required ]],
        location:['',[Validators.required ]],
        PatientComplain:['',[Validators.required ]],
        });
  }

      //#region review AND File FormData image from input file
      public imagePath: any;
      imgURL: any = "../../../../assets/img/DoctorImg/avatar.png";
      public message: string;
  
      preview(files:any) {
        if (files.length === 0)
          return;
  
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
        }
        // this.DoctorInfoModel.profileImage = files[0];
        // this.FormDataImage.append('EpisodeIamge', files[0]);
      }
      //#endregion

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
            // this.address = result.address;
            this.PatientProfileForm.get('location').setValue(result.address)
          },
          (reason) => { }
        );
      }
}
