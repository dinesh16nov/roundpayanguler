import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransectionResp } from '../../../enums/apiResponse';
import { RespCode, SessionVar } from '../../../enums/emums';
import { ApidataService } from '../../../services/apidata.service';
import { ApiService } from '../../../services/apiservices.service';
import { ApisessionService } from '../../../services/apisession.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'aditya-upi-payment',
  templateUrl: './upi-payment.component.html',
  styleUrls: ['./upi-payment.component.css']
})
export class UpiPaymentComponent implements OnInit {

  BeneficiaryName: string='';
  UpiAdress: string='';
  Amount: number = 0
  Isres = true;
  respMsg: string = '';
  statusCode: number = 0;
  BtnDisabled: boolean = true;
  response: TransectionResp = {} as TransectionResp ;

  constructor(private apiData: ApidataService,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    private apiSession: ApisessionService,

  ) { }

  ngOnInit() {

    console.log(this.Amount)
    console.log(this.BeneficiaryName)
    console.log(this.UpiAdress)
  }


  proceedToPay() {
    debugger;
    if (this.authService.IsAuth()) {
      this.apiData.loadOtherClass();
      this.UpiPay();
    }
    else {
      this.apiData.loadOtherClass();
      this.router.navigate(['login.html']);
    }


  }


  UpiPay()
  {
    
    this.Isres = true;
    if (this.BeneficiaryName == '' || this.BeneficiaryName==undefined)
    {

      this.Isres = false;
    }
    if (this.UpiAdress == '' || this.UpiAdress == undefined)
    {
      this.Isres = false;
    }
    if (this.Amount <= 0) {
      this.Isres = false;

    }

    
   
    if (this.Isres && this.BtnDisabled)
    {
      this.BtnDisabled = false;

      this.apiSession.PostUpiPayment({ Amount: this.Amount, AccountNo: this.UpiAdress, BeneName: this.BeneficiaryName }).subscribe(resp => {
        console.log(resp);
        //apiRequestID: ""
        //balance: 0
        //bank: null
        //bankID: 0
        //beneName: null
        //brandName: null
        //errorCode: 104
        //groupID: null
        //isEKYCAvailable: false
        //isNotActive: false
        //isNotCheckLimit: false
        //isOTPGenerated: false
        //isSenderNotExists: false
        //kycStatus: 0
        //liveID: ""
        //msg: "You can not use this service. Contact customer care!"
        //referenceID: null
        //senderMobile: null
        //senderName: null
        //status: ""
        //statuscode: -1
        //tid: 0
        //transactionID: ""
        if (resp.statuscode == RespCode.Success) {
          console.log(resp);
          this.statusCode = resp.statuscode
          this.respMsg = resp.msg
          this.BtnDisabled = true;
          this.response.statuscode = resp.statuscode;
          this.response.transactionID = resp.transactionID;
          this.response.mobileNo = this.UpiAdress;

          this.apiData.setSessionData(SessionVar.TransactionRequest, { amount: this.Amount , accountNo: this.UpiAdress,subject:'Upi Payment'});
          this.apiData.setSessionData(SessionVar.TransactionResponse, this.response);
          this.router.navigate(['paymentsuccess.html']);
        }
        else {
          this.statusCode = resp.statuscode
          this.respMsg = resp.msg
          this.BtnDisabled = true;

        }
        
        
      })

    }
    else
    {

      
    }



  }
}
