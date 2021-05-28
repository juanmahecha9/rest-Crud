import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  constructor(private auth: AuthService) {}

  /* Añadir cabezaras en cada peticion */
  intercept(req: any, next: any) {
    const tokenR = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`,
      },
    });
    return next.handle(tokenR);
  }
}
