import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { catchError, map, throwError } from 'rxjs';
import { PhotoAPI } from './PhotoAPI.model';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private httpClient: HttpClient) {}
  //method to call API and get all images
  getAllFlowers(pageNumber: number) {
    const url: string = `https://api.flickr.com/services/rest/?
method=flickr.photos.search&text=flowers&api_key=${environment.apiKey}
&format=json&nojsoncallback=1&page=${pageNumber}&per_page=20`;

    return this.callAPI(url);
  }
  //method to call API and get images of specific color
  getFlowersByColor(colorId: number, pageNumber: number) {
    const url: string = `https://api.flickr.com/services/rest/?
method=flickr.photos.search&text=flowers&api_key=${environment.apiKey}
&format=json&nojsoncallback=1&page=${pageNumber}&per_page=20&color_codes=${colorId}`;

    return this.callAPI(url);
  }
  //helper method to call the API with url
  private callAPI(url: string) {
    return this.httpClient.get<PhotoAPI>(url).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => err);
      }),
      map((result) =>
        result.photos.photo.map((photo: any) => {
          return (
            'https://farm' +
            photo.farm +
            '.staticflickr.com/' +
            photo.server +
            '/' +
            photo.id +
            '_' +
            photo.secret +
            '.jpg'
          );
        })
      )
    );
  }
}
