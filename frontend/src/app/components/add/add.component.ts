import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Product } from "src/app/models/product";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  public mode: string = "form";
  formGroup: FormGroup = this._formBuilder.group({});
  public idPage!: string;
  public dataProduct!: Product;

  public validacion: boolean = false;

  public data: Product = {
    name: "",
    category: "",
    quantity: 0,
    price: 0,
  };

  public formErrors = {
    name: "",
    category: "",
    quantity: "",
    price: "",
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      category: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
      quantity: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
      price: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
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
      case "category":
        if (
          valor == null ||
          valor == undefined ||
          valor == "" ||
          valor.length < 1
        ) {
          this.formErrors.category = "error";
          this.validacion = true;
        } else {
          this.formErrors.category = "";
        }
        break;
      case "quantity":
        if (
          valor == null ||
          valor == undefined ||
          valor == "" ||
          valor.length < 1
        ) {
          this.formErrors.quantity = "error";
          this.validacion = true;
        } else {
          this.formErrors.quantity = "";
        }
        break;
      case "price":
        if (
          valor == null ||
          valor == undefined ||
          valor == "" ||
          valor.length < 1
        ) {
          this.formErrors.price = "error";
          this.validacion = true;
        } else {
          this.formErrors.price = "";
        }
        break;
      default:
        break;
    }
  }

  retunData(control: any) {
    return this.formGroup.get(control)!.value;
  }

  dataIsNotNull(name: any, category: any, quantity: any, price: any) {
    if (
      (this.retunData(name) &&
        this.retunData(category) &&
        this.retunData(quantity) &&
        this.retunData(price)) != null
    ) {
      this.data.name = this.retunData(name);
      this.data.category = this.retunData(category);
      this.data.quantity = this.retunData(quantity);
      this.data.price = this.retunData(price);
    }
  }

  submit() {
    this.validarRequerido("name");
    this.validarRequerido("category");
    this.validarRequerido("quantity");
    this.validarRequerido("price");

    if (this.formGroup.valid) {
      this.validacion = true;
      this.dataIsNotNull("name", "category", "quantity", "price");
      this.mode = "preview";
    } else {
      this.validacion = false;
    }
  }

  onSubmit() {
    this.dataService.indexPost(this.data).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(["/dashboard-products"]);
      },
      (err) => console.log(err)
    );
  }

  onBack() {
    this.mode = "form";
  }
}
