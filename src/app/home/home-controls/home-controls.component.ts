import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ElementRef,
  ViewChild
} from '@angular/core';
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
  @ViewChild('input') input: ElementRef;
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  setBanner(id: number) {
    this.banner.emit(id);
  }

  fileUploaded(event) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = data => {
      this.upload.emit(data.target['result']);
    };
  }

  urlAdded() {
    this.upload.emit(this.input.nativeElement.value);
  }
}
