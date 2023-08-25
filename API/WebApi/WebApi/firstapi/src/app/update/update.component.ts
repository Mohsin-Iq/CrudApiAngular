import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { SnackService } from '../services/snack.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
  
})
export class UpdateComponent  implements OnInit  {

  constructor(private router: Router,
               private route: ActivatedRoute,
                private _server: EmployeeService,
                private _snack : SnackService,
                ) {}

   public employee : any  = [];

   back(){
    this.router.navigateByUrl('');
   }

  ngOnInit(): void { 
    this.route.params.subscribe((params: Params) => {
      if (params['data']) {
        this.employee = JSON.parse(params['data']);
      
      }
    });
  }
  Updateit( emp : any){ 
    this._server.updateData(emp).subscribe( response  =>
    {
      this._snack.openSnackBar(response.message , 'done');
      this.router.navigateByUrl('');
    },
    error => console.log(error)
    )
    
  }
}
