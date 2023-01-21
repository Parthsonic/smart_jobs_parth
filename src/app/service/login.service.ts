import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Login } from '../pojo/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {
  }

  data:any='';
  username:string='';

  loginurl = '/login'
  //loginurl = "http://localhost:9090/login"
  public loginRecruiterFromRemote(login:Login){
    return (this.http.post<Login>(this.loginurl,login,
    {observe:'response'})).pipe(catchError(this.handleError));
  }

  public loginJobSeekerFromRemote(login:Login){
    console.log("in ser:" + login.userId);
    
    return (this.http.post<Login>(this.loginurl,login,
    {observe:'response'})).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(error);
  }
  
}
