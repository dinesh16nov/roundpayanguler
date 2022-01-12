import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PGWebRequestModel, UserSubscriptionReq, WTWMobile } from '../enums/apiRequest';
import { BalanceResp} from 'src/app/enums/apiResponse';
import { RespCode } from '../enums/emums';
import { ApidataService } from '../services/apidata.service';
import { ApisessionService } from '../services/apisession.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'aditya-wallet-to-wallet',
  templateUrl: './wallet-to-wallet.component.html',
  styleUrls: ['./wallet-to-wallet.component.css']
})
export class WalletToWalletComponent implements OnInit {


  Amount: number=0.00;
  UserID: number=0;
  MobileNo: number;
  Remark: string;
  OutletName: string='';
  Msg: string='';
  Userdatadata:number = 0;
  balance: number = 0;
  isDisabled: boolean = true;
  isloader: boolean = false;

  constructor(private apiData: ApidataService, private router: Router, private apiSession: ApisessionService, private auth: AuthService) { }
   
  ngOnInit()
  {
   // this.getuserinfo()
   //this. WalletToWalletTransfer()
    this.getWalletbalance();

  }

  getWalletbalance() {
    
    var BalanceResp: BalanceResp;
    this.apiSession.GetBalance().subscribe(resp => {
      BalanceResp = resp;
      if (BalanceResp.statuscode != undefined) {
        if (BalanceResp.statuscode == RespCode.Success) {
          this.balance = BalanceResp.data.balance;
          
        }
      }
      
    });
  }

  MobileNumberChange()
  {
    if (this.MobileNo.toString().length == 10) {
      this.getuserinfo()
    }
    else {

      this.UserID = 0;
      this.OutletName = '';
      this.Userdatadata = 0;
    }

  }

  getuserinfo() {
    var req: WTWMobile = {
      MobileNo: this.MobileNo
    }
    if (this.MobileNo.toString().length == 10) {
      this.apiSession.GetUserInfo(req).subscribe(resp => {
        if (resp.statuscode == RespCode.Success) {
          console.log(resp)
          this.OutletName = resp.wtwuserinfo.outletName;
          this.UserID = resp.wtwuserinfo.userID;
          this.Userdatadata = 1
          this.isDisabled=false
        }
        else {
          this.Msg = resp.msg;
          this.UserID = 0;
          this.Userdatadata = 2;
        }

      });
    }
    else {


    }
  }

  WalletToWalletTransfer() {
    var req: PGWebRequestModel = { a: this.Amount, id: this.UserID, vpa: this.Remark, w: 1 }
    this.apiSession.WalletToWalleTransfer(req).subscribe(resp => {
      if (resp.statuscode == RespCode.Success)
      {
        this.Userdatadata = 5;
        this.UserID = 0;
        this.Amount = 0;
        this.Msg = resp.msg;
        this.getWalletbalance();
       
       
      }
      else {
        this.Userdatadata = 3;
        this.Msg = resp.msg;

      }
      this.isDisabled = false;
      this.isloader = !this.isloader
    });
  }

  proceedToPay() {
    if (this.UserID == 0) {
      this.Msg = "Invalid UserID.";
      this.Userdatadata = 2;
      return;
    }
    if (this.Amount < 1) {
      this.Msg = "Invalid Amount";
      this.Userdatadata = 4;
      return;
    }
    if (this.balance < this.Amount)
    {
      this.Msg = "User Balance is Low.";
      this.Userdatadata = 4;
      return;
    }
    this.isDisabled = true;
    this.isloader = !this.isloader
   
   this.WalletToWalletTransfer();

  }
}
