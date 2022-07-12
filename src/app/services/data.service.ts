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
}
