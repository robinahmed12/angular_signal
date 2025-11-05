import { Course } from './../models/courses.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CourseService {
  courses = signal<Course[]>([]);
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  loading = signal<boolean>(false);
  error = signal<string>('');

  constructor() {}

  async loadCourses() {
    const data = await firstValueFrom(this.http.get<Course[]>(this.apiUrl));
    this.courses.set(data);
  }

  async addCourse(course: Course) {
    const newCourse = await firstValueFrom(this.http.post<Course>(this.apiUrl, course));
    console.log(newCourse);
    this.courses.update((list) => [...list, newCourse]);
  }
  async updateCourse(id: any, course: Course) {
    const updated = await firstValueFrom(this.http.patch<Course>(`${this.apiUrl}/${id}`, course));
    this.courses.update((list) => list.map((c) => (c.id === id ? updated : c)));
  }

  async deleteCourse(id: any) {
    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
      this.courses.update((list) => list.filter((c) => c.id !== id));
    } catch (error) {
      console.error(' Failed to delete course:', error);
      throw error;
    }
  }
}
