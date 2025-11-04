import { Component, effect, inject, OnInit, signal, TemplateRef } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { CommonModule, DecimalPipe, SlicePipe } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses-list',
  imports: [ SlicePipe, CommonModule, ReactiveFormsModule , FormsModule],
  providers: [BsModalService],
  templateUrl: './courses-list.html',
  styleUrl: './courses-list.css',
})
export class CoursesList implements OnInit {
  public coursesService = inject(CourseService);
  private modalService = inject( BsModalService)
  courses = this.coursesService.courses;
    loading = signal<boolean>(true);
      modalRef?: BsModalRef;
  constructor() {
    // Log courses when they change
    effect(() => {
      console.log('Courses updated:', this.coursesService.courses());
    });
  }

  async ngOnInit() {
   this.coursesService.loadCourses();
  
    
  }

   getLevelClass(level: string): string {
    switch (level.toLowerCase()) {
      case 'beginner': return 'badge-beginner';
      case 'intermediate': return 'badge-intermediate';
      case 'advanced': return 'badge-advanced';
      default: return 'bg-secondary';
    }
  }

    openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  deleteCourse(id: any) {}

  editCourse(id: any) {}
  viewCourse(id: any) {}
}
