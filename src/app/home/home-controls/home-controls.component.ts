import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http/src/headers';


@Component({
  selector: 'app-home-controls',
  templateUrl: './home-controls.component.html',
  styleUrls: ['./home-controls.component.scss']
})
export class HomeControlsComponent implements OnInit {
  @Output() banner: EventEmitter<any> = new EventEmitter();
  @Output() upload: EventEmitter<any> = new EventEmitter();
  constructor( private http: HttpClient) {}

  ngOnInit() {}

  setBanner(id: number) {
    console.log('Changing banner to #', id);
    this.banner.emit(id);
  }

  fileUploaded(event) {
    const reader = new FileReader;
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (data) => {
      this.upload.emit(data.target['result']);
    };
    // const fileList: FileList = event.target.files;
    // if (fileList.length > 0) {
    //   const file: File = fileList[0];
    //   const formData: FormData = new FormData();
    //   formData.append('uploadFile', file, file.name);
    //   this.http
    //     .post(`http://localhost:80/banner`, formData)
    //     .subscribe(data => console.log('success'), error => console.log(error));
    // }
  }
}
