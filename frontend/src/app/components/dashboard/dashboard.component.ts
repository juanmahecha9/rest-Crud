import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "src/app/models/product";
import { AuthService } from "src/app/services/auth.service";
import { DataService } from "src/app/services/data.service";

import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public dataProduct!: Product[];
  public disabled: boolean = false;

  //Table
  displayedColumns: string[] = [
    "name",
    "category",
    "quantity",
    "price",
    "actions",
  ];
  dataSource = new MatTableDataSource();

  dataExist!: boolean;

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
        if (res.length == 0) {
          console.log("empty");
          this.dataExist = true;
        } else {
          console.log("The array has data!");
          this.dataExist = false;
        }
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

  //Table
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
