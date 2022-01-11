import { Component, OnInit } from '@angular/core';
import { APIUrl } from 'src/app/enums/emums';
@Component({
  selector: 'aditya-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.css']
})
export class PrivacypolicyComponent implements OnInit {
  dominname: string = APIUrl.DomainName;
  constructor() { }

  ngOnInit() {
  }

}
