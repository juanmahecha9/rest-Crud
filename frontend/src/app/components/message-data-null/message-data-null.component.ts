import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-message-data-null',
  templateUrl: './message-data-null.component.html',
  styleUrls: ['./message-data-null.component.scss']
})
export class MessageDataNullComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit(): void {
  }

  add(){
    this.router.navigate(["/add"]);
  }
}
