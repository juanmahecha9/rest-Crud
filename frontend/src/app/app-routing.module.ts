import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddComponent } from "./components/add/add.component";
import { ContactUsComponent } from "./components/contact-us/contact-us.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EditProductComponent } from "./components/edit-product/edit-product.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/home" },
  { path: "home", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "contact-us", component: ProfileComponent },
  { path: "dashboard-products", component: DashboardComponent },
  { path: "edit/:id", component: EditProductComponent, canActivate: [AuthGuard] },
  { path:"add", component: AddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
