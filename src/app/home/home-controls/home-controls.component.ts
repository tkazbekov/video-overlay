import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home-controls',
  templateUrl: './home-controls.component.html',
  styleUrls: ['./home-controls.component.scss']
})
export class HomeControlsComponent implements OnInit {
  @Output() banner: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() { }

  setBanner(id: number) {
    console.log('Changing banner to #', id);
    this.banner.emit(id);
  }

}
