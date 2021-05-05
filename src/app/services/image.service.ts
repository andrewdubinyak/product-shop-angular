import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class ImageService {

  constructor(
    private http: HttpClient,
  ) {
  }

  uploadImage(image: any) {
    return this.http
      .post(environment.apiBaseUrl + '/image/single-upload-image', image)
      .pipe(map(res => {
        return res
      }))
  }

  multiUploadImage(image: any) {
    return this.http
      .post(environment.apiBaseUrl + '/image/multi-upload-image', image)
      .pipe(map(res => {
        return res
      }))
  }

  getAllImage() {
    return this.http
      .get(environment.apiBaseUrl + '/image/all-image')
      .pipe(map(res => {
        const images = []
        // @ts-ignore
        for (let date of res.images) {
          const imageUrl = environment.s3Bucket + date.Key
          images.push({image_url: imageUrl, name: date.Key})
        }
        return images
      }))
  }
}

