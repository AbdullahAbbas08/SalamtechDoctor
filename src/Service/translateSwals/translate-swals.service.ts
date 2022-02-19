import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateSwalsService {



  constructor(private translate :TranslateService) {
    this.getTranslitation()
   }

  getTranslitation() {
    this.translate.stream('Swals').subscribe((values) => {

      let swal = {
        Error: '',
        imagesize: '',
        UpdatedSuccessfully: '',
        endtime: '',
        areusure: '',
        cancelapp: '',
        Cancelled: '',
      };
       swal.Error = values['Error!'];
      swal.imagesize = values['imagesize'];
       swal.UpdatedSuccessfully = values['UpdatedSuccessfully'];
      swal.endtime = values['endtime'];
       swal.areusure = values['areusure'];
      swal.cancelapp = values['cancelapp']
       swal.Cancelled = values['Cancelled']
         console.log(swal.Cancelled);
         
    });
  }
}
