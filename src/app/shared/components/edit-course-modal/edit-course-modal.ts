import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { CourseService } from '../../../features/courses/services/course.service';

@Component({
  selector: 'app-edit-course-modal',
  imports: [ReactiveFormsModule, CommonModule, ModalModule],
  providers: [],
  templateUrl: './edit-course-modal.html',
  styleUrl: './edit-course-modal.css',
})
export class EditCourseModal {
  @Input() course: any;
  form!: FormGroup;
  private courseService = inject(CourseService);

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnInit() {
    // Initialize form with values (or defaults)
    this.form = this.fb.group({
      id: [this.course?.id || ''],
      title: [this.course?.title || '', Validators.required],
      instructor: [this.course?.instructor || '', Validators.required],
      category: [this.course?.category || '', Validators.required],
      description: [
        this.course?.description || '',
        [Validators.required, Validators.minLength(10)],
      ],
      price: [this.course?.price || 0, [Validators.required, Validators.min(0)]],
      modules: this.fb.array([]),
    });

    // Load modules if exist
    if (this.course?.modules?.length) {
      this.course.modules.forEach((mod: any) => {
        this.modules.push(this.createModule(mod.moduleTitle, mod.duration));
      });
    } else {
      this.modules.push(this.createModule());
    }
  }

  get modules(): FormArray {
    return this.form.get('modules') as FormArray;
  }

  createModule(moduleTitle = '', duration = ''): FormGroup {
    return this.fb.group({
      moduleTitle: [moduleTitle, Validators.required],
      duration: [duration, Validators.required],
    });
  }

  addModule() {
    this.modules.push(this.createModule());
  }

  removeModule(index: number) {
    this.modules.removeAt(index);
  }

  onClose() {
    this.bsModalRef.hide();
  }

  onSave(id: any) {
    if (this.form.valid) {
      console.log('Updated course:', this.form.value);
      const updatedCourse = this.form.value;
      this.courseService.updateCourse(id, updatedCourse);
      // Here you can emit the data or call API to update the course
      this.bsModalRef.hide();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
