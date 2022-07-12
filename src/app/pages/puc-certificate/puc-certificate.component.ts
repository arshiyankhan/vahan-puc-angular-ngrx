import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-puc-certificate',
  templateUrl: './puc-certificate.component.html',
  styleUrls: ['./puc-certificate.component.scss']
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

  userDetailsRightForm = this._formBuilder.group({
    regNumber: [''],
    regOwner: [''],
    ownerPhoneNumber: [''],
    markersClass: [''],
    vehicleClass: [''],
    monthYearOfMfg: [''],
    fuelUsed: [''],
    chasisNumber: [''],
    engineNumber: [''],
    dateOfReg: [''],
    engineStroke: [''],
    emissionNorms: [''],
    odometerReading: [''],
    insuranceCertNumber: [''],
    insuranceCompany: [''],
    insuranceValidity: [''],
  });

  isWebcamEnabled = false;
  otp: string = ""
  webcamImage?: WebcamImage;

  private trigger: Subject<void> = new Subject<void>();

  ngOnInit(): void {}

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

  changeValueExample() {
    
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.isWebcamEnabled = false;
    this.webcamImage = webcamImage;
  }

  async verifyOtp(stepper: MatStepper) {
    if (!this.userDetailsForm.valid) return;

    let phoneNumber = this.userDetailsForm.value.phoneNumber;
    let vehicleRegNumber = this.userDetailsForm.value.vehicleRegNumber;

    let data: HttpResponse<any> = await this.dataService.verifyOtp(this.otp!,phoneNumber!,vehicleRegNumber!)

    this.userDetailsRightForm.patchValue({
      regNumber: data.body.data['regNumber'],
      chasisNumber: data.body.data['chasisNumber'],
      engineNumber: data.body.data['engineNumber'],
      fuelUsed: data.body.data['fuelType'],
      ownerPhoneNumber: data.body.data['ownerContact'],
      regOwner: data.body.data['ownerName'],
      insuranceValidity: data.body.data['insurance'],
      dateOfReg: data.body.data['regDate'],
      vehicleClass: data.body.data['vehicleClass'],
      emissionNorms: data.body.data['emissionNorms']
    })

    this.userDetailsRightForm.controls['regNumber'].disable()
    this.userDetailsRightForm.controls['chasisNumber'].disable()
    this.userDetailsRightForm.controls['engineNumber'].disable()
    this.userDetailsRightForm.controls['fuelUsed'].disable()
    this.userDetailsRightForm.controls['ownerPhoneNumber'].disable()
    this.userDetailsRightForm.controls['regOwner'].disable()
    this.userDetailsRightForm.controls['insuranceValidity'].disable()
    this.userDetailsRightForm.controls['dateOfReg'].disable()
    this.userDetailsRightForm.controls['vehicleClass'].disable()
    this.userDetailsRightForm.controls['emissionNorms'].disable()

    stepper.next();
  }

}
