// import {Injectable} from "@angular/core";
//
// @Injectable({
//   providedIn: 'root'
// })
//
//
// export class ImagePreview {
//   urls: any = [];
//
//   onSelectFile(event: any) {
//     if (event.target.files && event.target.files[0]) {
//       const filesAmount = event.target.files.length;
//       if (filesAmount <= 4) {
//         for (let i = 0; i < filesAmount; i++) {
//           const reader = new FileReader();
//           reader.onload = (event: any) => {
//             this.urls.push(event.target.result);
//           }
//           reader.readAsDataURL(event.target.files[i]);
//         }
//       } else {
//         console.log("ERR MAX FILE UPLOAD 4")
//       }
//     }
//   }
// }
