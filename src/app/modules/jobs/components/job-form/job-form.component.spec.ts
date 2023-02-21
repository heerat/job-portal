import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { BehaviorSubject, Observer } from 'rxjs'
import { DateRange } from 'src/app/modules/shared/model/datepicker-range.model'
import { SharedModule } from 'src/app/modules/shared/shared.module'
import { Job } from '../../model/jobs.model'
import { JobsService } from '../../services/jobs.service'

import { JobFormComponent } from './job-form.component'

describe('JobFormComponent', () => {
  let component: JobFormComponent
  let fixture: ComponentFixture<JobFormComponent>
  let formBuilder: FormBuilder
  let jobsService: JobsService
  let httpTestingController: HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        SharedModule,
        BrowserModule
      ],
      declarations: [JobFormComponent],
      providers: [
        FormBuilder,
        JobsService,
        { provide: Window, useValue: window }
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(JobFormComponent)
    component = fixture.componentInstance
    formBuilder = TestBed.inject(FormBuilder)
    jobsService = TestBed.inject(JobsService)
    httpTestingController = TestBed.inject(HttpTestingController)

    component.createJobForm = formBuilder.group({
      id: [],
      title: ['', [Validators.required]],
      number: ['', [Validators.required]],
      date: ['', [Validators.required]],
      numberOfOpenings: [0, [Validators.required]],
      notes: [''],
      isExperienceRequired: [false]
    })
    component.dateRange = new BehaviorSubject<DateRange | null>(null)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should submit form when valid', () => {
    spyOn(jobsService, 'createJob').and.returnValue({
      subscribe: () => {}
    } as any)

    component.createJobForm.setValue({
      id: null,
      title: 'Software Developer',
      number: '411-AKJ',
      date: { fromDate: '2022-12-11', toDate: '14-01-2023' },
      numberOfOpenings: 1,
      notes: 'Frontend Developer(Angular)',
      isExperienceRequired: true
    })

    component.onSubmit()

    expect(component.submitted).toBe(true)
    expect(jobsService.createJob).toHaveBeenCalledWith({
      id: null as any,
      title: 'Software Developer',
      number: '411-AKJ',
      startDate: '2022-12-11',
      closeDate: '14-01-2023',
      numberOfOpenings: 1,
      notes: 'Frontend Developer(Angular)',
      isExperienceRequired: true
    })
  })

  it('should not submit form when invalid', () => {
    spyOn(jobsService, 'createJob').and.returnValue({
      subscribe: () => {}
    } as any)

    component.createJobForm.setValue({
      id: null,
      title: '',
      number: '',
      date: '',
      numberOfOpenings: 0,
      notes: '',
      isExperienceRequired: false
    })

    component.onSubmit()

    expect(component.submitted).toBe(true)
    expect(jobsService.createJob).not.toHaveBeenCalled()
  })

  it('should validate title field', () => {
    expect(component.validateField('title')).toBeFalse()
    component.submitted = true
    component.createJobForm.controls['title'].markAsTouched()
    expect(component.validateField('title')).toBe(true)

    component.createJobForm.controls['title'].setValue('Software Developer')
    expect(component.validateField('title')).toBeUndefined()
  })
})
