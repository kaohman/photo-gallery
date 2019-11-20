import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];

  constructor(
    private camera: Camera,
    private storage: Storage,
  ) {}

  loadSaved() {
    this.storage.get('photos').then(photos => this.photos = photos || []);
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(imageData => {
      this.photos.unshift({
        data: 'data:image/jpeg;base64,' + imageData
      });
      this.storage.set('photos', this.photos);
    }, err => {
        console.log('Camera issue: ' + err);
    });
  }
}

class Photo {
  data: any;
}
