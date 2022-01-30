import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fielderror',
  templateUrl: './fielderror.component.html',
  styleUrls: ['./fielderror.component.css']
})
export class FielderrorComponent implements OnInit {
@Input() errorMsg : string;
@Input() displayError: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}