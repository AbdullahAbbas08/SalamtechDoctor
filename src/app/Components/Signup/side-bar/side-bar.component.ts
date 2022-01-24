import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit  {

  constructor() {
    
   }
 
  ngOnInit(): void {
    document.getElementById('Signup')?.classList.add('OnClick-Style');
  }
  

}
