import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { from } from "rxjs";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormGroupDirective,
  NgForm,
} from "@angular/forms";
import { Auth } from "src/app/models/auth";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /* objeto para llenar  */
  user: Auth = {
    name: "",
    userName: "",
    email: "",
    password: "",
  };
  public formErrors = {
    name: "",
    userName: "",
    email: "",
    password: "",
  };
  public validacion: boolean = false;
  formGroup: FormGroup = this._formBuilder.group({});

  constructor(
    private authService: AuthService,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      userName: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(this.emailPattern),
      ]),
    });
    this.subscribirAEntrada("email", (value: any) => {
      console.log(value);
    });
  }

  subscribirAEntrada(entrada: string, fn: any) {
    const obs = this.formGroup.get(entrada);
    if (obs != null) {
      obs.valueChanges.subscribe({
        next: fn,
      });
    }
  }

  validarRequerido(control: string) {
    const valor = this.formGroup.get(control)!.value;
    switch (control) {
      case "name":
        if (
          valor == null ||
          valor == undefined ||
          valor == "" ||
          valor.length < 1
        ) {
          this.formErrors.name = "error";
          this.validacion = true;
        } else {
          this.formErrors.name = "";
        }
        break;
      case "userName":
        if (
          valor == null ||
          valor == undefined ||
          valor == "" ||
          valor.length < 1
        ) {
          this.formErrors.userName = "error";
          this.validacion = true;
        } else {
          this.formErrors.userName = "";
        }
        break;
      case "email":
        if (
          valor == null ||
          valor == undefined ||
          valor == "" ||
          valor.length < 1
        ) {
          this.formErrors.email = "error";
          this.validacion = true;
        } else {
          this.formErrors.email = "";
        }
        break;
      case "password":
        if (
          valor == null ||
          valor == undefined ||
          valor == "" ||
          valor.length < 1
        ) {
          this.formErrors.password = "error";
          this.validacion = true;
        } else {
          this.formErrors.password = "";
        }
        break;
      default:
        break;
    }
  }
  retunData(control: string) {
    return this.formGroup.get(control)!.value;
  }
  dataIsNotNull(
    name: string,
    userName: string,
    email: string,
    password: string
  ) {
    if (
      (this.retunData(name) &&
        this.retunData(userName) &&
        this.retunData(email) &&
        this.retunData(password)) != null
    ) {
      this.user.name = this.retunData(name);
      this.user.userName = this.retunData(userName);
      this.user.email = this.retunData(email);
      this.user.password = this.retunData(password);
    }
  }
  submit() {
    this.validarRequerido("name");
    this.validarRequerido("userName");
    this.validarRequerido("email");
    this.validarRequerido("password");

    if (this.formGroup.valid) {
      this.validacion = true;
      this.dataIsNotNull("name", "userName", "email", "password");
      this.onSubmit();
    } else {
      this.validacion = false;
    }
  }

  onSubmit() {
    this.authService.createUser(this.user).subscribe(
      (res) => {
        // console.log(res)
        alert("Registro realizado");
        this.router.navigate(["/home"]);
      },
      (err) => {
        alert("Registro rechazado");
        console.log(err);
      }
    );
  }
}
