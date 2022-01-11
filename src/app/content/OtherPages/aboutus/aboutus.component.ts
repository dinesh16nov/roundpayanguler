import { Component, OnInit } from '@angular/core';
import { APIUrl } from 'src/app/enums/emums';
@Component({
  selector: 'aditya-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  dominname:string= APIUrl.DomainName;
  constructor() { }

  ngOnInit() {
    
  }

}
