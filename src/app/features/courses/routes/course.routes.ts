import { Routes } from '@angular/router';
import { CoursesList } from '../components/courses-list/courses-list';
import { CoursesForm } from '../components/courses-form/courses-form';

export const courses_routes: Routes = [
    {
        path: "courses-list" , component: CoursesList
    },
    {
        path: "create-course" , component: CoursesForm
    }
]