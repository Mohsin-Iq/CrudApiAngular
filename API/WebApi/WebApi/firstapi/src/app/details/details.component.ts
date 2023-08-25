import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { SnackService } from '../services/snack.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
  

constructor(private route: ActivatedRoute,
            private router : Router,
            private _server : EmployeeService ,
            private _snack : SnackService,
            ){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['data']) {
        this.employee = JSON.parse(params['data']);
      
      }
    });
  }  employee = {
    employeeID: '',
    name: '',
    email: '',
    phone:''
  };
  back(){
    this.router.navigateByUrl('');
   }
   deleteAll( employeeID : any ) {
    
    this._server.DeleteItem(employeeID).subscribe((response:any) =>{
     this._snack.openSnackBar(response.message , ' done');

    this.router.navigateByUrl('');
    });
  }
  edit(employeeID : any){
    this.router.navigate(['update/data',{data: JSON.stringify(employeeID)}]);
  }
}
