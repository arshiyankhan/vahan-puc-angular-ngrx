import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-puc-certificate',
  templateUrl: './puc-certificate.component.html',
  styleUrls: ['./puc-certificate.component.css']
})
export class PucCertificateComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  userDetailsForm = this._formBuilder.group({
    mobileNumber: ['', Validators.required],
    vehicleRegistrationNumber: ['', Validators.required],
  });

  otp: string = ""

  ngOnInit(): void {
  }

  onOtpChange(otp: string) {
    this.otp = otp
  }

  verifyOtp(stepper: MatStepper) {
    console.log(this.otp)
    stepper.next();
  }
}
