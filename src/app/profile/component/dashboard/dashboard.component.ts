import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../../services/profile.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any;
  profileForm: any = FormGroup;

  constructor(private profileService: ProfileService,
              private fb: FormBuilder) {
    this.profileForm = fb.group({
      first_name: new FormControl('', {
        validators: [Validators.required]
      }),
      last_name: new FormControl('', {
        validators: [Validators.required]
      }),
      email: new FormControl('', {
        validators: [Validators.email, Validators.required]
      }),
      phone_number: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((res: any) => {
      this.user = res.data;
    });
  }

}
