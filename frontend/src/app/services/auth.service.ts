import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = "http://localhost:4500/api/rest/mongo/auth/";
  constructor(private http: HttpClient, private router: Router) {}

  login(user: any) {
    return this.http.post<any>(this.url + "login", user);
  }

  /* Solicitudes al servidor */
  createUser(user: any) {
    return this.http.post<any>(this.url + "post", user);
    /* retornar al sercio de la url un usuario que se va a recibir */
  }

  /* comprobar de manera simple si el local storage posee un dato llamado token para la navegacion en las rutas privadas */
  loggedIn() {
    return !!localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  cerrarS() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    this.router.navigate(["/inicio-sesion"]);
    console.log("Cerrar Sesion");
  }

  private() {
    return this.http.get<any>(this.url + "/private");
  }
}
