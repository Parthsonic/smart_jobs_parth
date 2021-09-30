import { HttpClient,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employer } from '../pojo/employer';

@Injectable({
  providedIn: 'root'
})
export class EmployerServiceService {

  constructor(private http: HttpClient) { }

  private handleError(errResp:HttpErrorResponse){
    if(errResp.error instanceof ErrorEvent){
      console.error("An Error Occured: ",errResp.error.message);
    }
    else{
      console.error(`Backend returned code ${errResp.status},+
      body was: ${errResp.error}`);
    }
    return throwError('Someting bad happened; Please try again later.')
  }

  emploerUrl = 'http://localhost:9090/Employee'

  getEmpById(email:string){
      const headers = { 'content-type': 'application/x-www-form-urlencoded'}
      let body = new HttpParams()
      body = body.set('empId',email)
      return this.http.post<Employer>(this.emploerUrl+'/getEmployee',body,{'headers':headers}).pipe(catchError(this.handleError))
  }

}
