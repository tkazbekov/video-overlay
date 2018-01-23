import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import * as videojs from 'video.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('video', {read: ElementRef}) videoref: ElementRef;
  @ViewChild('video2') canvas: ElementRef;
  public context: CanvasRenderingContext2D;
  coordinates: any;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getJson().subscribe( data => {
      this.coordinates = data;
      videojs(this.videoref.nativeElement, {}, function() {});
    });
  }

  ngAfterViewInit() {
    this.context = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
    this.context.fillStyle = '#000000';
    this.videoref.nativeElement.addEventListener('timeupdate', () => {
    this.context.clearRect(0, 0, 1000, 562);
      this.context.drawImage(this.videoref.nativeElement, 0, 0, 1000, 562);
      const currentFrame = Math.abs(this.videoref.nativeElement.currentTime * 24);
      for (const key in this.coordinates) {
        if (currentFrame < parseInt(key, 10)) {
          this.drawBanners(this.coordinates[key]);
          break;
        }
      }
    });
  }

  getJson() {
    return this.http.get('/../assets/video/cartesian.json');
  }

  drawBanners(data) {
    this.context.moveTo(0, 0);
    this.context.beginPath();
    for (let i = 0; i < data.length; i++) {
      const x = data[i]['x'];
      const y = data[i]['y'];
      const w = data[i]['w'];
      const h = data[i]['h'];
      this.context.rect(x, y, w, h);
    }
    this.context.fill();
  }
  step() {
    console.log('Step!');
  }

}
