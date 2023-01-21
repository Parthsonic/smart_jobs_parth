import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JsEduId, JsExpId, EmployeePersonal } from '../pojo/employee';
import { Employer } from '../pojo/employer';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private http: HttpClient) { }


  private handleError(errResp: HttpErrorResponse) {
    if (errResp.error instanceof ErrorEvent) {
      console.error("An Error Occured: ", errResp.error.message);
    }
    else {
      console.error(`Backend returned code ${errResp.status},+
      body was: ${errResp.error}`);
    }
    return throwError('Someting bad happened; Please try again later.')
  }

  
  getEmpPersonalById(email: any) {
    const employeePersonalUrl = `api/v1/personal/getPersonalDetails/${email}`
    const headers = { 'content-type': 'application/x-www-form-urlencoded' }
    let body = new HttpParams()
    body = body.set('empId', email)
    console.log("semial",email);
    
    return this.http.post<EmployeePersonal>(  employeePersonalUrl, body, { 'headers': headers }).pipe(catchError(this.handleError))
  }

  
  getEmpEducationById(email: any) {
    const employeeEducationUrl = `api/v1/educational/getEducationalDetails/${email}`
    const headers = { 'content-type': 'application/x-www-form-urlencoded' }
    return this.http.post<JsEduId>(employeeEducationUrl ,{'headers':headers}).pipe(catchError(this.handleError))
  }

  
  getEmpExpById(email: any) {
    const  employeeExpUrl = `api/v1/experience/getExperienceDetails/${email}`
    const headers = { 'content-type': 'application/x-www-form-urlencoded' }
    return this.http.post<JsExpId>(employeeExpUrl , { 'headers': headers }).pipe(catchError(this.handleError))
  }

  public uploadImage(profilePic:any,id:string){
    let formData:FormData = new FormData()
    formData.append('myFile',profilePic)
    formData.append('jsId',id)
    const url=`api/v1/personal/upload`
    return this.http.post(url,formData).pipe(catchError(this.handleError));
  }

  public uploadResume(profileRe:any,id:string){
    let formData:FormData = new FormData()
    formData.append('myFile',profileRe)
    formData.append('jsId',id)
    const url=`api/v1/personal/uploadResume`
    return this.http.post(url,formData).pipe(catchError(this.handleError));
  }

}
