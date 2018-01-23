import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { videojs } from '../../../node_modules/video.js/dist/video.es.js';
import * as video from 'video.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('video', {read: ElementRef}) videoref: ElementRef;
  coordinates: any;

  constructor( private http: HttpClient) {
  }

  ngOnInit() {
    this.getJson().subscribe( data => this.coordinates = data);
  }

  ngAfterViewInit() {
    video(this.videoref.nativeElement, {}, function() {

    });
  }

  getJson() {
    return this.http.get('/../assets/video/cartesian.json');
  }
}
