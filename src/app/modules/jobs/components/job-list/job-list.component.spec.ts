import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { Store, StoreModule } from '@ngrx/store'
import { of } from 'rxjs'
import { Job } from '../../model/jobs.model'
import { JobsService } from '../../services/jobs.service'
import { JobListComponent } from './job-list.component'
import { JobModalComponent } from '../job-modal/job-modal.component'
import { AppState, jobsReducer } from '../../store/jobs.state'

describe('JobListComponent', () => {
  let component: JobListComponent
  let fixture: ComponentFixture<JobListComponent>
  let jobsService: jasmine.SpyObj<JobsService>
  let modalService: jasmine.SpyObj<NgbModal>
  let store: Store<AppState>
  let modalRef: NgbModalRef

  const mockJob: Job = {
    id: '1',
    title: 'Mock Job',
    number: 'Mock Job number',
    startDate: '2023-02-20',
    closeDate: '2023-03-20',
    isExperienceRequired: true,
    numberOfOpenings: 3,
    notes: 'Mock notes'
  }

  beforeEach(async () => {
    jobsService = jasmine.createSpyObj('JobsService', ['deleteJob'])
    modalService = jasmine.createSpyObj('NgbModal', ['open'])
    modalRef = {
      componentInstance: { job: mockJob },
      result: Promise.resolve('Ok click')
    } as NgbModalRef

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({ jobs: jobsReducer })
      ],
      declarations: [JobListComponent],
      providers: [
        { provide: JobsService, useValue: jobsService },
        { provide: NgbModal, useValue: modalService }
      ]
    }).compileComponents()

    store = TestBed.inject(Store)
    fixture = TestBed.createComponent(JobListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should open modal and delete job', async () => {
    modalService.open.and.returnValue(modalRef)
    jobsService.deleteJob.and.returnValue(of())

    await component.open(mockJob)

    expect(modalService.open).toHaveBeenCalledWith(JobModalComponent)
    expect(modalRef.componentInstance.job).toEqual(mockJob)
    expect(jobsService.deleteJob).toHaveBeenCalledWith(mockJob.id)
    expect(component.jobs.length).toBe(0)
  })
})
