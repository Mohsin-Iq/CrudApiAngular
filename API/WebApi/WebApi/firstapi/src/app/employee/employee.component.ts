import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackService } from '../services/snack.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
 
  constructor(private _server : EmployeeService ,
              private router : Router ,
               private route : ActivatedRoute,
               private _snack : SnackService,
               ){}

  AllData: any[] =[  ];
  
  ngOnInit() {

 this.Show();    

  }

  Show(){
   this._server.GetData().subscribe((data : any[]) => {
   this.AllData = data;
   console.log(data);
   }); 
  }
  Onclick( )
  {
  this.router.navigate(['create'])
  }
  deleteAll( employeeID : any ) {
    
    this._server.DeleteItem(employeeID).subscribe((response:any) =>{
     this._snack.openSnackBar(response.message , ' done');

    this.Show();
    });
    

   this.router.navigate([`../`], {relativeTo : this.route });  
  }
  Update(employeeID : any) {
    const employeeData = this.AllData.find(obj => obj.employeeID == employeeID);
    if(employeeData) {

      this.router.navigate(['update/data', {data: JSON.stringify(employeeData)} ]);
    
  }else{
        console.error('not Edit');
    }
  }

  details(emp : any) {
    debugger;
    const add = this.AllData.find(o => o.employeeID == emp);
    this.router.navigate( ['details',{ data : JSON.stringify(add) } ]);

  }

}
