import { Component, OnInit } from '@angular/core';
import { WebAppUserProfileResp} from 'src/app/enums/apiResponse';
import { UpdateProfilereq, WebAppUserProfileUpdateReq } from 'src/app/enums/apiRequest';
import { ApisessionService } from 'src/app/services/apisession.service';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';
import * as moment from 'moment';
import { APIUrl } from '../../../enums/emums';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'aditya-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 Name:string;
  OutletName:string;
  EmailID:string;
  Mobile:string;
  AlternateMobile: string;
  DOB: Date;
  PAN:string;
  Pincode:string;
  City:string;
  State:string;
  Address: string;
  Aadhar: string;
  profilePic: string;
  Domain: string = APIUrl.Domain;
  Userid: string = this.auth.getUserID();
  constructor(private apiSession: ApisessionService, private auth: AuthService) {
    this.GetProfile();
  }

  ngOnInit() {
  }
  GetProfile(){ 
    this.apiSession.GetProfile().subscribe((resp: WebAppUserProfileResp) => {
      console.log(resp)
      if(resp.statuscode==1){
        this.Name=resp.name;
        this.OutletName=resp.outletName;
        this.Mobile=resp.mobileNo;
        this.EmailID=resp.emailID;
        this.AlternateMobile = resp.alternateMobile;
        this.DOB = new Date(resp.dob);
        this.PAN=resp.pan;
        this.Pincode=resp.pincode;
        this.City=resp.city;
        this.State=resp.state;
        this.Address = resp.address
        this.Aadhar = resp.aadhar
        this.profilePic = resp.profilePic
        console.log(this.DOB)
      }
    });
  }

  UpdateProfile(req: UpdateProfilereq)
  {
   
    this.apiSession.UpdateProfile(req).subscribe((resp: WebAppUserProfileResp) => {
      if(resp.statuscode == 1){
        this.GetProfile();
      }
    });


  }


  proceedToPay() {
    var para: WebAppUserProfileUpdateReq = {
      name: this.Name, outletName: this.Name, alternateMobile: this.AlternateMobile, dob: moment(this.DOB).format("DD MMM YYYY") ,
      pan: this.PAN, aadhar: this.Aadhar, address: this.Address, pincode: this.Pincode, profilePic: ''

    };
    console.log(para);
    var req: UpdateProfilereq = { editUser: para };
    this.UpdateProfile(req);

  }

  onValueChange(e) {
   
    this.DOB = e;
  }
}
