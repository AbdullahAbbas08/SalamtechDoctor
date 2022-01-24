import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.component.html',
  styleUrls: ['./congratulations.component.css']
})
export class CongratulationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.getElementById('Doctorinfo')?.classList.add('OnClick-Style');
    document.getElementById('Signup')?.classList.add('OnClick-Style');
    document.getElementById('Certificates')?.classList.add('OnClick-Style');
    document.getElementById('LegalDocuments')?.classList.add('OnClick-Style');
    document.getElementById('Congratulations')?.classList.add('OnClick-Style');

  }

  changeStyle()
  {
   
  }

}
