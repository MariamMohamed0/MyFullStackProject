import { Component, OnInit } from '@angular/core';
import { Department } from '../../../_models/department';
import { DepartmentService } from '../../../_services/department-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './department-list.html',
  styleUrl: './department-list.css',
})
export class DepartmentList implements OnInit {
  departments: Department[] = [];
  selectedDepartment: Department | null = null;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getAll().subscribe({
      next: data => this.departments = data,
      error: err => console.error(err)
    });
  }

  deleteDepartment(id: number) {
    this.departmentService.delete(id).subscribe({
      next: () => this.departments = this.departments.filter(d => d.id !== id),
      error: err => console.error(err)
    });
  }

  editDepartment(department: Department) {
    this.selectedDepartment = { ...department };
  }

  cancelEdit() {
    this.selectedDepartment = null;
  }

  saveDepartment(department: Department) {
    if (department.id === 0) {
      this.departmentService.create(department).subscribe({
        next: newDep => {
          this.departments.push(newDep);
          this.selectedDepartment = null;
        },
        error: err => console.error(err)
      });
    } else {
      this.departmentService.update(department.id, department).subscribe({
        next: updated => {
          const index = this.departments.findIndex(d => d.id === updated.id);
          if (index > -1) this.departments[index] = updated;
          this.selectedDepartment = null;
        },
        error: err => console.error(err)
      });
    }
  }

  addNewDepartment() {
    this.selectedDepartment = { id: 0, name: '' };
  }
}