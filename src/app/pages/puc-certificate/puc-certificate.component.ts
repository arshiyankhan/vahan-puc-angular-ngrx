import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-puc-certificate',
  templateUrl: './puc-certificate.component.html',
  styleUrls: ['./puc-certificate.component.css']
})
export class PucCertificateComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    private dataService : DataService
  ) { }

  userDetailsForm = this._formBuilder.group({
    phoneNumber: ['', Validators.required],
    vehicleRegNumber: ['', Validators.required],
  });

  otp: string = ""

  ngOnInit(): void {
  }

  onOtpChange(otp: string) {
    this.otp = otp
  }

  async sendOtp(stepper:MatStepper){
    if (!this.userDetailsForm.valid) return;

    let phoneNumber = this.userDetailsForm.value.phoneNumber;
    let vehicleRegNumber = this.userDetailsForm.value.vehicleRegNumber;

    let data: HttpResponse<any> = await this.dataService.sendOtp(phoneNumber!,vehicleRegNumber!)
    stepper.next();
  }

  async verifyOtp(stepper: MatStepper) {
    if (!this.userDetailsForm.valid) return;

    let phoneNumber = this.userDetailsForm.value.phoneNumber;
    let vehicleRegNumber = this.userDetailsForm.value.vehicleRegNumber;

    let data: HttpResponse<any> = await this.dataService.verifyOtp(this.otp!,phoneNumber!,vehicleRegNumber!)
    console.log(data.body.data);
    
    stepper.next();
  }

}
