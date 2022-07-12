import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  login(username: string, password: string): Promise<HttpResponse<any>> {
    let body = new URLSearchParams()
    body.set('username', username);
    body.set('password', password);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return new Promise((resolve, reject) => {
      this.http.post(
        `${environment.baseUrl}/login`,
        body,
        { headers, observe: "response" as 'body' }
      ).subscribe(
        (response: any) => resolve(response),
        (error: any) => reject(error)
      )
    });
  }
}
