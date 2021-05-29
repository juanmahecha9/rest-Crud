import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Product } from "../models/product";

@Injectable({
  providedIn: "root",
})
export class DataService {
  /* Product service */
  public dataProductSelect!: Product;
  public dataProduct!: Product[];
  private url = "http://localhost:4500/api/rest/mongo/";
  constructor(private http: HttpClient, private router: Router) {}
  indexGet(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + "get");
  }
  indexGetId(id: any) {
    return this.http.get<Product>(this.url + "get/" + id);
  }
  indexPost(data: Product) {
    return this.http.post(this.url + "post", data);
  }

  indexPut(id: string, data: any): Observable<Product> {
    return this.http.put(this.url + "put/" + id, data);
  }
  indexDelete(id: string) {
    return this.http.delete(this.url + "delete/" + id);
  }
}
