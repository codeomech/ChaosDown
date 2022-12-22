import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  username=null;

  constructor(private loged:AuthService) { }

  ngOnInit(): void {
    this.username=this.loged.getUser();
  }

}
