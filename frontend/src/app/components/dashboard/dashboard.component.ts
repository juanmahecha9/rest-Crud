import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "src/app/models/product";
import { AuthService } from "src/app/services/auth.service";
import { DataService } from "src/app/services/data.service";

import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public dataProduct!: Product[];
  public disabled: boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private authService: AuthService
  ) {
    this.getData();
  }

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  getData() {
    this.dataService.indexGet().subscribe(
      (res: Product[]) => {
        this.dataProduct = res;
        //console.log(this.dataProduct);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editData(id: string) {
    this.router.navigate(["/edit/" + id]);
  }

  deleteData(id: string) {
    if (confirm("Are you sure yo want to delete it?")) {
      this.dataService.indexDelete(id).subscribe(
        (res) => {
          location.reload();
        },
        (err) => console.log(err)
      );
    }
  }
}
