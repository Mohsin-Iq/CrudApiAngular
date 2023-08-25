import { Component, Injectable, OnInit, inject } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import {  ActivatedRoute, Router } from '@angular/router';
import { SnackService } from '../services/snack.service';


@Component({
  selector: 'app-emp-liste',
  templateUrl: './emp-liste.component.html',
  styleUrls: ['./emp-liste.component.scss']
})
export class EmpListeComponent  implements OnInit{

  
  employee = {
      employeeID: '',
      Name: '',
      Email: '',
      phone:''
    };
    ngOnInit(): void {
      
      
    }
    
  constructor ( private _server : EmployeeService,
                private router : Router ,
                private route: ActivatedRoute,
                 private _snack : SnackService ){}

  saveTutorial() {
    const data = {
      Name: this.employee.Name,
      Email: this.employee.Email,
      phone: this.employee.phone,
      
    };
    this._server.createItem(data).subscribe(response => {
    this.router.navigateByUrl('');
      this._snack.openSnackBar('create Successfully' , ' done');
        },
        error => {
          console.log(error);
        });
  }
  back(){
    this.router.navigateByUrl('');
   }
}
