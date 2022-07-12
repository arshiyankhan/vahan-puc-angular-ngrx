import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) { }

  sendOtp(phoneNumber:String, vehicleRegNumber:String,latitude:String="19.0748",longitude:String="72.8856"): Promise<HttpResponse<any>>{

    let body = { "latitude":latitude, "longitude":longitude, "phoneNumber":phoneNumber, "vehicleRegNumber":vehicleRegNumber }
  
    return new Promise((resolve, reject) => {
      this.http.post(
        `${environment.baseUrl}/dealer/otp`,
        body,
        { observe: "response" as 'body' }
      ).subscribe(
        (response: any) => resolve(response),
        (error: any) => reject(error)
      )
    });
  }

  verifyOtp(otp:String, phoneNumber:String, vehicleRegNumber:String, latitude:String="19.0748", longitude:String="72.8856"): Promise<HttpResponse<any>>{

    let body = { "latitude":latitude, "longitude":longitude, "otp": otp, "phoneNumber":phoneNumber, "vehicleRegNumber":vehicleRegNumber }
  
    return new Promise((resolve, reject) => {
      this.http.post(
        `${environment.baseUrl}/dealer/verify-otp`,
        body,
        { observe: "response" as 'body' }
      ).subscribe(
        (response: any) => resolve(response),
        (error: any) => reject(error)
      )
    });
  }

  startScan(vehicleDetails:VehicleDetails, phoneNumber:String, vehicleImage:String): Promise<HttpResponse<any>>{
    
    let body = {
      "phoneNumber": "2213131121",
      "vehicle": {
      "chasisNumber": vehicleDetails.chasisNumber,
      "emissionNorms": vehicleDetails.emissionNorms,
      "engineNumber": vehicleDetails.engineNumber,
      "fuelType": vehicleDetails.fuelType,
      "id": vehicleDetails.id,
      "insurance": vehicleDetails.insurance,
      "model": vehicleDetails.model,
      "ownerAddress": vehicleDetails.ownerAddress,
      "ownerContact": vehicleDetails.ownerContact,
      "ownerEmail": vehicleDetails.ownerEmail,
      "ownerName": vehicleDetails.ownerName,
      "pucc": vehicleDetails.pucc,
      "regAuthority": vehicleDetails.regAuthority,
      "regDate": vehicleDetails.regDate,
      "regNumber": vehicleDetails.regNumber,
      "stolen": vehicleDetails.stolen,
      "vehicleClass": vehicleDetails.vehicleClass,
      "vehicleMake": vehicleDetails.vehicleMake,
      },
      "vehicleImage": vehicleImage
    }
  
    return new Promise((resolve, reject) => {
      this.http.post(
        `${environment.baseUrl}/dealer/readings-cert`,
        body,
        { observe: "response" as 'body' }
      ).subscribe(
        (response: any) => resolve(response),
        (error: any) => reject(error)
      )
    });
  }
}


export interface VehicleDetails{
    chasisNumber: string,
    emissionNorms: string,
    engineNumber: string,
    fuelType: string,
    id: number,
    insurance: string,
    model: string,
    ownerAddress: string,
    ownerContact: string,
    ownerEmail: string,
    ownerName: string,
    pucc: string,
    regAuthority: string,
    regDate: string,
    regNumber: string,
    stolen: null,
    vehicleClass: string,
    vehicleMake: string
}
