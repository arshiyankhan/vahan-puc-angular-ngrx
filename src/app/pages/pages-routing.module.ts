import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MyAccountComponent } from "./my-account/my-account.component";
import { PucCertificateComponent } from "./puc-certificate/puc-certificate.component";

const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: "dashboard",
                component: DashboardComponent,
            },
            {
                path: "puc-certificate",
                component: PucCertificateComponent,
            },
            {
                path: "my-account",
                component: MyAccountComponent,
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
  