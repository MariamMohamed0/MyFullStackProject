import { Routes } from '@angular/router';
import { Home } from './components/core/home/home';
import { About } from './components/core/about/about';
import { Contact } from './components/core/contact/contact';
import { Student } from './_models/student';
import { StudentList } from './components/student/student-list/student-list';
import { DepartmentList } from './components/department/department-list/department-list';

export const routes: Routes = [
    {path:"home",component:Home},
    {path:"about",component:About},
    {path:"contact",component:Contact},
    {path:"student",component:StudentList},
    {path:"departments",component:DepartmentList},

    {path:"",redirectTo:"/student",pathMatch:"full"},
];
