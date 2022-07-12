import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { DataService, VehicleDetails } from 'src/app/services/data.service';

@Component({
  selector: 'app-puc-certificate',
  templateUrl: './puc-certificate.component.html',
  styleUrls: ['./puc-certificate.component.scss']
})
export class PucCertificateComponent implements OnInit {
  isDarkModeActive =  false;
  constructor(
    private _formBuilder: FormBuilder,
    private dataService : DataService
  ) { }

  userDetailsForm = this._formBuilder.group({
    phoneNumber: ['', Validators.required],
    vehicleRegNumber: ['', Validators.required],
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

  isWebcamEnabled = true;
  otp: string = ""
  webcamImage?: WebcamImage;

  private trigger: Subject<void> = new Subject<void>();

  ngOnInit(): void {}

  onOtpChange(otp: string) {
    this.otp = otp
  }

  //camera setup
  public triggerSnapshot(): void {
    this.trigger.next();
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  public handleImage(webcamImage: WebcamImage): void {
    this.isWebcamEnabled = false;
    this.webcamImage = webcamImage;
  }

  //api calls
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

  async startScan(){
    if (!this.userDetailsForm.valid) return;

    let vechicleImage = this.webcamImage?.imageAsDataUrl??""
    let phoneNumber = this.userDetailsForm.value.phoneNumber;

    let vehicleDetails: VehicleDetails = {
      chasisNumber: this.userDetailsRightForm.controls.chasisNumber.value??"",
      emissionNorms: this.userDetailsRightForm.controls.emissionNorms.value??"",
      engineNumber: this.userDetailsRightForm.controls.engineNumber.value??"",
      fuelType: this.userDetailsRightForm.controls.fuelUsed.value??"",
      id: 151,
      insurance: this.userDetailsRightForm.controls.insuranceValidity.value??"",
      model: "caqxe xni zfqbm",
      ownerAddress: "ukn uiiq jcccwh bskdgt 812152",
      ownerContact: this.userDetailsRightForm.controls.ownerPhoneNumber.value??"",
      ownerEmail: "yadtj04@mbtmi.com",
      ownerName: this.userDetailsRightForm.controls.regOwner.value??"",
      pucc: "2021-06-29",
      regAuthority: "ddvniu qpmhmopdbi szvd ochgp",
      regDate: this.userDetailsRightForm.controls.dateOfReg.value??"",
      regNumber: this.userDetailsRightForm.controls.regNumber.value??"",
      stolen: null,
      vehicleClass: this.userDetailsRightForm.controls.vehicleClass.value??"",
      vehicleMake: "mcxha oetnrekp"
    }
    
    let data: HttpResponse<any> = await this.dataService.startScan(vehicleDetails, phoneNumber!, vechicleImage)

  }

}
