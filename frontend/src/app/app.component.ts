import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  idNavigation!: string;
  public uid: any;
  public linkForm: any;
  displayNavbar!: string;
  title = "frontend";
  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  cerrar() {
    if (confirm("Close session?")) {
      this.auth.cerrarS();
    } else {
    }
  }
  timeCerrar() {
    setTimeout(() => {
      this.auth.cerrarS();
    }),
      1000;
  }
}
