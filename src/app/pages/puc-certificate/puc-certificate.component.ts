import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-puc-certificate',
  templateUrl: './puc-certificate.component.html',
  styleUrls: ['./puc-certificate.component.scss']
})
export class PucCertificateComponent implements OnInit {
  isDarkModeActive =  false;
  constructor(
    private _formBuilder: FormBuilder
  ) { }

  userDetailsForm = this._formBuilder.group({
    mobileNumber: ['', Validators.required],
    vehicleRegistrationNumber: ['', Validators.required],
  });

  userDetailsRightForm = this._formBuilder.group({
    regNumber: ['', Validators.required],
    regOwner: ['', Validators.required],
    ownerPhoneNumber: ['', Validators.required],
    markersClass: ['', Validators.required],
    vehicleClass: ['', Validators.required],
    monthYearOfMfg: ['', Validators.required],
    fuelUsed: ['', Validators.required],
    chasisNumber: ['', Validators.required],
    engineNumber: ['', Validators.required],
    dateOfReg: ['', Validators.required],
    engineStroke: ['', Validators.required],
    emissionNorms: ['', Validators.required],
    odometerReading: ['', Validators.required],
    insuranceCertNumber: ['', Validators.required],
    insuranceCompany: ['', Validators.required],
    insuranceValidity: ['', Validators.required],
  });

  otp: string = ""

  ngOnInit(): void {}

  onOtpChange(otp: string) {
    this.otp = otp
  }

  verifyOtp(stepper: MatStepper) {
    console.log(this.otp)
    stepper.next();
  }

  changeValueExample() {
    this.userDetailsRightForm.patchValue({
      regNumber: 'TN-12-12-12',
    })
  }
}
