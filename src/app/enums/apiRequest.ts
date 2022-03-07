export interface LoginReq
{
    userID: string;
    password: string;
}

export interface VarifyOTPReq
{
    oTPSession:string;
    otp:string;
    oTPType:number;
}
export interface SignUpReq
{
    name:string;
    mobileNo:string;
    EmailID:string;
    password:string;
    pincode:number;
    address:string;
}

export interface SimplePlanReq
{
    circleID:number;
    oid:number;
}

export interface ROfferReq
{
    accountNo:number;
    oid:number;
}
export interface UserSubscriptionReq{
    Name:string,
    EmailID:string,
    Message:string,
    MobileNo:string
}

export interface TransactionReq {
    oid: number;
    accountNo?: any;
    amount: number;
    o1: string;
    o2: string;
    o3: string;
    o4: string;
    customerNo: string;
    refID: string;
    geoCode: string;
  }
  export interface PGWebRequestModel
  {
      id:number,
      a:number
      w:number,
      vpa:string
  }
export interface PGStatusCheckRequestModel{
    OrderID:number
}
export interface CommonWeRequest{
    ID:number;
    StringID:string;
}
  export interface FetchBillReq {
    oid: number;
    accountNo: string;
    amount: number;
    o1: string;
    o2: string;
    o3: string;
    o4: string;
    CustomerNo: string;
  }
  export interface RechargeReportReq{
      criteriaID:number,
      topRows:number,
      status:number,
      oid:number,
      apiid:number,
      fromDate:string,
      toDate:string,
      transactionID:string,
      accountNo:string,
      isExport:boolean,
      isRecent:boolean,
      opTypeID:number
  }
  
  export interface LedgerReportReq
  {
      topRows:number,
      status:number,
      oid:number,
      fromDate:string,
      toDate:string,
      transactionID:string,
      accountNo:string,
      isExport:boolean,
      WalletTypeID:number
  }

  export interface RefundRequestReq
  {
    tid:number,
    transactionID:string,
    otp:string,
    isResend:boolean
  }
  export interface PaymentGateway
  {
      id:string,
      pG:string,
      pGType:number,
      loginTypeID:number,
      oid:string,
      upgid:string,
      walletID:string,
      amount:string
  }
  export interface PaymentGatewayRequest
  {
      loginTypeID:number,
      pG:PaymentGateway
}

export interface WebWTWUserInfo
{
  statuscode: number,
  msg: string,
  wtwuserinfo: WTWUserInfo

}

export interface WTWUserInfo
{
  statuscode: number,
  msg: string,
  userID: number,
  outletName:string
}


export interface WTWMobile {
  
  MobileNo: number
}

export interface WebAppUserProfileUpdateReq {
  name: string;
  outletName: string;
  
  alternateMobile: string;
  dob: string;
  pan: string;
  pincode: string;
  
  address: string;
  aadhar: string;
  profilePic: string
}

export interface UpdateProfilereq {

  editUser: WebAppUserProfileUpdateReq
}
export interface OpdetailEle {

  accountName: string
  accountNoKey: string
  accountRemak: string
  allowChannel: string
  allowedChannel: number
  billerID: string
  charge: number
  chargeAmtType: boolean
  commSettingType: number
  customerNoKey: string
  dthCustInfoOID: number
  dthhrefoid: number
  exactNess: string
  exactNessID: number
  image: string
  inSlab: boolean
  ind: number
  isAccountNumeric: boolean
  isActive: boolean
  isAmountValidation: boolean
  isBBPS: boolean
  isBilling: boolean
  isGroupLeader: boolean
  isPartial: boolean
  isServiceActive: boolean
  isSpecialOp: boolean
  isTakeCustomerNum: boolean
  isVisible: boolean
  length: number
  lengthMax: number
  max: number
  maxRange: number
  min: number
  minRange: number
  name: string
  oid: number
  opType: number
  operator: string
  packageId: number
  planDocName: string
  planOID: string
  rangeId: string
  regExAccount: string
  rofferOID: number
  sCode: number
  selfAssigned: boolean
  serviceID: number
  serviceName: string
  spKey: string
  startWith: string
  stateID: number
  tollFree: string
  type: number
  walletTypeID: number


}
