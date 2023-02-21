import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'
import { Job } from '../../model/jobs.model'
import { JobsService } from '../../services/jobs.service'
import { JobDetailComponent } from './job-detail.component'

describe('JobDetailComponent', () => {
  let component: JobDetailComponent
  let fixture: ComponentFixture<JobDetailComponent>
  let jobsServiceSpy: jasmine.SpyObj<JobsService>
  const job: Job = {
    id: '1',
    title: 'Test Job',
    number: '123',
    startDate: '2023-02-02',
    closeDate: '2023-02-02',
    isExperienceRequired: true,
    notes: 'Test Notes',
    numberOfOpenings: 3
  }
  const route = {
    snapshot: {
      paramMap: {
        get: () => job.id
      }
    }
  }

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('JobsService', ['getJobById'])

    TestBed.configureTestingModule({
      declarations: [JobDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: route },
        { provide: JobsService, useValue: spy }
      ]
    }).compileComponents()

    jobsServiceSpy = TestBed.inject(JobsService) as jasmine.SpyObj<JobsService>
    jobsServiceSpy.getJobById.and.returnValue(of(job))
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should load job details on init', () => {
    expect(jobsServiceSpy.getJobById).toHaveBeenCalledWith(job.id)
    expect(component.jobDetails).toEqual(job)
  })

  it('should render job details', () => {
    fixture.detectChanges()
    const element = fixture.nativeElement
    expect(element.querySelector('h1').textContent).toContain('Job Details')
    expect(
      element.querySelector('.col-12.col-md-9:nth-of-type(2)').textContent
    ).toContain(job.title)
    expect(
      element.querySelector('.col-12.col-md-9:nth-of-type(4)').textContent
    ).toContain(job.number)
    expect(
      element.querySelector('.col-12.col-md-9:nth-of-type(6)').textContent
    ).toContain(job.startDate)
    expect(
      element.querySelector('.col-12.col-md-9:nth-of-type(8)').textContent
    ).toContain(job.closeDate)
    expect(
      element.querySelector('.col-12.col-md-9:nth-of-type(10)').textContent
    ).toContain('Required')
    expect(
      element.querySelector('.col-12.col-md-9:nth-of-type(12)').textContent
    ).toContain(job.notes)
  })
})
