import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-phase5',
  templateUrl: './phase5.component.html',
  styleUrls: ['./phase5.component.scss']
})
export class Phase5Component implements OnInit {

  private formData = {
    term:String,
    option: Number
  };
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  submitForm(){
    //this.http.post()
  }
}
