import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  NgZone
} from "@angular/core";
import * as videojs from "video.js";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild("video", { read: ElementRef })
  videoref: ElementRef;
  @ViewChild("video2") canvas: ElementRef;
  public context: CanvasRenderingContext2D;
  coordinates: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getJson().subscribe(data => {
      this.coordinates = data;
      videojs(this.videoref.nativeElement, {}, function() {});
    });
  }

  ngAfterViewInit() {
    this.context = (<HTMLCanvasElement>this.canvas.nativeElement).getContext(
      "2d"
    );
    this.context.fillStyle = "#000000";
    this.context.beginPath();
    this.context.drawImage(this.videoref.nativeElement, 0, 0, 500, 281);
    this.videoref.nativeElement.addEventListener("play", () => {
      this.draw();
    });
  }

  getJson() {
    return this.http.get("/../assets/video/cartesian.json");
  }
  draw() {
    this.context.clearRect(0, 0, 500, 281);
    this.context.drawImage(this.videoref.nativeElement, 0, 0, 500, 281);
    const currentFrame = Math.abs(this.videoref.nativeElement.currentTime * 24);
    for (const key in this.coordinates) {
      if (currentFrame < parseInt(key, 10)) {
        this.drawBanners(this.coordinates[key]);
        break;
      }
    }
    setTimeout(() => this.draw(), 1000 / 24);
  }
  drawBanners(data) {
    this.context.moveTo(0, 0);
    this.context.beginPath();
    for (let i = 0; i < data.length; i++) {
      const x = Math.round(data[i]["x"] / 2);
      const y = Math.round(data[i]["y"] / 2);
      const w = Math.round(data[i]["w"] / 2);
      const h = Math.round(data[i]["h"] / 2);
      this.context.rect(x, y, w, h);
    }
    this.context.fill();
  }
}
