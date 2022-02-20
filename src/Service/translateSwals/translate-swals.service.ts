import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneralResponse } from 'src/Models/general-response';
import { translateSwals } from 'src/Models/translateSwals';

@Injectable({
  providedIn: 'root'
})
export class TranslateSwalsService {
 

  constructor(private translate :TranslateService) {
    }

  Translitation():Observable<GeneralResponse<translateSwals>> {
   return this.translate.get('Swals')
  }

}
