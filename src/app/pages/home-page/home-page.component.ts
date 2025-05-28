import { Component, OnDestroy, OnInit } from '@angular/core';
import { ImageService } from '../../services/image-service.service';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, NavBarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit, OnDestroy {
  imagesLinks: String[] = [];
  pageNumber: number = 1;
  colorId: number = 1;
  subscriptions:Subscription[]=[];
  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    //checking if there is a button from last session
    if (localStorage.length > 0 && localStorage.getItem('changeColor')) {
      this.colorId = Number(localStorage.getItem('changeColor'));
    }
    //calling the images service
    this.getImages();
  }
  //changing page
  nextPage() {
    this.pageNumber++;
    this.getImages();
  }
  //changing color
  changeColor(colorId: number) {
    this.colorId = colorId;
    this.pageNumber=1;
    //calling the images service
    this.getImages();
  }
  //getImages method calls the service to get the images
  getImages() {
    this.imagesLinks=[];
    //all images
    if (this.colorId == 1) {
    this.subscriptions.push( this.imageService
        .getAllFlowers(this.pageNumber)
        .pipe()
        .subscribe((images) => {
          this.imagesLinks = images;
        }));
    } else {
      //images by color
          this.subscriptions.push(this.imageService
        .getFlowersByColor(this.colorId,this.pageNumber)
        .pipe()
        .subscribe((images) => {
          this.imagesLinks = images;
        }));
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub)=>sub.unsubscribe());
  }
}
