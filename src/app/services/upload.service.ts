import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  uploadFile(files: any) {
    const selectedFiles = []
    if (files.length === 0) {
      return;
    }
    for (let i = 0; i < files.length; i++) {
      selectedFiles.push(files[i]);
    }
    return selectedFiles
  }

}
