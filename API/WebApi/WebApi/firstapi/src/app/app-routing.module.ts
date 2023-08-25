import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmpListeComponent } from './emp-liste/emp-liste.component';
import { UpdateComponent } from './update/update.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [

  { path:'employee',component:EmployeeComponent},
  
  { path:'create',component:EmpListeComponent },

  { path:'update/data',component:UpdateComponent },

  { path:'details',component:DetailsComponent },

     
  {path: ''  , redirectTo: 'employee', pathMatch: 'full' },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
