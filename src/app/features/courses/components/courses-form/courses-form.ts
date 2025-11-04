import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CourseService } from './../../services/course.service';
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCourseModal } from '../../../../shared/components/edit-course-modal/edit-course-modal';

@Component({
  selector: 'app-courses-form',
  imports: [ReactiveFormsModule, CommonModule, FormsModule,],
  templateUrl: './courses-form.html',
  styleUrl: './courses-form.css',
})
export class CoursesForm {
  private fb = inject(FormBuilder);
  private courseService = inject(CourseService);

  courseForm: FormGroup;
  courseData = signal<any[]>([]); // ✅ fixed generic type (was [])

  constructor() {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      instructor: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
      modules: this.fb.array([this.createModule()]),
    });
  }


  private createModule(): FormGroup {
    return this.fb.group({
      moduleTitle: ['', Validators.required],
      duration: ['', Validators.required],
    });
  }

// getter
  get modules(): FormArray {
    return this.courseForm.get('modules') as FormArray;
  }

  addModule(): void {
    this.modules.push(this.createModule());
  }

  removeModule(index: number): void {
    if (this.modules.length > 1) {
      this.modules.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const newCourse = this.courseForm.value;
      console.log(' Submitted Data:', newCourse);

      // Example: call your service here
       this.courseService.addCourse(newCourse)
    

      alert(' Course created successfully!');
      this.courseForm.reset();
      this.modules.clear();
      this.addModule();
    } else {
      alert('⚠️Please fill all required fields correctly.');
    }
  }
}
