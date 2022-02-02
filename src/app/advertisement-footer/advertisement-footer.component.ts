import { Component, OnInit } from '@angular/core';
import { AdvertisementReq } from '../enums/apiResponse';
import { APIUrl } from '../enums/emums';
import { ApiService } from '../services/apiservices.service';
import { ApisessionService } from '../services/apisession.service';

@Component({
  selector: 'aditya-advertisement-footer',
  templateUrl: './advertisement-footer.component.html',
  styleUrls: ['./advertisement-footer.component.css']
})
export class AdvertisementFooterComponent implements OnInit {
  Domain: string = APIUrl.Domain;
  AdvertisementList: any[];
  //----------------------------
  //itemsPerSlide = 3;
  //singleSlideOffset = true;
 /// noWrap = false;
  IsTrue = false;
//-----------------------------
  

  constructor(private apiservice: ApiService)
  {
   
  }

  ngOnInit() {
    this.GetAdvertisementList();
  }
  GetAdvertisementList() {
    this.apiservice.GetAdvertisementFooter().subscribe(resp => {
      this.AdvertisementList = resp;
      if (this.AdvertisementList.length>0)
      this.IsTrue = true;
  
    });
    
  }

  slides = [
    { img: "https://via.placeholder.com/600.png/09f/fff" },
    { img: "https://via.placeholder.com/600.png/021/fff" },
    { img: "https://via.placeholder.com/600.png/321/fff" },
    { img: "https://via.placeholder.com/600.png/422/fff" },
    { img: "https://via.placeholder.com/600.png/654/fff" }
  ];
  //slideConfig = { "slidesToShow": 3, "slidesToScroll": 3 };
  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "dots": false,
    "infinite": true,
     "autoRotate" : true,
     "autoRotateAfter" : 1,
    "autoplay": true,
    "autoplaySpeed": 3000,
    "nav": true
  };


  addSlide() {
    this.slides.push({ img: "http://placehold.it/350x150/777777" })
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }

 


}
