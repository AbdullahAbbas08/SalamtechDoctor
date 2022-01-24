import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  public message:string;
  public progress:number;

  // @Output() public onUploadfinish = new EventEmitter();
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }


  public UploudFile=(files:any)=>{
    if(files.length === 0){
      return;
    }

    let fileToUpload =<File>files[0];
    const formData=new FormData();

    formData.append('file',fileToUpload,fileToUpload.name);

    // this.http.post()
  }
}
