import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdvertisementPackage, AdvertisementReq } from '../../enums/apiResponse';
import { APIUrl, RespCode } from '../../enums/emums';
import { ApidataService } from '../../services/apidata.service';
import { ApisessionService } from '../../services/apisession.service';

@Component({
  selector: 'aditya-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {
  fileToUpload: File;
  Content: string='';
 config = {
    keyboard: false,
    ignoreBackdropClick: true,
    class: 'cus-modal'
  };
  Id: string = '0';
  ContentImage: string = '';
  PackageId:number=0;
  Package: AdvertisementPackage[];
  AdvertisementList: AdvertisementReq[];
  file_name: string = 'Choose File';
  Domain: string = APIUrl.Domain;
  Type: string = 'Web';
  PackageVal: string;
  PackageCost: string;
  ReturnUrl: string = "";
  show = 0;
  Msg = "";
  preview: BsModalRef;
  Statuscode: number=0;
;
  constructor(private apiData: ApisessionService, private modalService: BsModalService) { }

  ngOnInit() {
    console.log(this.fileToUpload)

    this.GetPacakge();
    this.GetAdvertisementList();
  }


  CreateFormdate()
  {
    var data = new FormData();
    data.append('File', this.fileToUpload);
    data.append('ContentText', this.Content);
    data.append('Id', this.Id);
    data.append('ContentImage', this.ContentImage)
    data.append('PackageId', this.PackageId.toString())
    data.append('Type', this.Type)
    data.append('ReturnUrl', this.ReturnUrl)
    if (this.ReturnUrl.length == 0)
    {
      this.show = 1;
      return;

    }
    if (this.Content.length == 0) {
      this.show = 1;
      return;

    }

    if (this.fileToUpload != undefined && this.PackageId != 0 )
    {
      this.show =0;
      this.apiData.UploadAdvertisement(data).subscribe(resp => {
        this.Statuscode == resp.statuscode
        this.Msg = resp.msg
        if (resp.statuscode == 1) {
          this.GetAdvertisementList();
          this.fileToUpload = undefined;
          this.file_name = 'Choose File';
          this.Content = "";
          this.PackageId = 0;
          this.ReturnUrl = "";
        }
      });
    }
    else
    {
      this.show = 1;

    }
    
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.file_name = this.fileToUpload.name;
   
    }

  GetPacakge() {
    this.apiData.GetAdvertisementPackage().subscribe(resp => {
      if (resp.statuscode = RespCode.Success) {
        console.log(resp)
        this.Package = resp.package;
       

      }
    });

  }


  GetAdvertisementList() {
    this.apiData.GetAdvertisementList().subscribe(resp => {

      this.AdvertisementList = resp;
      console.log(this.AdvertisementList);



    });
  }


  PackageInfo(event: any) {
    let a = this.Package.filter(x => x.id == event);
    this.PackageCost = a[0].packageCost
    this.PackageVal = a[0].packageValidity

  }

  openQuickVIewPopup(template: TemplateRef<any>) {
    this.preview = this.modalService.show(template, this.config);
    this.preview.setClass('modal-lg');
  }
}
