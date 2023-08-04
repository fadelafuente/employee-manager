import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public employees: Employee[] = [];
  public editEmployee!: Employee|undefined;
  public deleteEmployee!: Employee|undefined;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees() : void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee: Employee|null, mode: string) : void {
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if(mode === 'add') {
        button.setAttribute('data-target', '#addEmployeeModal');
      }
      else if(mode === 'edit' && employee != null) {
        this.editEmployee = employee;
        button.setAttribute('data-target', '#updateEmployeeModal');
      }
      else if(mode === 'delete' && employee != null) {
        this.deleteEmployee = employee;
        button.setAttribute('data-target', '#deleteEmployeeModal');
      }
      container?.appendChild(button);
      button.click();
  }

  public onAddEmployee(addForm: NgForm) : void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmployee(employee: Employee|undefined) {
    if(employee === undefined) {
      return;
    }
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(id: number|undefined) : void {
    if(id === undefined) {
      return;
    }
    this.employeeService.deleteEmployee(id).subscribe(
      (response: void) => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string) : void {
    const result: Employee[] = [];
    for (const employee of this.employees) {
        if(employee.name.toLowerCase().indexOf(key.toLowerCase()) != -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) != -1
        || employee.phoneNumber.toLowerCase().indexOf(key.toLowerCase()) != -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) != -1) {
          result.push(employee);
        }
    }
    if(result.length == 0 || !key) {
      this.getEmployees();
    } else {
      this.employees = result;
    }
  }

}
