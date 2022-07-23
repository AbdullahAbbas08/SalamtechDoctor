import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router:Router ) { }

  ngOnInit(): void {
  }

 

  opentermsinnewtab(){
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/terms`])
    );
    window.open(url, '_blank');
  }
}
