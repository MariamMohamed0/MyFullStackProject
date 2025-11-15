import { Component, OnInit } from '@angular/core';
import { Student } from '../../../_models/student';
import { StudentService } from '../../../_services/student-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Department } from '../../../_models/department';
import { DepartmentService } from '../../../_services/department-service';

@Component({
  selector: 'app-student-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList  implements OnInit {
 students: Student[] = [];
  departments: Department[] = [];
  selectedStudent: Student | null = null;

  constructor(
    private studentService: StudentService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadDepartments();
  }

  loadStudents() {
    this.studentService.getAll().subscribe({
      next: data => this.students = data,
      error: err => console.error(err)
    });
  }

  loadDepartments() {
    this.departmentService.getAll().subscribe({
      next: data => this.departments = data,
      error: err => console.error(err)
    });
  }

  addNewStudent() {
    this.selectedStudent = { id: 0, name: '', age: 0, departmentId: 0 };
  }

  editStudent(student: Student) {
    this.selectedStudent = { ...student };
  }

  cancelEdit() {
    this.selectedStudent = null;
  }

  saveStudent(student: Student) {
    if (student.id === 0) {
      this.studentService.create(student).subscribe({
        next: newStudent => {
          this.students.push(newStudent);
          this.selectedStudent = null;
        },
        error: err => console.error(err)
      });
    } else {
      this.studentService.update(student.id, student).subscribe({
        next: updated => {
          const index = this.students.findIndex(s => s.id === updated.id);
          if (index > -1) this.students[index] = updated;
          this.selectedStudent = null;
        },
        error: err => console.error(err)
      });
    }
  }

  deleteStudent(id: number) {
    this.studentService.delete(id).subscribe({
      next: () => this.students = this.students.filter(s => s.id !== id),
      error: err => console.error(err)
    });
  }

  getDepartmentName(deptId: number): string {
    const dept = this.departments.find(d => d.id === deptId);
    return dept ? dept.name : '';
  }
}