import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of, from} from 'rxjs';
import { APIUrl,HeaderInfo } from '../enums/emums';
import { FetchBillReq,TransactionReq, RechargeReportReq, LedgerReportReq, RefundRequestReq,PGWebRequestModel, PGStatusCheckRequestModel, CommonWeRequest, WebWTWUserInfo, UpdateProfilereq } from '../enums/apiRequest';
import {  AdvertisementPackageList, AdvertisementReq, BalanceResp,CommonResp,CouponDetail,NumberListResp,PGInitiatePGResponse, TransectionResp, WebAppUserProfileResp, WebMemberTypeModel} from '../enums/apiResponse';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class ApisessionService {

  constructor(private auth:AuthService,private http: HttpClient) { 
    
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  Logout():Observable<any>
  {
    var httpOptions = {headers: new HttpHeaders({ 'appID':HeaderInfo.AppID,'version':HeaderInfo.Version,'domain':HeaderInfo.Domain,'userID':this.auth.getUserID(),'sessionID':this.auth.getSessionID(),'session':this.auth.getSession() })};
    return this.http.post<any>(APIUrl.BaseURL + APIUrl.Logout,1, httpOptions).pipe(
      catchError(this.handleError<any>('Logout'))
    );
  }

  GetBalance():Observable<BalanceResp>
  {
    var httpOptions = {headers: new HttpHeaders({ 'appID':HeaderInfo.AppID,'version':HeaderInfo.Version,'domain':HeaderInfo.Domain,'userID':this.auth.getUserID(),'sessionID':this.auth.getSessionID(),'session':this.auth.getSession() })};
    return this.http.post<BalanceResp>(APIUrl.BaseURL + APIUrl.GetBalance,1, httpOptions).pipe(
      catchError(this.handleError<BalanceResp>('GetBalance'))
    );
  }
  GetPGDetail(req: PGWebRequestModel): Observable<PGInitiatePGResponse>{
       var httpOptions = {headers: new HttpHeaders({ 'appID':HeaderInfo.AppID,'version':HeaderInfo.Version,'domain':HeaderInfo.Domain,'userID':this.auth.getUserID(),'sessionID':this.auth.getSessionID(),'session':this.auth.getSession() })};
    return this.http.post<PGInitiatePGResponse>(APIUrl.BaseURL + APIUrl.GetPGDetail,req, httpOptions).pipe(
      catchError(this.handleError<PGInitiatePGResponse>('GetPGDetail'))
    );
  }
  CheckPGStatus(req:PGStatusCheckRequestModel):Observable<PGInitiatePGResponse>{
    var httpOptions = {headers: new HttpHeaders({ 'appID':HeaderInfo.AppID,'version':HeaderInfo.Version,'domain':HeaderInfo.Domain,'userID':this.auth.getUserID(),'sessionID':this.auth.getSessionID(),'session':this.auth.getSession() })};
    return this.http.post<PGInitiatePGResponse>(APIUrl.BaseURL + APIUrl.CheckPGStatus,req, httpOptions).pipe(
      catchError(this.handleError<PGInitiatePGResponse>('CheckPGStatus'))
    );
  }
  GetProfile():Observable<WebAppUserProfileResp>{
    var httpOptions = {headers: new HttpHeaders({ 'appID':HeaderInfo.AppID,'version':HeaderInfo.Version,'domain':HeaderInfo.Domain,'userID':this.auth.getUserID(),'sessionID':this.auth.getSessionID(),'session':this.auth.getSession() })};
    return this.http.post<WebAppUserProfileResp>(APIUrl.BaseURL + APIUrl.GetProfile,1, httpOptions).pipe(
      catchError(this.handleError<WebAppUserProfileResp>('GetProfile'))
    );
  }
  GetMembershipType():Observable<WebMemberTypeModel>{
    var httpOptions = {headers: new HttpHeaders({ 'appID':HeaderInfo.AppID,'version':HeaderInfo.Version,'domain':HeaderInfo.Domain,'userID':this.auth.getUserID(),'sessionID':this.auth.getSessionID(),'session':this.auth.getSession() })};
    return this.http.post<WebMemberTypeModel>(APIUrl.BaseURL + APIUrl.GetMembershipType,1, httpOptions).pipe(
      catchError(this.handleError<WebMemberTypeModel>('GetMembershipType'))
    );
  }
  PurchaseMemberShip(req:CommonWeRequest):Observable<TransectionResp>{
    var httpOptions = {headers: new HttpHeaders({ 'appID':HeaderInfo.AppID,'version':HeaderInfo.Version,'domain':HeaderInfo.Domain,'userID':this.auth.getUserID(),'sessionID':this.auth.getSessionID(),'session':this.auth.getSession() })};
    return this.http.post<TransectionResp>(APIUrl.BaseURL + APIUrl.PurchaseMemberShip,req, httpOptions).pipe(
      catchError(this.handleError<TransectionResp>('PurchaseMemberShip'))
    );
  }
  RedeemCoupon(req:CommonWeRequest):Observable<TransectionResp>{
    var httpOptions = {headers: new HttpHeaders({ 'appID':HeaderInfo.AppID,'version':HeaderInfo.Version,'domain':HeaderInfo.Domain,'userID':this.auth.getUserID(),'sessionID':this.auth.getSessionID(),'session':this.auth.getSession() })};
    return this.http.post<TransectionResp>(APIUrl.BaseURL + APIUrl.RedeemCoupon,req, httpOptions).pipe(
      catchError(this.handleError<TransectionResp>('RedeemCoupon'))
    );
  }
  //
  GetAllCoupons():Observable<CouponDetail[]>{
    var httpOptions = {headers: new HttpHeaders({ 'appID':HeaderInfo.AppID,'version':HeaderInfo.Version,'domain':HeaderInfo.Domain,'userID':this.auth.getUserID(),'sessionID':this.auth.getSessionID(),'session':this.auth.getSession() })};
    return this.http.post<CouponDetail[]>(APIUrl.BaseURL + APIUrl.GetAllCoupons,1, httpOptions).pipe(
      catchError(this.handleError<CouponDetail[]>('GetAllCoupons'))
    );
  }
  Transaction(req:TransactionReq):Observable<any>
  {
    var httpOptions = {headers: new HttpHeaders({ 'appID':HeaderInfo.AppID,'version':HeaderInfo.Version,'domain':HeaderInfo.Domain,'userID':this.auth.getUserID(),'sessionID':this.auth.getSessionID(),'session':this.auth.getSession() })};
    return this.http.post<any>(APIUrl.BaseURL + APIUrl.Transaction,req, httpOptions).pipe(
      catchError(this.handleError<any>('Transaction'))
    );
  }

  FetchBill(req:FetchBillReq):Observable<any>
  {
    var httpOptions = {headers: new HttpHeaders({ 'appID':HeaderInfo.AppID,'version':HeaderInfo.Version,'domain':HeaderInfo.Domain,'userID':this.auth.getUserID(),'sessionID':this.auth.getSessionID(),'session':this.auth.getSession() })};
    return this.http.post<any>(APIUrl.BaseURL + APIUrl.FetchBill,req, httpOptions).pipe(
      catchError(this.handleError<any>('FetchBill'))
    );
  }

  RechargeReport(req:RechargeReportReq):Observable<any>
  {
    var httpOptions = {headers: new HttpHeaders({ 'appID':HeaderInfo.AppID,'version':HeaderInfo.Version,'domain':HeaderInfo.Domain,'userID':this.auth.getUserID(),'sessionID':this.auth.getSessionID(),'session':this.auth.getSession() })};
    return this.http.post<any>(APIUrl.BaseURL + APIUrl.RechargeReport,req, httpOptions).pipe(
      catchError(this.handleError<any>('RechargeReport'))
    );
  }

  LedgerReport(req:LedgerReportReq):Observable<any>
  {
    var httpOptions = {headers: new HttpHeaders({ 'appID':HeaderInfo.AppID,'version':HeaderInfo.Version,'domain':HeaderInfo.Domain,'userID':this.auth.getUserID(),'sessionID':this.auth.getSessionID(),'session':this.auth.getSession() })};
    return this.http.post<any>(APIUrl.BaseURL + APIUrl.LedgerReport,req, httpOptions).pipe(
      catchError(this.handleError<any>('LedgerReport'))
    );
  }

  RefundRequest(req:RefundRequestReq):Observable<any>
  {
    var httpOptions = {headers: new HttpHeaders({ 'appID':HeaderInfo.AppID,'version':HeaderInfo.Version,'domain':HeaderInfo.Domain,'userID':this.auth.getUserID(),'sessionID':this.auth.getSessionID(),'session':this.auth.getSession() })};
    return this.http.post<any>(APIUrl.BaseURL + APIUrl.RefundRequest,req, httpOptions).pipe(
      catchError(this.handleError<any>('RefundRequest'))
    );
  }


  


  GetPaymentMode(): Observable<NumberListResp> {
    var httpOptions = { headers: new HttpHeaders({ 'appID': HeaderInfo.AppID, 'version': HeaderInfo.Version, 'domain': HeaderInfo.Domain, 'userID': this.auth.getUserID(), 'sessionID': this.auth.getSessionID(), 'session': this.auth.getSession() }) };
    return this.http.post<NumberListResp>(APIUrl.BaseURL + APIUrl.GetPaymentMode, 1, httpOptions).pipe(
      catchError(this.handleError<NumberListResp>('GetPaymentMode'))
    );
  }

  GetUserInfo(req): Observable<WebWTWUserInfo> {
    var httpOptions = { headers: new HttpHeaders({ 'appID': HeaderInfo.AppID, 'version': HeaderInfo.Version, 'domain': HeaderInfo.Domain, 'userID': this.auth.getUserID(), 'sessionID': this.auth.getSessionID(), 'session': this.auth.getSession() }) };
    return this.http.post<WebWTWUserInfo>(APIUrl.BaseURL + APIUrl.GetUserInfo, req, httpOptions).pipe(
      catchError(this.handleError<WebWTWUserInfo>('GetUserInfo'))
    );
  }

  WalletToWalleTransfer(req): Observable<CommonResp> {
    var httpOptions = { headers: new HttpHeaders({ 'appID': HeaderInfo.AppID, 'version': HeaderInfo.Version, 'domain': HeaderInfo.Domain, 'userID': this.auth.getUserID(), 'sessionID': this.auth.getSessionID(), 'session': this.auth.getSession() }) };
    return this.http.post<CommonResp>(APIUrl.BaseURL + APIUrl.WalletToWalleTransfer, req, httpOptions).pipe(
      catchError(this.handleError<CommonResp>('WalletToWalleTransfer'))
      );
  }

  UpdateProfile(req: UpdateProfilereq): Observable<WebAppUserProfileResp> {
    var httpOptions = { headers: new HttpHeaders({ 'appID': HeaderInfo.AppID, 'version': HeaderInfo.Version, 'domain': HeaderInfo.Domain, 'userID': this.auth.getUserID(), 'sessionID': this.auth.getSessionID(), 'session': this.auth.getSession() }) };
    return this.http.post<WebAppUserProfileResp>(APIUrl.BaseURL + APIUrl.UpdateProfile,req, httpOptions).pipe(
      catchError(this.handleError<WebAppUserProfileResp>('UpdateProfile'))
    );
  }

  UploadAdvertisement(req: FormData): Observable<CommonResp> {
    var httpOptions = { headers: new HttpHeaders({ 'appID': HeaderInfo.AppID, 'version': HeaderInfo.Version, 'domain': HeaderInfo.Domain, 'userID': this.auth.getUserID(), 'sessionID': this.auth.getSessionID(), 'session': this.auth.getSession() }) };
    return this.http.post<CommonResp>(APIUrl.BaseURL + APIUrl.UploadAdvertisement, req, httpOptions).pipe(
      catchError(this.handleError<CommonResp>('UploadAdvertisement'))
    );
  }

  GetAdvertisementPackage(): Observable<AdvertisementPackageList> {
    var httpOptions = { headers: new HttpHeaders({ 'appID': HeaderInfo.AppID, 'version': HeaderInfo.Version, 'domain': HeaderInfo.Domain, 'userID': this.auth.getUserID(), 'sessionID': this.auth.getSessionID(), 'session': this.auth.getSession() }) };
    return this.http.post<AdvertisementPackageList>(APIUrl.BaseURL + APIUrl.GetAdvertisementPackage,1, httpOptions).pipe(
      catchError(this.handleError<AdvertisementPackageList>('GetAdvertisementPackage'))
    );
  }

  GetAdvertisementList(): Observable<AdvertisementReq[]> {
    var httpOptions = { headers: new HttpHeaders({ 'appID': HeaderInfo.AppID, 'version': HeaderInfo.Version, 'domain': HeaderInfo.Domain, 'userID': this.auth.getUserID(), 'sessionID': this.auth.getSessionID(), 'session': this.auth.getSession() }) };
    return this.http.post<AdvertisementReq[]>(APIUrl.BaseURL + APIUrl.GetAdvertisementList, 1, httpOptions).pipe(
      catchError(this.handleError<AdvertisementReq[]>('GetAdvertisementList'))
    );
  }

  PostUpiPayment(req: any): Observable<any> {
    var httpOptions = { headers: new HttpHeaders({ 'appID': HeaderInfo.AppID, 'version': HeaderInfo.Version, 'domain': HeaderInfo.Domain, 'userID': this.auth.getUserID(), 'sessionID': this.auth.getSessionID(), 'session': this.auth.getSession() }) };
    return this.http.post<any>(APIUrl.BaseURL + APIUrl.PostUpiPayment, req, httpOptions).pipe(
      catchError(this.handleError<any>('PostUpiPayment'))
    );

  }

}
