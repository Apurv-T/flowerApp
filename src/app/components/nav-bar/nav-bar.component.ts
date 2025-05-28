import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  imports: [FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  colorId: number = 0;
  @Output()
  colorIdChanged: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}
  ngOnInit(): void {
    //checking if there is a button from last session
    if (localStorage.length > 0 && localStorage.getItem('buttonColor')) {
      this.colorId = Number(localStorage.getItem('changeColor'));
    }
  }

  //method to change color of button when button is pressed
  changeColor(colorId: number) {
    localStorage.setItem('buttonColor', colorId.toString());
    this.colorId = colorId;
    this.colorIdChanged.emit(colorId);
  }
}
