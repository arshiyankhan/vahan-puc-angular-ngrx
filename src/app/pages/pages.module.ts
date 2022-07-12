import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgOtpInputModule } from "ng-otp-input";
import { HeaderComponent } from "../components/header/header.component";
import { PucCertificateComponent } from "./puc-certificate/puc-certificate.component";
import { SideBarComponent } from "../components/side-bar/side-bar.component";
import { MaterialModule } from "../modules/material/material.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { WebcamModule } from "ngx-webcam";

@NgModule({
    declarations: [
        PucCertificateComponent,
        DashboardComponent,
        MyAccountComponent,
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        NgOtpInputModule,
        WebcamModule,
    ]
  })
  export class PagesModule { }