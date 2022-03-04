

import { Component, OnInit, Pipe } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { Select2TemplateFunction } from 'ng2-select2';
import { ApidataService } from 'src/app/services/apidata.service';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FetchBillReq, TransactionReq } from 'src/app/enums/apiRequest';
import { OpTypes, SessionVar } from 'src/app/enums/emums';
import { ApiService } from 'src/app/services/apiservices.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ApisessionService } from '../../../services/apisession.service';

@Component({
  selector: 'aditya-billpayment',
  templateUrl: './billpayment.component.html',
  styleUrls: ['./billpayment.component.css']
})
@Pipe({
  name: 'safe'
})
export class BillpaymentComponent implements OnInit {

  RechargeForm: FormGroup;
  mobile: any;
  amount: number;
  oldfetchdata: any;
  MobileplaceHolder = 'Select Electricity Operator'
  AccountRemark = ''
  odata: any;
  txtCust: string;
  public operator = 0;
  public OperatorData: Array<Select2OptionData>;
  public filteredOperator: Observable<Array<Select2OptionData>>;
  public OperatorOptions: Select2Options;
  IsRechargeSubmitted = false;
  Optional = new Array('', '', '', '');
  ddlOptional1: any = ''
  _Model = [];
  _Model2 = [];
  _Model3 = [];
  IsByModel2: boolean = false;
  IsModel3 = false;
  slides = [];
  spnMobile = '';
  spnAmount = '';
  IsexactNessID = false

  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, autoplay: true, autoplaySpeed: 2000, arrows: true };
  fetchbilldiv = {
    "BillerID": '',
    "Name": '',
    "DueDate": '',
    "BillNumber": '',
    "BillDate": '',
    "BillPeriod": '',
    "BillMonth": ''
  }
  req: FetchBillReq = { o1: '', o2: '', o3: '', o4: '' } as FetchBillReq;
  isquickpay: boolean = false;
  isbbps: boolean;
  _OpDetail: OpdetailEle = { accountName: 'Mobile Number' } as OpdetailEle;
  btnPay: boolean = true;
  txtAmount: boolean;
  btnFetchBill: boolean;
  divCust: boolean = true;
  CustomerMobile = "Customer Mobile Number";

  BillDetail: boolean = false;
  msg: string = '';
  exactNessID: number;
  errMobile: string = '';
    myParam: any;

  constructor(private apiData: ApidataService, private router: Router, private authService: AuthService,
    private fb: FormBuilder, private apiService: ApiService, private FormValidation: FormValidationService, protected _sanitizer: DomSanitizer, protected _apisessionService: ApisessionService,
    private aRouter: ActivatedRoute) {

    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((s: NavigationEnd) => {
       // window.location.reload()
        this.ngOnInit()
      });

  }

  ngOnInit() {
    
   
    this.OperatorOptions = {
      multiple: false,
      closeOnSelect: true,

      templateResult: this.templateResult,
      templateSelection: this.templateSelection
    };
    this.RechargeForm = this.fb.group({
      mobile: this.fb.control('', [Validators.required]),
      amount: this.fb.control('', [Validators.required]),
      myControl: this.fb.control('')
    })
    this.OperatorData = this.apiData.getOperator(this.apiData.getRouteID(this.router.url.replace('/', '').replace('.html', '').split('/')[1]));
    this.GetB2CBanner();
    this.filteredOperator = this.RechargeForm.controls['myControl'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterOperator(value))
      );
  }
  private _filterOperator(object: any): Array<Select2OptionData> {
    let value = typeof (object) === 'object' ? object.text : object;
    if (value != null && value != "") {
      var filterValue = value.toLowerCase();
      var data = this.OperatorData.filter(operator => operator.text.toLowerCase().includes(filterValue))
      return data;
    }
    else
      return this.OperatorData;
  }
  get r() { return this.RechargeForm.controls }
  public templateResult: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text;
    }

    let image = '<span class="dropdown-img"></span>';

    if (state.additional.image) {
      image = '<span class="dropdown-img" ><img  src="' + state.additional.image + '"</span>';
    }

    return jQuery('<span></b> ' + image + ' <span>' + state.text + '</span></span>');
  }
  // function for selection template
  public templateSelection: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text;
    }

    // return jQuery('<span> ' + state.text + '</span>');
    let image = '<span class="dropdown-img"></span>';

    if (state.additional.image) {
      image = '<span class="dropdown-img" ><img  src="' + state.additional.image + '"</span>';
    }

    var sub = state.text.length > 35 ? state.text.substring(0, 35) + '...' : state.text;

    return jQuery('<span class="search-ddl"></b> ' + image + ' <span>' + sub + '</span></span>');
  }

  public Operatorchanged(e: any): void {

    this.operator = e.value;
    if (this.operator == 0) {
      this.MobileplaceHolder = 'Select  Operator';
      return;
    }
    console.log(this.operator)
    this.odata = this.apiData.getOperatorData(this.operator);
    console.log(this.odata)
    this.MobileplaceHolder = this.odata.accountName;
    this.AccountRemark = this.odata.accountRemak;
    if (this.odata.isAccountNumeric)
      this.RechargeForm.controls['mobile'].setValidators([Validators.minLength(this.odata.length), Validators.maxLength(this.odata.lengthMax), Validators.pattern('^[0-9]+$')]);
    else
      this.RechargeForm.controls['mobile'].setValidators([Validators.minLength(this.odata.length), Validators.maxLength(this.odata.lengthMax)]);
    this.RechargeForm.controls['amount'].setValidators([Validators.min(this.odata.min), Validators.max(this.odata.max), Validators.pattern('^[0-9]+(\.?[0-9]?)')]);
    this.IsRechargeSubmitted = false;
    //

  }


  proceedToAction() {
    debugger;
    this.IsRechargeSubmitted = true;
    console.log(this.RechargeForm);
    if (this.FormValidation.CheckFormValidStatus(this.RechargeForm)) {
      if (this.FormValidation.checkControlValidation("mobile")) {
        if (this.FormValidation.RequiredValidation("mobile")) {
          this.spnMobile = this.MobileplaceHolder + " required";
        }
        else if (this.FormValidation.checkLength("mobile")) {
          this.spnMobile = this.odata.accountRemak;
        }
        else if (this.FormValidation.checkPattern("mobile") && this.odata.isAccountNumeric) {
          this.spnMobile = "Invalid Consumer number";
        }
      }
      if (this.FormValidation.checkControlValidation("amount")) {
        if (this.FormValidation.RequiredValidation("amount")) {
          this.spnAmount = "Amount is required";
        }
        else if (this.FormValidation.checkMinMaxAmount("amount")) {
          this.spnAmount = "Amount should be between " + this.odata.min + " to " + this.odata.max;
        }
        else if (this.FormValidation.checkPattern("amount")) {
          this.spnAmount = "Invalid amount";
        }
      }
      if (this.odata && this.mobile) {


        if (this.odata.length > this.mobile.toString().length) {
          this.spnMobile = this.odata.accountRemak;
        }
      }

    }
    if (!this.mobile) {

      this.spnMobile = this.MobileplaceHolder + " required";
      return;
    }
    if (!this.amount) {
      this.spnAmount = "Amount is required";

      return;
    }
    if (this.operator == 0) {
      return;
    }
    this.setOption();
    if (this.exactNessID == 1) {
      this.amount = this.oldfetchdata.amount;
    }
    if (this.exactNessID == 2) {
      if (this.amount < this.oldfetchdata.amount) {
        this.msg = 'Only exact Amount ' + this.oldfetchdata.amount + ' is allowed';
        return false;
      }


    }
    if (this.exactNessID == 3) {
      if (this.amount > this.oldfetchdata.amount) {
        this.msg = 'Only exact and above from Amount ' + this.oldfetchdata.amount + ' is allowed';
        return false;
      }

    }
    var transactionReq: TransactionReq = {
      accountNo: this.mobile,
      amount: this.amount,
      customerNo: this.txtCust,
      geoCode: '',
      o1: this.req.o1,
      o2: this.req.o1,
      o3: this.req.o1,
      o4: this.req.o1,
      oid: this.operator,
      refID: ''
    }
    this.apiData.setSessionData(SessionVar.TransactionRequest, transactionReq);
    if (this.authService.IsAuth() || true) {
      this.apiData.loadOtherClass();
      this.router.navigate(['redirecttoaction.html'], { queryParams: { reff: '3309a24d426f5ee0d77b91f885ee641b', aid: '538536ff5636f4dc4e894b16182a3165b8413ac0cbabf91126fe2b8be4795f86d3a59a416a6b7b8920d00b0af0109b50' } })
    }
    else {
      this.apiData.loadOtherClass();
      this.router.navigate(['login.html'], { queryParams: { reff: '3309a24d426f5ee0d77b91f885ee641b', pid: '538536ff5636f4dc4e894b16182a3165b8413ac0cbabf91126fe2b8be4795f86d3a59a416a6b7b8920d00b0af0109b50' } });
    }
  }
  GetB2CBanner() {
    var req = { opType: OpTypes.Electricity };
    this.apiService.GetB2CBanner(req).subscribe(resp => {
      if (resp.bannerUrl) {
        this.slides = resp.bannerUrl;
      }
    })
  }
  public displayFn(data?: Select2OptionData): string {
    return data ? data.text : '';
  }
  Operatorchangednew(event: any): void {
    this.operator = parseInt(event.option.value.id);
    if (this.operator == 0) {
      this.MobileplaceHolder = 'Select Electricity Operator';
      return;
    }
    console.log(this.operator)
    this.odata = this.apiData.getOperatorData(this.operator);
    console.log(this.odata)
    this.MobileplaceHolder = this.odata.accountName;
    this.AccountRemark = this.odata.accountRemak;
    if (this.odata.isAccountNumeric)
      this.RechargeForm.controls['mobile'].setValidators([Validators.minLength(this.odata.length), Validators.maxLength(this.odata.lengthMax), Validators.pattern('^[0-9]+$')]);
    else
      this.RechargeForm.controls['mobile'].setValidators([Validators.minLength(this.odata.length), Validators.maxLength(this.odata.lengthMax)]);
    this.RechargeForm.controls['amount'].setValidators([Validators.min(this.odata.min), Validators.max(this.odata.max), Validators.pattern('^[0-9]+(\.?[0-9]?)')]);
    this.IsRechargeSubmitted = false;
    this.OpDetail();
  }
  transform(value: string, type?: string): SafeHtml | SafeUrl | SafeResourceUrl {
    return this._sanitizer.bypassSecurityTrustUrl(value);
  }

  inputclear(a = 0) {
    if (a == 0) {
      this.operator = 0;
      this.RechargeForm.controls['myControl'].setValue(' ');
    }
  }
  OpDetail() {

    this.apiService.GetOpDetail({ OID: this.operator }).subscribe(resp => {
      console.log(resp);
      this._OpDetail = resp.operatorDetail
      this._Model = resp.operatorOptional.operatorOptionals;
      this._Model2 = resp.operatorOptional.operatorParams;
      this._Model3 = resp.operatorOptional.opOptionalDic;
      if (this._Model2 != null) {
        this.IsByModel2 = this._Model2.length > 0;
        this.divCust = !(this._Model2.filter(w => w.isCustomerNo == true).length > 0)
      }
      if (this._Model3 != null) {
        this.IsModel3 = this._Model3.length > 0;
      }
      this.showhide();
    })
    this.errMobile = '';
    this.msg = '';

  }
  showhide() {
    this.isquickpay = (this._OpDetail.isBBPS === true && this._OpDetail.isBilling === false);
    this.isbbps = this._OpDetail.isBBPS === true;
    if (this.isbbps) {
      this.btnPay = true;
      this.txtAmount = true;
      if (this._OpDetail.isBilling) {
        this.btnPay = false;
        this.btnFetchBill = true;
        if (!this._OpDetail.isPartial) {
          this.txtAmount = false;
        }
      }
    }
  }
  filterArrey(para: number) {
    return this._Model3.filter(w => w.optionalID == para);
  }
  FetchBill() {
    debugger;
    this.setOption();
    if (this.chkvaldtion() == false) {

      return false;

    }
    if (this.authService.IsAuth()) {
      this._apisessionService.FetchBill(this.req).subscribe(resp => {
        if (resp.statuscode == 1 && resp.bBPSResponse.statuscode == 1) {
          this.BillDetail = true;
          this.txtAmount = true
          this.fetchbilldiv.Name = resp.bBPSResponse.customerName
          this.fetchbilldiv.BillDate = resp.bBPSResponse.billDate
          this.fetchbilldiv.BillPeriod = resp.bBPSResponse.billPeriod
          this.fetchbilldiv.DueDate = resp.bBPSResponse.dueDate
          this.fetchbilldiv.BillDate = resp.bBPSResponse.billDate
          this.fetchbilldiv.BillNumber = resp.bBPSResponse.billNumber
          this.amount = resp.bBPSResponse.amount;
          this.oldfetchdata = resp.bBPSResponse;
          this.IsexactNessID = resp.bBPSResponse.exactness == 1;
          this.exactNessID = resp.bBPSResponse.exactness
          this.btnFetchBill = false;
          this.btnPay = true
        }
        else {

          this.msg = resp.bBPSResponse != null ? resp.bBPSResponse.msg : resp.msg;

        }

      })

    }
    else {
      this.apiData.loadOtherClass();
      this.router.navigate(['login.html'], { queryParams: { reff: '3309a24d426f5ee0d77b91f885ee641b', pid: '538536ff5636f4dc4e894b16182a3165b8413ac0cbabf91126fe2b8be4795f86d3a59a416a6b7b8920d00b0af0109b50' } });
    }

  }
  ddlchange(a, b) {
    this.req.o1 = b == 1 ? a.value : this.req.o1;
    this.req.o2 = b == 2 ? a.value : this.req.o2;
    this.req.o3 = b == 3 ? a.value : this.req.o3;
    this.req.o4 = b == 4 ? a.value : this.req.o4;
  }
  setOption() {
    this.req.oid = this.operator;
    this.req.amount = this.amount;
    this.req.accountNo = this.mobile;
    this.req.CustomerNo = this.txtCust;
    var o1 = (<HTMLInputElement>document.getElementById("txtOption1"))
    var o2 = (<HTMLInputElement>document.getElementById("txtOption2"))
    var o3 = (<HTMLInputElement>document.getElementById("txtOption3"))
    var o4 = (<HTMLInputElement>document.getElementById("txtOption4"))
    this.req.o1 = o1 == null ? this.req.o1 : o1.value;
    this.req.o2 = o2 == null ? this.req.o2 : o2.value;
    this.req.o3 = o3 == null ? this.req.o3 : o3.value;
    this.req.o4 = o4 == null ? this.req.o4 : o4.value;
    if (o1 != null) {
      var a = JSON.parse(o1.getAttribute('data-txtOption'));
      this.req.CustomerNo = a.isCustomerNo ? o1.value : this.txtCust;
      this.CustomerMobile = a.isCustomerNo ? a.paramName : this.CustomerMobile;

    }
    if (o2 != null) {
      var a = JSON.parse(o2.getAttribute('data-txtOption'));
      this.req.CustomerNo = a.isCustomerNo ? o2.value : this.txtCust;
      this.CustomerMobile = a.isCustomerNo ? a.paramName : this.CustomerMobile;
    }
    if (o3 != null) {
      var a = JSON.parse(o3.getAttribute('data-txtOption'));
      this.req.CustomerNo = a.isCustomerNo ? o3.value : this.txtCust;
      this.CustomerMobile = a.isCustomerNo ? a.paramName : this.CustomerMobile;
    }
    if (o4 != null) {
      var a = JSON.parse(o4.getAttribute('data-txtOption'));
      this.req.CustomerNo = a.isCustomerNo ? o4.value : this.txtCust;
      this.CustomerMobile = a.isCustomerNo ? a.paramName : this.CustomerMobile;
    }



  }
  chkvaldtion() {
    this.errMobile = '';
    this.msg = '';
    let ret = true;
    try {
      if (this.req.accountNo == null || this.req.accountNo == undefined) {

        this.errMobile = `Please enter a valid ${this._OpDetail.accountName}`;
        ret = false;
      }
      if (this.req.accountNo.length > 0) {
        if (this.req.accountNo.length > this._OpDetail.lengthMax) {
          this.errMobile = `Please enter a valid ${this._OpDetail.accountName} .Length should be ${this._OpDetail.lengthMax}`
          ret = false;
        }

        if (this.req.CustomerNo == null || this.req.CustomerNo == undefined ) {
          this.msg = `Please enter a valid ${this.CustomerMobile} .Length should be 10.`;
          ret = false;


        }
        else {
          if (this.req.CustomerNo.length <= 10) {
            this.msg = `Please enter a valid ${this.CustomerMobile} .Length should be 10.`;
            ret = false;
          }
        }
        if (parseInt(this.req.CustomerNo) == NaN) {
          this.msg = `Please enter a valid ${this.CustomerMobile} .Length should be 10.`;
          ret = false;

        }
      }
    }
    catch (e) { return ret; }


    return ret;
  }
}



