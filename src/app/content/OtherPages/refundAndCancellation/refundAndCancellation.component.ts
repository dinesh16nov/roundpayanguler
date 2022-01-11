import { Component, OnInit } from '@angular/core';
import { APIUrl } from 'src/app/enums/emums';
@Component({
  selector: 'aditya-refundAndCancellation',
  templateUrl: './refundAndCancellation.component.html',
  styleUrls: ['./refundAndCancellation.component.css']
})
export class RefundAndCancellationComponent implements OnInit {
  dominname: string = APIUrl.DomainName;
  constructor() { }

  ngOnInit() {
  }

}
