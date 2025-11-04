import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseModal } from './edit-course-modal';

describe('EditCourseModal', () => {
  let component: EditCourseModal;
  let fixture: ComponentFixture<EditCourseModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCourseModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCourseModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
