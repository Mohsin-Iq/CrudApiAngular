import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';

const apiurl = 'https://localhost:44311/api/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private Http : HttpClient) { }
  
  GetData() : Observable<any> {

    return this.Http.get<any>(`${apiurl}`)

  }
  createItem(emp : any): Observable<any> {
    return this.Http.post<any>( apiurl, emp)
    
  }
  DeleteItem(employeeID : any ): Observable<any> {
   return  this. Http.delete(`${apiurl}/${employeeID}`)
   .pipe(retry(1), catchError(this.handleError));

  }

  updateData( data : any ): Observable<any>{ 
    var id = data.employeeID;
    const url = `${apiurl}/update/${id}`;
    return this.Http.put(url, data).pipe( retry(1), catchError(this.handleError));
    }


    handleError(error:any) {
      let errorMessage = '';  
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error Code: ${error.status}\Message: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(() => {
          return errorMessage;
      });
    }
}
