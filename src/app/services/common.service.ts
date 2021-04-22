import {Injectable, TemplateRef} from '@angular/core';
import {ToastService} from './toast.service';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  toasts: any[] = [];

  constructor(public toastService: ToastService) {
  }

  showSuccessToastMessage(message: any) {
    return this.toastService.show(`Success: ${message}`, {
      classname: 'bg-success text-light',
      delay: 15000
    });
  }

  showErrorToastMessage(message: any) {
    return this.toastService.show(`Error:${message}`, {
      classname: 'bg-danger text-light',
      delay: 15000,
    });
  }
}
