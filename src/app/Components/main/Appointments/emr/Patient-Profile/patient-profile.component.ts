import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GoogleMapsComponent } from 'src/app/Shared/google-maps/google-maps.component';
import { AppointmentService } from 'src/Service/Appointment/appointment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmrService } from 'src/Service/emr/emr.service';
import Swal from 'sweetalert2';
import { TranslateSwalsService } from 'src/Service/translateSwals/translate-swals.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  appointmentID;
  //#region Declare Variables
  id;
  PatientProfileForm : FormGroup ;
  patientProfile
  translation;

  //#endregion

  constructor(private route:ActivatedRoute , 
              private AppointmentService:AppointmentService,
              private fb:FormBuilder ,
              private modalService: NgbModal,
              private emrService :EmrService,
              private translateSwal:TranslateSwalsService,
              private SpinnerService: NgxSpinnerService) { 
                this.route.paramMap.subscribe(param=>{
                  this.route.queryParamMap.subscribe(qparam=>{
                    this.appointmentID=qparam.get('appointment_id');
                    this.emrService.appointmentId.next(this.appointmentID) 
                    this.getPatientProfile(this.appointmentID) 
                  })
                  this.id=param.get('ID')
                  this.emrService.patientId.next(this.id) 
                 })
                 
                 
              }

  ngOnInit(): void {

     //#region Init Values
     document.getElementById('EMRProfile')?.classList.remove('visited-appointemt-component');
     document.getElementById('PatientProfile')?.classList.add('visited-appointemt-component');
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
  

  initForm(){
    this.PatientProfileForm = this.fb.group(
      {
        PatientName:[this.patientProfile.PatientName ,[Validators.required ]],
        PatientAge:[this.patientProfile?.PatientAge,[Validators.required ]],
        ImagePatient:['',[Validators.required ]],
        PhoneNumber:[this.patientProfile?.PatientPhone,[Validators.required ]],
        location:[this.patientProfile?.PatientAddress,[Validators.required ]],
        PatientComplain:[this.patientProfile?.PatientComplain,[Validators.required ]],
        });
  }

      //#region review AND File FormData image from input file
      public imagePath: any;
      imgURL: any = "../../../../assets/img/DoctorImg/avatar.png";
      public message: string;
  
      preview(files:any) {
        this.SpinnerService.show();
        if (files[0].size > 3000000)
        {
          this.SpinnerService.hide();
          Swal.fire(
            this.translation.Error,
            this.translation.imagesize,
            'error'
          )
        this.message = "image size is larger than 3mb.";
        return;
      }

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
          this.SpinnerService.hide();
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


      getPatientProfile(id){
        this.SpinnerService.show();
        this.emrService.getPatientProfile(id).subscribe(res=>{
          this.patientProfile=res.Data[0]
          // console.log(this.patientProfile.PatientName);
          this.initForm();
          this.SpinnerService.hide();
        })
      }
}
